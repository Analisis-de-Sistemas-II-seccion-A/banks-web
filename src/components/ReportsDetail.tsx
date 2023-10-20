import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTime } from "luxon";
import {
  Container,
  useMediaQuery,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { Bank } from "../interfaces/Bank.interface";
import { Account } from "../interfaces/Account.interface";
import { DateRange, DateRangePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import BankService from "../services/Bank.service";
import { useParams } from "react-router-dom";
import reportService from "../services/Report.service";

function ReportsDetail({ theme }: any) {
  const isLargeScreen = useMediaQuery("(min-width: 600px");
  const { type } = useParams();
  const isDarkMode: boolean = theme.palette.mode === "dark";
  const [banks, setBanks] = useState<Bank[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [value, setValue] = React.useState<DateRange<DateTime>>([null, null]);
  const [selectedBank, setSelectedBank] = useState<number | undefined>();
  const [selectedAccount, setSelectedAccount] = useState<number | undefined>();
  const [isBankValid, setIsBankValid] = useState(true);
  const [isAccountValid, setIsAccountValid] = useState(true);
  const [isDateRangeValid, setIsDateRangeValid] = useState(true);
  console.log(isDateRangeValid);

  useEffect(() => {
    BankService.getBanks().then((response) => {
      setBanks(response);
    });
  }, []);

  const handleBankChange = async (event: number) => {
    await BankService.getAccounts(event).then((response) => {
      setAccounts(response);
    });
  };

  const handleGenerateReport = () => {
    if (!selectedBank) {
      setIsBankValid(false);
    }
    if (!selectedAccount) {
      setIsAccountValid(false);
    }
    if (!value[0] || !value[1]) {
      setIsDateRangeValid(false);
    }

    if (selectedBank && selectedAccount && value[0] && value[1]) {
      reportService.generateReport(type || "", {
        id: selectedAccount,
        initDate: value[0].toISODate() || "",
        finalDate: value[1].toISODate() || "",
      });
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        align={isLargeScreen ? "left" : "center"}
        color="textPrimary"
        gutterBottom
      >
        Reporte de Ingresos
      </Typography>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Card
          style={{
            marginTop: "2rem",
            marginBottom: isLargeScreen ? "" : "3rem",
          }}
        >
          <CardHeader
            title="Seleccione los Parámetros del Reporte"
            className="card-header"
            sx={{ backgroundColor: isDarkMode ? "#333333" : "" }}
          />
          <CardContent style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
            <div
              style={{
                display: isLargeScreen ? "flex" : "grid",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "2rem",
                marginTop: "2rem",
              }}
            >
              <FormControl
                size="small"
                sx={{ m: 1, minWidth: 300 }}
                error={!isBankValid}
              >
                <InputLabel id="bancos-label">Seleccione un Banco</InputLabel>
                <Select
                  labelId="bancos-label"
                  id="bancos-select"
                  label="Seleccione Banco"
                  size="small"
                  onChange={(event) => {
                    setSelectedBank(event.target.value as number);
                    setIsBankValid(true);
                    handleBankChange(event.target.value as number);
                  }}
                  style={{
                    backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                    borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                  }}
                >
                  {banks.map((bank: Bank) => (
                    <MenuItem value={bank.BNC_BANCO}>{bank.BNC_NOMBRE}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                size="small"
                sx={{ m: 1, minWidth: 300 }}
                error={!isAccountValid}
              >
                <InputLabel id="cuentas-label">Seleccione una Cuenta</InputLabel>
                <Select
                  labelId="cuentas-label"
                  id="cuentas-select"
                  label="Cuentas"
                  size="small"
                  onChange={(event) => {
                    setSelectedAccount(event.target.value as number);
                    setIsAccountValid(true);
                  }}
                  style={{
                    backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                    borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                  }}
                >
                  {accounts.map((account: Account) => (
                    <MenuItem value={account.CNT_CUENTA}>{account.CNT_NOMBRE}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <Grid xs={12}>
              <Typography
                variant="body1"
                component="div"
                sx={{ marginBottom: "0.5rem" }}
              >
                Elige el rango de fechas del reporte
              </Typography>
            </Grid>
            <Grid sx={{ marginTop: "1rem" }}>
              <LocalizationProvider dateAdapter={AdapterLuxon}>
                <DateRangePicker
                  value={value}
                  maxDate={DateTime.now()}
                  onAccept={(newValue) => {
                    setValue(newValue as DateRange<DateTime>);
                    setIsDateRangeValid(true);
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <div
              style={{
                display: isLargeScreen ? "flex" : "grid",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              <FormControl component="fieldset">
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ marginBottom: "0.5rem" }}
                >
                  Elige el formato del documento
                </Typography>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <RadioGroup
                    aria-label="formato-documento"
                    name="formato-documento"
                    row
                  >
                    <FormControlLabel
                      value="pdf"
                      control={<Radio />}
                      checked={true}
                      label="PDF"
                    />
                  </RadioGroup>
                </div>
              </FormControl>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "2rem",
                marginBottom: "1rem",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<DownloadIcon />}
                onClick={handleGenerateReport}
              >
                Descargar Reporte
              </Button>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}

export default ReportsDetail;
