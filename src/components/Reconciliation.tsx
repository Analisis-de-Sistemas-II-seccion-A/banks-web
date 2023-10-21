import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {
  Avatar,
  Container,
  useMediaQuery,
  Tooltip,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  Box,
  Alert,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dataService, { subscribeToSelectedBank } from "../services/Bank.service";
import { Bank } from "../interfaces/Bank.interface";
import { useNavigate } from "react-router-dom";
import { ArrowForwardIosOutlined, Close, Search } from "@mui/icons-material";
import bi from '../assets/bi.jpg';
import banrural from '../assets/banrural.png';
import bam from '../assets/bam.jpg';
import { Account } from "../interfaces/Account.interface";
import { DateRange, DateRangePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { DateTime } from "luxon";
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import React from "react";
import { TransactionHistory } from "../interfaces/TransactionHistory.interface";
import TransactionService from "../services/Transaction.service";
import ReconciliationService from "../services/Reconciliation.service";
import HappyRobot from '../assets/happyrobot.png';
import { Reconciliation } from "../interfaces/Reconciliation.interface";

function BankReconciliation({ theme }: any) {
  const navigate = useNavigate();
  const isDarkMode: boolean = theme.palette.mode === "dark";
  const isLargeScreen = useMediaQuery("(min-width: 1200px)");
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  const [value, setValue] = React.useState<DateRange<DateTime>>([null, null]);
  const [transactions, setTransactions] = useState<TransactionHistory[]>([]);
  const [bankPayments, setBankPayments] = useState<number>(0);
  const [systemPayments, setSystemPayments] = useState<number>(0);
  const [bankCharge, setBankCharge] = useState<number>(0);
  const [systemCharge, setSystemCharge] = useState<number>(0);
  const [bankPaymentError, setBankPaymentError] = useState<boolean>(false);
  const [bankChargeError, setBankChargeError] = useState<boolean>(false);
  const [isRangeInvalid, setIsRangeInvalid] = useState<boolean>(false);
  const [bankResult, setBankResult] = useState<number>(0);
  const [systemResult, setSystemResult] = useState<number>(0);
  const [reconciliations, setReconciliations] = useState<Reconciliation[]>([]);

  useEffect(() => {
    setSelectedBank(dataService.selectedBank);
    const unsubscribe = subscribeToSelectedBank((newSelectedBank) => {
      setSelectedBank(newSelectedBank);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    dataService.getAccounts(selectedBank?.BNC_BANCO!).then((response) => {
      setAccounts(response);
    });
  }, [selectedBank]);

  useEffect(() => {
    ReconciliationService.getReconciliations().then((response) => {
      setReconciliations(response);
    });
  }, []);
  const getTransactions = async (initDate: string, endDate: string, account: number) => {
    TransactionService.getTransactionHistorySearch(account, null, initDate, endDate).then(async (response) => {
      setTransactions(response);
      handleSetSystemResults(response);
    });
  }

  const obtenerImagen = (nombreImagen: string) => {
    if (nombreImagen === 'bi') return bi;
    if (nombreImagen === 'banrural') return banrural;
    if (nombreImagen === 'bam') return bam;
  }

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleSetSystemResults = (result: TransactionHistory[]) => {
    let income = 0;
    let outcome = 0;

    result.forEach((transaction) => {
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

    setSystemCharge(income);
    setSystemPayments(outcome);
    handleCalculateSystemResult(income, outcome);
  }

  const handleRedirect = (route: string) => {
    navigate(`/${route}`);

  };


  const handleSubmitAccount = async () => {
    setIsRangeInvalid(false);

    if (!selectedAccount || !value[0] || !value[1]) {
      setIsRangeInvalid(true);
    }

    if (selectedAccount && value[0] && value[1]) {
      await getTransactions(value[0].toISODate() || "", value[1].toISODate() || "", selectedAccount!);
    }
  };

  const handleSubmitConciliation = () => {
    if (bankPayments || bankCharge) {
      handleSaveConciliation();
    } else {
      if (!bankPayments) {
        setBankPaymentError(true);
      }
      if (!bankCharge) {
        setBankChargeError(true);
      }
    }
  }

  const handleSaveConciliation = () => {
    ReconciliationService.insertReconciliation({
      CON_FECHA: DateTime.now().toISODate() || "",
      CON_INGRESOS_BANCO: bankCharge,
      CON_EGRESOS_BANCO: bankPayments,
      CON_INGRESOS_SISTEMA: systemCharge,
      CON_EGRESOS_SISTEMA: systemPayments,
      CON_DIFERENCIA: bankResult > systemResult ? bankResult - systemResult : systemResult - bankResult,
      cnt_cuenta: selectedAccount!
    }).then((response) => {
      TransactionService.insertTransaction({
        TRA_MONTO: bankResult > systemResult ? bankResult - systemResult : systemResult - bankResult,
        TRA_DESCRIPCION: "CONCILIACIÓN",
        TTR_TIPO_TRANSACCION: bankResult > systemResult ? 1 : 2,
        OTR_ORIGEN_TRANSACCION: 23,
        CNT_CUENTA: selectedAccount!,
        CON_CONCILIACION: response.CON_CONCILIACION,
        TRA_FECHA: DateTime.now().toISODate() || ""
      }).then(() => {
        handleRedirect(`accounts/${selectedAccount}/detail`);
      });
    });
  }

  const handleCalculateBankResult = (charge: number, payments: number) => {
    const result = charge - payments;
    setBankResult(result);
  }

  const handleCalculateSystemResult = (charge: number, payments: number) => {
    const result = charge - payments;
    setSystemResult(result);
  }

  const columns: GridColDef[] = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 150,
      align: "center",
      headerAlign: "center",
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
    },
    {
      field: "pagosRealizados1",
      headerName: "Egresos Sistema",
      width: 200,
      type: "number",
      align: "center",
      headerAlign: "center",
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
    },
    {
      field: "cobrosRealizados1",
      headerName: "Ingresos Sistema",
      width: 200,
      type: "number",
      align: "center",
      headerAlign: "center",
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
    },
    {
      field: "pagosRealizados2",
      headerName: "Egresos Estado Cuenta",
      width: 200,
      type: "number",
      align: "center",
      headerAlign: "center",
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
    },
    {
      field: "cobrosRealizados2",
      headerName: "Ingresos Estado Cuenta",
      width: 200,
      type: "number",
      align: "center",
      headerAlign: "center",
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
    },
    {
      field: "diferencia",
      headerName: "Diferencia",
      width: 200,
      type: "number",
      align: "center",
      headerAlign: "center",
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
    },
  ];


  const rows = reconciliations.map((reconciliation) => {
    return {
      id: reconciliation.CON_CONCILIACION,
      fecha: reconciliation.CON_FECHA,
      pagosRealizados1: formatCurrency(reconciliation.CON_EGRESOS_SISTEMA),
      cobrosRealizados1: formatCurrency(reconciliation.CON_INGRESOS_SISTEMA),
      pagosRealizados2: formatCurrency(reconciliation.CON_EGRESOS_BANCO),
      cobrosRealizados2: formatCurrency(reconciliation.CON_INGRESOS_BANCO),
      diferencia: formatCurrency(reconciliation.CON_DIFERENCIA),
    };
  });

  if (!selectedBank) {
    return (
      <div style={{ marginBottom: "25rem" }}>
        Seleccione un Banco para realizar una conciliación.
      </div>
    );
  }

  return (
    <Container maxWidth="lg">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <Avatar
          alt="User Avatar"
          src={obtenerImagen(selectedBank.BNC_IMAGEN)}
          style={{ marginRight: "2rem" }}
        />
        <Typography
          variant="h4"
          align={"left"}
          color="textPrimary"
          gutterBottom
        >
          Conciliación Bancaria {selectedBank.BNC_NOMBRE}
        </Typography>
      </div>
      <Card variant="outlined">
        <CardContent
          sx={{
            backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              display: isLargeScreen ? "2rem" : "grid",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              container
              spacing={0}
              direction="column"
              display={isLargeScreen ? "grid" : "flex"}
              alignItems="center"
              justifyContent="center"
            >
              <Grid
                container
                spacing={2}
                sx={{
                  display: isLargeScreen ? "flex" : "grid",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                <FormControl
                  size="small"
                  sx={{ m: 1, minWidth: 300 }}
                >
                  <InputLabel >Seleccione una Cuenta</InputLabel>
                  <Select
                    size="small"
                    onChange={(event) => {
                      setSelectedAccount(event.target.value as number);

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
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                container
                spacing={0}
                direction="column"
                display={isLargeScreen ? "grid" : "flex"}
                alignItems="center"
                justifyContent="center"
                marginTop={"2rem"}>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ marginBottom: "0.5rem" }}
                >
                  Elige el rango de fechas de la conciliación
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                container
                spacing={0}
                direction="column"
                display={isLargeScreen ? "grid" : "flex"}
                alignItems="center"
                justifyContent="center"
                marginBottom={"2rem"}>
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <DateRangePicker
                    value={value}
                    maxDate={DateTime.now()}
                    onAccept={async (newValue) => { setValue(newValue) }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                container
                spacing={0}
                direction="column"
                display={isLargeScreen ? "grid" : "flex"}
                alignItems="center"
                justifyContent="center"
                marginBottom={"2rem"}>
                <Button
                  variant="contained"
                  startIcon={<Search />}
                  size="large"
                  onClick={handleSubmitAccount}
                  style={{ width: "100%" }}
                >
                  Buscar
                </Button>
              </Grid>
            </Grid>
            { isRangeInvalid && (
                 <Grid
                 container
                 alignItems="center"
                 justifyContent="center"
                 >
                   <Alert severity="error" action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setIsRangeInvalid(false);
                        }}
                      >
                        <Close fontSize="inherit" />
                      </IconButton>
                    }>Ingrese todos los campos</Alert>
                 </Grid>
          )
          }
            {transactions.length > 0 ? (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Según Transacciones Ingresadas
                </Typography>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    display: isLargeScreen ? "2rem" : "grid",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "1rem",
                  }}
                >
                  <Grid >
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Pagos Realizados
                      </InputLabel>
                      <OutlinedInput
                        disabled={true}
                        id="outlined-adornment-amount"
                        name="pagos1"
                        label="Pagos Realizados"
                        size="small"
                        value={formatCurrency(systemPayments)}
                        onChange={(e) => setSystemPayments(e.target.value as unknown as number)}
                        onBlur={(e) => handleCalculateSystemResult(systemCharge, e.target.value as unknown as number)}
                        style={{
                          backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                          borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid marginLeft={0.5}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Cobros Realizados
                      </InputLabel>
                      <OutlinedInput
                        disabled={true}
                        id="outlined-adornment-amount"
                        name="cobros1"
                        label="Cobros Realizados"
                        size="small"
                        value={formatCurrency(systemCharge)}
                        onChange={(e) => setSystemCharge(e.target.value as unknown as number)}
                        onBlur={(e) => handleCalculateSystemResult(e.target.value as unknown as number, systemPayments)}
                        style={{
                          backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                          borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    display: isLargeScreen ? "2rem" : "grid",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "1rem",
                    marginBottom: "2rem",
                  }}
                >
                  <Tooltip title="Resultado">
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Resultado
                      </InputLabel>
                      <OutlinedInput
                        disabled
                        id="outlined-adornment-amount"
                        name="resultado"
                        label="resultado"
                        size="small"
                        value={formatCurrency(systemResult)}
                        style={{
                          backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                          borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                        }}
                      />
                    </FormControl>
                  </Tooltip>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography variant="h6" gutterBottom>
                    Según Estado de cuenta
                  </Typography>
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      display: isLargeScreen ? "flex" : "grid",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <Grid>
                      <Tooltip title="Ingrese los Débitos que se muestran en el estado de cuenta del Banco">
                        <FormControl fullWidth sx={{ m: 1 }}>
                          <InputLabel htmlFor="outlined-adornment-amount">
                            Pagos Realizados
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={
                              <InputAdornment position="start">Q</InputAdornment>
                            }
                            name="pagos2"
                            label="Pagos Realizados"
                            size="small"
                            value={bankPayments}
                            onChange={(e) => setBankPayments(e.target.value as unknown as number)}
                            onBlur={(e) => handleCalculateBankResult(bankCharge, e.target.value as unknown as number)}
                            error={bankPaymentError}
                            style={{
                              backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                              borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                            }}
                          />
                        </FormControl>
                      </Tooltip>
                    </Grid>
                    <Grid marginLeft={0.5}>
                      <Tooltip title="Ingrese los Créditos que se muestran en el estado de cuenta del Banco">
                        <FormControl fullWidth sx={{ m: 1 }}>
                          <InputLabel htmlFor="outlined-adornment-amount">
                            Cobros Realizados
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={
                              <InputAdornment position="start">Q</InputAdornment>
                            }
                            name="cobros2"
                            label="Cobros Realizados"
                            size="small"
                            value={bankCharge}
                            onChange={(e) => setBankCharge(e.target.value as unknown as number)}
                            onBlur={(e) => handleCalculateBankResult(e.target.value as unknown as number, bankResult)}
                            error={bankChargeError}
                            style={{
                              backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                              borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                            }}
                          />
                        </FormControl>
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      display: isLargeScreen ? "2rem" : "grid",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "1rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <Tooltip title="Resultado">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">
                          Resultado
                        </InputLabel>
                        <OutlinedInput
                          disabled
                          id="outlined-adornment-amount"
                          startAdornment={
                            <InputAdornment position="start">Q</InputAdornment>
                          }
                          name="resultado"
                          label="resultado"
                          size="small"
                          value={bankResult}
                          style={{
                            backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                            borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                          }}
                        />
                      </FormControl>
                    </Tooltip>
                  </Grid>
                  <Button
                    variant="contained"
                    size="medium"
                    endIcon={<ArrowForwardIosOutlined />}
                    onClick={handleSubmitConciliation}
                  >
                    Conciliar
                  </Button>
                </Grid>
              </Box>
            ) : (
              <Box sx={{ marginBottom: '2rem' }}>
          <Typography variant="h5" color="textSecondary" sx={{ textAlign: 'center', marginTop: '2rem' }}>
            Selecciona parametros diferentes para realizar una conciliación
          </Typography>
          <img src={HappyRobot} alt="Logo" height={300} />
        </Box>
            )

            }
          </Grid>
        </CardContent>
      </Card>
      <div style={{ height: "100%", marginTop: "20px", marginBottom: "2rem" }}>
        <Typography
          variant="h6"
          align={"left"}
          color="textPrimary"
          gutterBottom
        >
          Últimas Conciliaciones
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{
            backgroundColor: isDarkMode ? "#1a1a1a" : "",
            color: isDarkMode ? "#959595" : "black",
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </Container>
  );
}

export default BankReconciliation;
