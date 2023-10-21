import {
  Container,
  Typography,
  Select,
  FormControl,
  InputLabel,
  Card,
  Grid,
  TextField,
  Tooltip,
  Button,
  MenuItem,
  InputAdornment,
  FormHelperText,
  useMediaQuery,
  Alert,
  IconButton,
} from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import dataservice, { subscribeToSelectedBank } from "../services/Bank.service";
import { Bank } from "../interfaces/Bank.interface";
import { useEffect, useState } from "react";
import { Account } from "../interfaces/Account.interface";
import CatalogService from "../services/Catalog.service";
import { Currency } from "../interfaces/Currency.interface";
import { Close } from "@mui/icons-material";
import TransactionService from "../services/Transaction.service";
import { useNavigate } from "react-router";

const Transfer = ({ theme }: any) => {
  const isDarkMode: boolean = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery("(min-width: 600px)");
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [numeroCuentaOrigen, setNumeroCuentaOrigen] = useState<number | null>();
  const [numeroCuentaDestino, setNumeroCuentaDestino] = useState<
    number | null
  >();
  const [fecha, setFecha] = useState("");
  const [monto, setMonto] = useState<number | null>();
  const [NCOrigenError, setNCOrigenError] = useState(false);
  const [NCDestinoError, setNCDestinoError] = useState(false);
  const [fechaError, setFechaError] = useState(false);
  const [montoError, setMontoError] = useState(false);
  const [BDError, setBDError] = useState(false);
  const [bankDestination, setBankDestination] = useState<number | null>(null);
  const [destinationAccounts, setDestinationAccounts] = useState<Account[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [showError, setShowError] = useState(false);
  const [description, setDescription] = useState<string | null>();

  useEffect(() => {
    setSelectedBank(dataservice.selectedBank);
    const unsubscribe = subscribeToSelectedBank((newSelectedBank) => {
      setSelectedBank(newSelectedBank);
      clearInputs();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    dataservice
      .getAccounts(dataservice.selectedBank().BNC_BANCO)
      .then((accounts) => {
        setAccounts(accounts);
      });

    CatalogService.getCurrencies().then((currencies) => {
      setCurrencies(currencies);
    });

    dataservice.getBanks().then((banks) => {
      if (selectedBank) {
        setBanks(
          banks.filter((bank) => bank.BNC_BANCO !== selectedBank.BNC_BANCO)
        );
      }
    });
  }, [selectedBank]);

  const getDestinationAccounts = async (bankId: number) => {
    await dataservice.getAccounts(bankId).then((accounts) => {
      setDestinationAccounts(accounts);
    });
  };

  const clearInputs = () => {
    setNumeroCuentaOrigen(null);
    setNumeroCuentaDestino(null);
    setFecha("");
    setMonto(null);
    setBankDestination(null);
  };
  const validKeysforMoney = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "Backspace",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    ".",
  ];
  const handleSubmit = () => {
    if (!numeroCuentaOrigen) {
      setNCOrigenError(true);
    } else {
      setNCOrigenError(false);
    }
    if (!bankDestination) {
      setBDError(true);
    } else {
      setBDError(false);
    }
    if (!numeroCuentaDestino) {
      setNCDestinoError(true);
    } else {
      setNCDestinoError(false);
    }
    if (!fecha) {
      setFechaError(true);
    } else {
      setFechaError(false);
    }
    if (!monto) {
      setMontoError(true);
    } else {
      setMontoError(false);
    }
    if (
      numeroCuentaOrigen &&
      numeroCuentaDestino &&
      fecha &&
      monto &&
      bankDestination
    ) {
      if (
        accounts.find((account) => account.CNT_CUENTA === numeroCuentaOrigen)
          ?.MND_MONEDA !==
          destinationAccounts.find(
            (account) => account.CNT_CUENTA === numeroCuentaDestino
          )?.MND_MONEDA ||
        accounts.find((account) => account.CNT_CUENTA === numeroCuentaOrigen)
          ?.CNT_SALDO! < monto
      ) {
        setShowError(true);
      } else {
        TransactionService.insertTransaction({
          TRA_DESCRIPCION: description || "Tranferencias",
          TTR_TIPO_TRANSACCION: 3,
          OTR_ORIGEN_TRANSACCION: 4,
          TRA_MONTO: monto,
          TRA_FECHA: fecha,
          CNT_CUENTA: numeroCuentaOrigen,
        }).then(() => {
          TransactionService.insertTransaction({
            TRA_DESCRIPCION: description || "Tranferencias",
            TTR_TIPO_TRANSACCION: 1,
            OTR_ORIGEN_TRANSACCION: 3,
            TRA_MONTO: monto,
            TRA_FECHA: fecha,
            CNT_CUENTA: numeroCuentaDestino,
          })
            .then(() => {
              navigate("/transactions");
              clearInputs();
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
    }
  };

  const numberInputOnWheelPreventChange = (
    e: React.WheelEvent<HTMLInputElement>
  ) => {
    const targetInput = e.target as HTMLInputElement;
    targetInput.blur();
    e.stopPropagation();
    setTimeout(() => {
      targetInput.focus();
    }, 0);
  };

  const formatCurrency = (ammount: number, currency: string) => {
    return new Intl.NumberFormat(currency === "GTQ" ? "es-GT" : "en-US", {
      style: "currency",
      currency: currency,
    }).format(ammount);
  };

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        color="textPrimary"
        textAlign={"start"}
        gutterBottom
        marginBottom={"2rem"}
      >
        Transferencia de Cuenta de {selectedBank?.BNC_NOMBRE}
      </Typography>
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Grid container justifyContent="center">
          <Grid xs={12} sm={8} md={6} lg={6}>
            <Card
              variant="outlined"
              sx={{ backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7" }}
            >
              <div style={{ margin: "20px" }}>
                <form>
                  <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12}>
                      <FormControl size="small" style={{ width: "100%" }}>
                        <InputLabel id="cuenta-select-label">
                          Cuenta Origen
                        </InputLabel>
                        <Tooltip
                          placement="top-start"
                          title="Seleccione la Cuenta de Origen"
                        >
                          <Select
                            fullWidth
                            size="small"
                            label="Cuenta Origen"
                            value={numeroCuentaOrigen}
                            onChange={(e) => {
                              setNumeroCuentaOrigen(e.target.value as number);
                              if (NCOrigenError) {
                                setNCOrigenError(false);
                              }
                            }}
                            error={NCOrigenError}
                            style={{
                              backgroundColor: isDarkMode
                                ? "#3b3b3b"
                                : "#ffffff",
                              borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                            }}
                          >
                            {accounts.map((account) => (
                              <MenuItem
                                key={account.CNT_CUENTA}
                                value={account.CNT_CUENTA}
                              >
                                {account.CNT_NUMERO_CUENTA +
                                  " - " +
                                  account.CNT_NOMBRE}
                              </MenuItem>
                            ))}
                          </Select>
                        </Tooltip>
                        {NCOrigenError && (
                          <FormHelperText
                            sx={{
                              backgroundColor: isDarkMode
                                ? "#1e1e1e"
                                : "#f7f7f7",
                              color: "#f44336",
                              margin: 0,
                              paddingRight: 1,
                            }}
                          >
                            *Seleccione un número de cuenta
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid
                      container
                      justifyContent="start"
                      spacing={2}
                      marginTop={"0.5px"}
                      marginLeft={"0.5px"}
                    >
                      <Grid item xs={12} sm={4.8} md={4.8} lg={4.8}>
                        <FormControl size="small" style={{ width: "100%" }}>
                          <InputLabel id="cuenta-select-label">
                            Banco Destino
                          </InputLabel>
                          <Tooltip
                            placement="top-start"
                            title="Seleccione el banco de destino"
                          >
                            <Select
                              className="textfield"
                              fullWidth
                              size="small"
                              label="Banco Destino"
                              value={bankDestination}
                              onChange={(e) => {
                                setBankDestination(e.target.value as number);
                                getDestinationAccounts(
                                  e.target.value as number
                                );
                                if (BDError) {
                                  setNCDestinoError(false);
                                }
                              }}
                              error={BDError}
                              style={{
                                backgroundColor: isDarkMode
                                  ? "#3b3b3b"
                                  : "#ffffff",
                                borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                              }}
                            >
                              {banks.map((bank) => (
                                <MenuItem
                                  key={bank.BNC_BANCO}
                                  value={bank.BNC_BANCO}
                                >
                                  {bank.BNC_NOMBRE}
                                </MenuItem>
                              ))}
                            </Select>
                          </Tooltip>
                          {BDError && (
                            <FormHelperText
                              sx={{
                                backgroundColor: isDarkMode
                                  ? "#1e1e1e"
                                  : "#f7f7f7",
                                color: "#f44336",
                                margin: 0,
                                paddingRight: 1,
                              }}
                            >
                              *Seleccione un banco
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      {bankDestination && (
                        <Grid item xs={isLargeScreen ? 7 : 12}>
                          <FormControl size="small" style={{ width: "100%" }}>
                            <InputLabel id="cuenta-select-label">
                              Cuenta Destino
                            </InputLabel>
                            <Tooltip
                              placement="top-start"
                              title="Seleccione la cuenta destino"
                            >
                              <Select
                                className="textfield"
                                fullWidth
                                label="Cuenta Destino"
                                size="small"
                                value={numeroCuentaDestino}
                                onChange={(e) => {
                                  setNumeroCuentaDestino(
                                    e.target.value as number
                                  );
                                  if (NCDestinoError) {
                                    setNCDestinoError(false);
                                  }
                                }}
                                error={NCDestinoError}
                                style={{
                                  backgroundColor: isDarkMode
                                    ? "#3b3b3b"
                                    : "#ffffff",
                                  borderColor: isDarkMode
                                    ? "#3b3b3b"
                                    : "#bcbcbc",
                                }}
                              >
                                {destinationAccounts.map((account) => (
                                  <MenuItem
                                    key={account.CNT_CUENTA}
                                    value={account.CNT_CUENTA}
                                  >
                                    {account.CNT_NUMERO_CUENTA +
                                      " - " +
                                      account.CNT_NOMBRE}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Tooltip>
                            {NCDestinoError && (
                              <FormHelperText
                                sx={{
                                  backgroundColor: isDarkMode
                                    ? "#1e1e1e"
                                    : "#f7f7f7",
                                  color: "#f44336",
                                  margin: 0,
                                  paddingRight: 1,
                                }}
                              >
                                *Seleccione un número de cuenta
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                      )}
                    </Grid>
                    {numeroCuentaOrigen && (
                      <div style={{ marginTop: "2rem" }}>
                        <Grid item xs={12}>
                          <Typography
                            variant="subtitle1"
                            color="textPrimary"
                            gutterBottom
                            textAlign={"center"}
                          >
                            {"Monto disponible para transferir en " +
                              accounts.find(
                                (account) =>
                                  account.CNT_CUENTA === numeroCuentaOrigen
                              )?.CNT_NOMBRE +
                              ": "}
                          </Typography>
                        </Grid>
                        <Grid item textAlign={"center"}>
                          <Typography variant="h6" gutterBottom>
                            {formatCurrency(
                              accounts.find(
                                (account) =>
                                  account.CNT_CUENTA === numeroCuentaOrigen
                              )?.CNT_SALDO!,
                              currencies.find(
                                (currency) =>
                                  currency.MND_MONEDA ===
                                  accounts.find(
                                    (account) =>
                                      account.CNT_CUENTA === numeroCuentaOrigen
                                  )?.MND_MONEDA
                              )?.MND_ABREVIATURA || "GTQ"
                            )}
                          </Typography>
                        </Grid>
                      </div>
                    )}
                    <Grid
                      item
                      xs={isLargeScreen ? 6 : 12}
                      style={{ marginTop: "0.5rem" }}
                    >
                      <Tooltip
                        title={`Ingrese la fecha de la transferencia`}
                        placement="top-start"
                      >
                        <TextField
                          label="Fecha"
                          size="small"
                          type="date"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={fecha}
                          onChange={(e) => {
                            setFecha(e.target.value);
                            if (fechaError) {
                              setFechaError(false);
                            }
                          }}
                          error={fechaError}
                          FormHelperTextProps={{
                            style: {
                              backgroundColor: isDarkMode
                                ? "#1e1e1e"
                                : "#f7f7f7",
                              margin: 0,
                              paddingLeft: "10",
                              paddingRight: "10",
                            },
                          }}
                          helperText={
                            fechaError
                              ? "*Fecha de la transferencia requerida "
                              : null
                          }
                          style={{
                            backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                            borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                          }}
                        />
                      </Tooltip>
                    </Grid>
                    <Grid item xs={isLargeScreen ? 4 : 6}>
                      <FormControl
                        size="small"
                        style={{
                          width: "100%",
                          marginTop: isLargeScreen ? "0.5rem" : "",
                        }}
                      >
                        <Tooltip
                          title="Ingrese el monto de la transferencia"
                          placement="top-start"
                        >
                          <TextField
                            className="noarrows"
                            variant="outlined"
                            label="Monto"
                            size="small"
                            type="number"
                            placeholder="00.00"
                            value={monto}
                            onChange={(e) => {
                              setMonto(e.target.value as unknown as number);
                              if (montoError) {
                                setMontoError(false);
                              }
                            }}
                            error={montoError}
                            FormHelperTextProps={{
                              style: {
                                backgroundColor: isDarkMode
                                  ? "#1e1e1e"
                                  : "#f7f7f7",
                                margin: 0,
                              },
                            }}
                            helperText={
                              montoError
                                ? "*Se requiere el monto de la transferencia"
                                : null
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Q
                                </InputAdornment>
                              ),
                              inputProps: {
                                min: 0,
                              },
                            }}
                            onKeyDown={(e) => {
                              if (!validKeysforMoney.includes(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            onWheel={numberInputOnWheelPreventChange}
                            style={{
                              backgroundColor: isDarkMode
                                ? "#3b3b3b"
                                : "#ffffff",
                              borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                            }}
                          />
                        </Tooltip>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid style={{ marginTop: "2rem" }}>
                    <Tooltip
                      title="Agregue una descripción o comentario (opcional)"
                      placement="top-start"
                    >
                      <TextField
                        fullWidth
                        multiline
                        size="small"
                        label="Descripción"
                        variant="outlined"
                        minRows={2}
                        maxRows={6}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{
                          backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                          borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                        }}
                      />
                    </Tooltip>
                  </Grid>
                  {showError && (
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "2rem",
                      }}
                    >
                      <Alert
                        severity="error"
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                              setShowError(false);
                            }}
                          >
                            <Close fontSize="inherit" />
                          </IconButton>
                        }
                      >
                        No se puede transferir entre cuentas de diferentes
                        monedas y tampoco un monto mayor al de la cuenta
                      </Alert>
                    </div>
                  )}
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "2rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      id="ingreso-agromercantil"
                      startIcon={<AutorenewIcon />}
                      onClick={handleSubmit}
                    >
                      Transferir
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Transfer;
