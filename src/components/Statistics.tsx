import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import { Box, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { DateRange, DateRangePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { DateTime } from "luxon";
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import TransactionService from "../services/Transaction.service";
import { TransactionHistory } from "../interfaces/TransactionHistory.interface";
import BankService from "../services/Bank.service";
import { Account } from "../interfaces/Account.interface";
import { Bank } from "../interfaces/Bank.interface";
import Robot from "../assets/robot.webp";

const Title = styled(Typography)({
  textAlign: "left",
});

const StyledSelect = styled(Select)({
  minWidth: "200px",
  margin: "8px 0px 8px 8px",
  alignSelf: "center",
});

const CardContentWrapper = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const IconWrapper = styled("div")({
  fontSize: "2rem",
  margin: "8px 0",
});

const GridContainer = styled(Grid)({
  flexGrow: 1,
});

const GridItem = styled(Grid)({
  minWidth: "200px",
});

function Statistics({ theme }: any) {
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery("(min-width: 900px)");
  const isDarkMode: boolean = theme.palette.mode === "dark";
  const [selectedBank, setSelectedBank] = React.useState<number | null>(null);
  const [selectedAccount, setSelectedAccount] = React.useState<number | null>(null);
  const [transactions, setTransactions] = React.useState<TransactionHistory[]>([]);
  const [banks, setBanks] = React.useState<Bank[]>([]);
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [value, setValue] = React.useState<DateRange<DateTime>>([null, null]);
  const [currenctBalance, setCurrentBalance] = React.useState<number>(0);
  const [currentIncome, setCurrentIncome] = React.useState<number>(0);
  const [currentOutcome, setCurrentOutcome] = React.useState<number>(0);

  const StyledCard = styled(Card)({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "&.MuiGrid-item": {
      margin: "16px",
    },
    backgroundColor: isDarkMode ? "#1a1a1a" : "#F7F7F7",
  });


  React.useEffect(() => {
    handleSearchBanks();
    handleUpdateStatistics(null, null, null, null);
  }, []);

  const handleRedirect = (route: string) => {
    navigate(`/${route}`);
  };



  const handleUpdateStatistics = async (accParam: number | null, bankParam: number | null, InitDateParam: string | null | undefined, endDateParam: string | null | undefined) => {
    await TransactionService.getTransactionHistorySearch(accParam, bankParam, InitDateParam, endDateParam).then(async (response) => {
      setTransactions(response);
      if (response.length > 0) {
        await handleGetAmmounts(response);
      }
    });
  }

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleGetAmmounts = async (transactions: TransactionHistory[]) => {
    let income = 0;
    let outcome = 0;
    let balance = 0;

    transactions.forEach((transaction) => {
      if (transaction.tipo_operacion === 'SUMA') {
        if (transaction.moneda === 'USD') {
          income += transaction.monto_transaccion * transaction.tasa_cambio;
        } else {
          income += transaction.monto_transaccion;
        }
      } else {
        if (transaction.moneda === 'USD') {
          outcome += transaction.monto_transaccion * transaction.tasa_cambio;
        } else {
          outcome += transaction.monto_transaccion;
        }
      }
    });

    balance = income - outcome;
    setCurrentBalance(balance);
    setCurrentIncome(income);
    setCurrentOutcome(outcome);
  }


  const handleSearchBanks = async () => {
    await BankService.getBanks().then((response) => {
      setBanks(response);
    });
  }

  const handleSearchAccounts = async (bank: number) => {
    await BankService.getAccounts(bank).then((response) => {
      setAccounts(response);
    });
  }

  const handleChangeAmmount = (ammount: number, currency: string, factor: number) => {
    if (currency === "USD") {
      return ammount * factor;
    }
    return ammount;
  }

  return (
    <Container maxWidth="lg">
      <Title variant="h4">Estadísticas</Title>
      <Card
        variant="outlined"
        sx={{
          marginBottom: "2rem",
          marginTop: "2rem",
        }}
      >
        <CardContent
          sx={{
            backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7",
          }}
        >
          <Grid
            justifyContent={isLargeScreen ? "start" : 'center'}
            alignItems="center"
            container
            spacing={2}
          >
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<DoubleArrowIcon />}
                onClick={() => handleRedirect("reports")}
              >
                Generar Reportes
              </Button>
            </Grid>
          </Grid>
          <Grid sx={{ marginTop: "2rem", textAlign: "end" }}>
            <Typography
              variant="body1"
              component="div"
              sx={{ marginBottom: "0.5rem" }}
            >
              Elige el rango de fechas
            </Typography>
          </Grid>
          <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'end', marginTop: "1rem", marginBottom: '2rem' }}>
            <Grid sx={{ maxWidth: '500px' }}>
              <LocalizationProvider dateAdapter={AdapterLuxon}>
                <DateRangePicker
                  value={value}
                  maxDate={DateTime.now()}
                  onAccept={async (newValue) => {
                    setValue(newValue)
                    await handleUpdateStatistics(selectedAccount, selectedBank, newValue[0]?.toISODate(), newValue[1]?.toISODate())
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </div>
          <div
            style={{
              display: isLargeScreen ? "flex" : "grid",
              justifyContent: "end",
              marginBottom: "1rem",
            }}
          >
            <StyledSelect
              value={selectedBank}
              size="small"
              onChange={async (event) => {
                setSelectedBank(event.target.value as number)
                await handleSearchAccounts(event.target.value as number);
                await handleUpdateStatistics(selectedAccount, event.target.value as number, value[0]?.toISODate(), value[1]?.toISODate());
              }}
              displayEmpty
              style={{
                backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
              }}
              inputProps={{ "aria-label": "Seleccione un banco" }}
            >
              <MenuItem value="" disabled>
                Seleccione un banco
              </MenuItem>
              {banks.map((bank) => (
                <MenuItem key={bank.BNC_BANCO} value={bank.BNC_BANCO}>
                  {bank.BNC_NOMBRE}
                </MenuItem>
              ))}
            </StyledSelect>
            {selectedBank && (
              <StyledSelect
                value={selectedAccount}
                size="small"
                onChange={async (event) => {
                  setSelectedAccount(event.target.value as number)
                  await handleUpdateStatistics(event.target.value as number, selectedBank, value[0]?.toISODate(), value[1]?.toISODate());
                }}
                displayEmpty
                style={{
                  backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                  borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                }}
                inputProps={{ "aria-label": "Seleccione una cuenta" }}
              >
                <MenuItem value="" disabled>
                  Seleccione una cuenta
                </MenuItem>
                {accounts.map((account) => (
                  <MenuItem key={account.CNT_CUENTA} value={account.CNT_CUENTA}>
                    {account.CNT_NOMBRE}
                  </MenuItem>
                ))}
              </StyledSelect>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'end', marginTop: "2rem" }}>
            <Grid sx={{ maxWidth: '500px' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={async () => {
                  setSelectedAccount(null);
                  setSelectedBank(null);
                  setValue([null, null]);
                  await handleUpdateStatistics(null, null, null, null)
                }}
                startIcon={<DeleteIcon />}
              >
                Limpiar Filtros
              </Button>
            </Grid>
          </div>
        </CardContent>
      </Card >
      {transactions.length > 0 ? (<Box>
        <GridContainer container spacing={2} display={isLargeScreen ? 'flex' : 'grid'} alignItems={'center'} justifyContent={'center'} maxWidth={'lg'}>
          <GridItem item xs={12} sm={6} md={3}>
            <StyledCard variant="outlined">
              <IconWrapper>
                <AttachMoneyIcon color="primary" />
              </IconWrapper>
              <CardContentWrapper>
                <Typography variant="subtitle1" color="textSecondary">
                  Balance
                </Typography>
                <Typography variant="h5" color="primary">
                  {formatCurrency(currenctBalance)}
                </Typography>
              </CardContentWrapper>
            </StyledCard>
          </GridItem>
          <GridItem item xs={12} sm={6} md={3}>
            <StyledCard variant="outlined">
              <IconWrapper>
                <ArrowUpwardIcon color="success" />
              </IconWrapper>
              <CardContentWrapper>
                <Typography variant="subtitle1" color="textSecondary">
                  Monto de Ingresos
                </Typography>
                <Typography variant="h5" color="success">
                  {formatCurrency(currentIncome)}
                </Typography>
              </CardContentWrapper>
            </StyledCard>
          </GridItem>
          <GridItem item xs={12} sm={6} md={3}>
            <StyledCard variant="outlined">
              <IconWrapper>
                <ArrowDownwardIcon color="error" />
              </IconWrapper>
              <CardContentWrapper>
                <Typography variant="subtitle1" color="textSecondary">
                  Monto de Egresos
                </Typography>
                <Typography variant="h5" color="error">
                  {formatCurrency(currentOutcome)}
                </Typography>
              </CardContentWrapper>
            </StyledCard>
          </GridItem>
        </GridContainer>
        <div
          style={{
            display: isLargeScreen ? "flex" : "grid",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          <LineChart
            sx={{ backgroundColor: isDarkMode ? "#1a1a1a" : "#F7F7F7" }}
            xAxis={[{ data: transactions.map((transaction) => DateTime.fromFormat(transaction.fecha.toString(), "yyyy-MM-dd").day) }]}
            series={[
              {
                label: "Ingresos por Día del Mes",

                data: transactions.map((transaction) => handleChangeAmmount(transaction.monto_transaccion, transaction.moneda, transaction.tasa_cambio)),
                color: '#00fcce'
              },
            ]}
            width={isLargeScreen ? 500 : 400}
            height={400}
          />
          <PieChart
            sx={{ backgroundColor: isDarkMode ? "#1a1a1a" : "#F7F7F7" }}
            series={[
              {
                data: [
                  { id: 0, value: currentIncome, label: "Ingresos", color: "#0bb302" },
                  { id: 1, value: currentOutcome, label: "Egresos", color: "#fc0000" },
                ],
              },
            ]}
            width={isLargeScreen ? 500 : 400}
            height={400}
          />
        </div>
        <div
          style={{
            display: isLargeScreen ? "flex" : "grid",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "2rem",
            marginTop: "wrem",
          }}
        >
          {transactions.filter((tr) => tr.tipo_operacion === "RESTA").length === 0 && (
            <BarChart
              sx={{ backgroundColor: isDarkMode ? "#1a1a1a" : "#F7F7F7" }}
              xAxis={[
                { scaleType: "band", data: transactions.filter((tr) => tr.tipo_operacion === "RESTA").map((transaction) => transaction.origen) },
              ]}
              series={[{ data: transactions.filter((tr) => tr.tipo_operacion === "RESTA").map((transaction) => handleChangeAmmount(transaction.monto_transaccion, transaction.moneda, transaction.tasa_cambio)), label: "Gastos por categoría", color: "#e04c02" }]}
              layout="vertical"

              width={isLargeScreen ? 500 : 400}
              height={400}
            />
          )

          }

          {transactions.filter((tr) => tr.tipo_operacion === "SUMA") && (
            <BarChart
              sx={{ backgroundColor: isDarkMode ? "#1a1a1a" : "#F7F7F7" }}
              xAxis={[
                { scaleType: "band", data: transactions.filter((tr) => tr.tipo_operacion === "SUMA").map((transaction) => transaction.origen) },
              ]}
              series={[{ data: transactions.filter((tr) => tr.tipo_operacion === "SUMA").map((transaction) => handleChangeAmmount(transaction.monto_transaccion, transaction.moneda, transaction.tasa_cambio)), label: "Ingresos por categoría", color: "#000dfc" }]}
              layout="vertical"

              width={isLargeScreen ? 500 : 400}
              height={400}
            />
          )
          }
        </div>
      </Box>) : (
        <Box sx={{ marginBottom: '2rem' }}>
          <Typography variant="h5" color="textSecondary" sx={{ textAlign: 'center', marginTop: '2rem' }}>
            No se encontraron resultados
          </Typography>
          <img src={Robot} alt="Logo" height={300} />
        </Box>
      )}
    </Container>
  );
}

export default Statistics;
