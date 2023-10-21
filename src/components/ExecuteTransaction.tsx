import {
  Container,
  Typography,
  Select,
  FormControl,
  InputLabel,
  Card,
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  Button,
  Tooltip,
  useMediaQuery,
  FormHelperText,
  Alert,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Close, Save } from "@mui/icons-material";
import dataservice, { subscribeToSelectedBank } from "../services/Bank.service";
import { Bank } from "../interfaces/Bank.interface";
import { Account } from "../interfaces/Account.interface";
import CatalogService from "../services/Catalog.service";
import { DocumentType } from "../interfaces/DocumentType.interface";
import { DocumentState } from "../interfaces/DocumentState.interface";
import { TransactionOrigin } from "../interfaces/TransactionOrigin.interface";
import TransactionService from "../services/Transaction.service";

const ExecuteTransaction = ({ theme }: any) => {
  const isDarkMode: boolean = theme.palette.mode === "dark";
  const isLargeScreen = useMediaQuery("(min-width: 600px)");
  const { type } = useParams();
  const navigate = useNavigate();

  const [numeroCuenta, setNumeroCuenta] = useState<number | null>(null);
  const [tipoDocumento, setTipoDocumento] = useState<number | null>(null);
  const [numeroDocumento, setNumeroDocumento] = useState<number | null>(null);
  const [estadoDocumento, setEstadoDocumento] = useState<number | null>(null);
  const [origenIngreso, setOrigenIngreso] = useState<number | null>(null);
  const [fecha, setFecha] = useState("");
  const [monto, setMonto] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [numeroCuentaError, setNumeroCuentaError] = useState(false);
  const [tipoDocumentoError, setTipoDocumentoError] = useState(false);
  const [numeroDocumentoError, setNumeroDocumentoError] = useState(false);
  const [estadoDocumentoError, setEstadoDocumentoError] = useState(false);
  const [origenIngresoError, setOrigenIngresoError] = useState(false);
  const [fechaError, setFechaError] = useState(false);
  const [montoError, setMontoError] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [documentState, setDocumentState] = useState<DocumentState[]>([]);
  const [transactionOrigin, setTransactionOrigin] = useState<TransactionOrigin[]>([]);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    setSelectedBank(dataservice.selectedBank);
    const unsubscribe = subscribeToSelectedBank((newSelectedBank) => {
      setSelectedBank(newSelectedBank);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const validKeysForNumber = [
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
  ];

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

  useEffect(() => {
    dataservice.getAccounts(dataservice.selectedBank().BNC_BANCO).then((accounts) => {
      setAccounts(accounts);
    });
  }, [selectedBank]);

  useEffect(() => {
    CatalogService.getDocumentStates().then((documentStates) => {
      setDocumentState(documentStates);
    });

    CatalogService.getDocumentTypes().then((documentTypes) => {
      setDocumentTypes(documentTypes);
    });

    CatalogService.getOrigins().then((transactionOrigin) => {
      setTransactionOrigin(transactionOrigin);
    });
  }, []);

  const handleSubmit = () => {
    let hasError = false;
    if (!numeroCuenta) {
      setNumeroCuentaError(true);
      hasError = true;
    } else {
      setNumeroCuentaError(false);
    }
    if (!tipoDocumento) {
      setTipoDocumentoError(true);
      hasError = true;
    } else {
      setTipoDocumentoError(false);
    }
    if (!numeroDocumento) {
      setNumeroDocumentoError(true);
      hasError = true;
    } else {
      setNumeroDocumentoError(false);
    }
    if (!estadoDocumento) {
      setEstadoDocumentoError(true);
      hasError = true;
    } else {
      setEstadoDocumentoError(false);
    }
    if (!origenIngreso) {
      setOrigenIngresoError(true);
      hasError = true;
    } else {
      setOrigenIngresoError(false);
    }
    if (!fecha) {
      setFechaError(true);
      hasError = true;
    } else {
      setFechaError(false);
    }
    if (!monto) {
      setMontoError(true);
      hasError = true;
    } else {
      setMontoError(false);
    }

    if (!hasError && monto) {
      if (type != "income"
        &&  (accounts.find((account) => account.CNT_CUENTA === numeroCuenta)?.CNT_SALDO! < monto)) {
          setAlert(true);
        } else {
        TransactionService.insertTransaction({
          TRA_NUMERO_DOCUMENTO: numeroDocumento!,
          TRA_DESCRIPCION: description,
          TTR_TIPO_TRANSACCION: type === "income" ? 1 : 2,
          OTR_ORIGEN_TRANSACCION: origenIngreso!,
          TDO_TIPO_DOCUMENTO: tipoDocumento!,
          TRA_MONTO: monto!,
          TRA_FECHA: fecha,
          CNT_CUENTA: numeroCuenta!,
          ed_estado_documento: estadoDocumento!
        }).then(() => {
          navigate("/transactions")
        });
      }
    } else {
      return;

    };
  }
  const titleText =
    type === "income" ? "Ingreso a Cuenta de" : "Egreso de Cuenta de";
  const transaction = type === "income" ? "Ingreso" : "Egreso";
  type === "income"
    ? "Motivo de la nota de crédito"
    : "Motivo de la nota de debito";
  const origenIngresoLabel =
    type === "income" ? "Origen del Ingreso" : "Origen del Egreso";

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        color="textPrimary"
        textAlign={"start"}
        gutterBottom
        marginBottom={"3rem"}
      >
        {titleText} {selectedBank?.BNC_NOMBRE}
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
              style={{ backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7" }}
            >
              <div style={{ margin: "20px" }}>
                <form>
                  <Grid item marginBottom={"1.5rem"}>
                    <div style={{ marginBottom: "1rem" }}>
                      <FormControl size="small" style={{ width: "100%" }}>
                        <InputLabel id="cuenta-select-label">
                          Número de cuenta
                        </InputLabel>
                        <Tooltip
                          placement="top-start"
                          title="Seleccione un número de cuenta"
                        >
                          <Select
                            className="textfield"
                            fullWidth
                            size="small"
                            label="Número de cuenta"
                            value={numeroCuenta}
                            onChange={(e) => {
                              setNumeroCuenta(e.target.value as number);
                              if (numeroCuentaError) {
                                setNumeroCuentaError(false);
                              }
                            }}
                            error={numeroCuentaError}
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
                                {account.CNT_NUMERO_CUENTA + " - " + account.CNT_NOMBRE}
                              </MenuItem>
                            ))}
                          </Select>
                        </Tooltip>
                        {numeroCuentaError && (
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
                    </div>
                  </Grid>
                  <div
                    style={{
                      marginBottom: "1rem",
                      textAlign: "left",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={5.5}
                        lg={5.5}
                        marginBottom={"0.5rem"}
                      >
                        <FormControl size="small" style={{ width: "100%" }}>
                          <InputLabel id="cuenta-select-label">
                            Tipo de documento
                          </InputLabel>
                          <Tooltip
                            placement="top-start"
                            title="Seleccione el tipo de documento"
                          >
                            <Select
                              fullWidth
                              size="small"
                              name="TipoDocumento"
                              label="Tipo de documento"
                              variant="outlined"
                              value={tipoDocumento}
                              onChange={(e) => {
                                //handleTipoDocumentoChange(e);
                                setTipoDocumento(e.target.value as number);
                                if (tipoDocumentoError) {
                                  setTipoDocumentoError(false);
                                }
                              }}
                              error={tipoDocumentoError}
                              style={{
                                backgroundColor: isDarkMode
                                  ? "#3b3b3b"
                                  : "#ffffff",
                                borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                              }}
                            >
                              {documentTypes.map((option) => (
                                <MenuItem
                                  key={option.TD_TIPO_DOCUMENTO}
                                  value={option.TD_TIPO_DOCUMENTO}
                                >
                                  {option.TD_DESCRIPCION}
                                </MenuItem>
                              ))}
                            </Select>
                          </Tooltip>
                          {tipoDocumentoError && (
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
                              *Seleccione un tipo de documento
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        marginBottom={"0.5rem"}
                      >
                        <Tooltip
                          title="Ingrese el número del documento"
                          placement="top-start"
                        >
                          <TextField
                            className="textfield noarrows"
                            fullWidth
                            size="small"
                            label="Número de documento"
                            variant="outlined"
                            type="number"
                            value={numeroDocumento}
                            onChange={(e) => {
                              setNumeroDocumento(e.target.value as unknown as number);
                              if (numeroDocumentoError) {
                                setNumeroDocumentoError(false);
                              }
                            }}
                            error={numeroDocumentoError}
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
                              numeroDocumentoError
                                ? "*Se requiere el número del documento"
                                : null
                            }
                            InputProps={{
                              inputProps: {
                                min: 0,
                              },
                            }}
                            onKeyDown={(e) => {
                              if (!validKeysForNumber.includes(e.key)) {
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
                      </Grid>
                    </Grid>
                  </div>
                  <div
                    style={{
                      marginBottom: "2rem",
                      textAlign: "left",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={12}
                        sm={5.5}
                        md={5}
                        lg={5}
                        marginBottom={"0.5rem"}
                      >
                        <FormControl size="small" style={{ width: "100%" }}>
                          <InputLabel id="cuenta-select-label">
                            Estado del documento
                          </InputLabel>
                          <Tooltip
                            placement="top-start"
                            title="Seleccione el estado del documento"
                          >
                            <Select
                              className="textfield"
                              fullWidth
                              size="small"
                              label="Estado del documento"
                              value={estadoDocumento}
                              onChange={(e) => {
                                setEstadoDocumento(e.target.value as number);
                                if (estadoDocumentoError) {
                                  setEstadoDocumentoError(false);
                                }
                              }}
                              error={estadoDocumentoError}
                              style={{
                                backgroundColor: isDarkMode
                                  ? "#3b3b3b"
                                  : "#ffffff",
                                borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                              }}
                            >
                              {documentState.map((option) => (
                                <MenuItem
                                  key={option.ED_ESTADO_DOCUMENTO}
                                  value={option.ED_ESTADO_DOCUMENTO}
                                >
                                  {option.ED_DESCRIPCION}
                                </MenuItem>
                              ))}
                            </Select>
                          </Tooltip>
                          {estadoDocumentoError && (
                            <FormHelperText
                              sx={{
                                backgroundColor: isDarkMode
                                  ? "#1e1e1e"
                                  : "#f7f7f7",
                                color: "#f44336",
                                margin: 0,
                              }}
                            >
                              *Seleccione el estado del documento
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <FormControl size="small" style={{ width: "100%" }}>
                          <InputLabel id="cuenta-select-label">
                            {origenIngresoLabel}
                          </InputLabel>
                          <Tooltip
                            placement="top-start"
                            title={` Seleccione el ${origenIngresoLabel}`}
                          >
                            <Select
                              className="textfield"
                              fullWidth
                              size="small"
                              label={origenIngresoLabel}
                              value={origenIngreso}
                              onChange={(e) => {
                                setOrigenIngreso(e.target.value as number);
                                if (origenIngresoError) {
                                  setOrigenIngresoError(false);
                                }
                              }}
                              error={origenIngresoError}
                              style={{
                                backgroundColor: isDarkMode
                                  ? "#3b3b3b"
                                  : "#ffffff",
                                borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                              }}
                            >
                              {transactionOrigin.map((option) => (
                                <MenuItem
                                  key={option.OTR_ORIGEN_TRANSACCION}
                                  value={option.OTR_ORIGEN_TRANSACCION}
                                >
                                  {option.OTR_DESCRIPCION}
                                </MenuItem>
                              ))}
                            </Select>
                          </Tooltip>
                          {origenIngresoError && (
                            <FormHelperText
                              sx={{
                                backgroundColor: isDarkMode
                                  ? "#1e1e1e"
                                  : "#f7f7f7",
                                color: "#f44336",
                                margin: 0,
                              }}
                            >
                              {` *Seleccione el ${origenIngresoLabel}`}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </div>
                </form>
              </div>
            </Card>
            <Card
              variant="outlined"
              style={{ marginTop: "16px" }}
              sx={{ backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7" }}
            >
              <div
                style={{
                  margin: "20px",
                  marginBottom: "2rem",
                  textAlign: "left",
                }}
              >
                <form>
                  <Grid
                    container
                    spacing={1}
                    style={{ marginBottom: "1.5rem" }}
                  >
                    <Grid item xs={6} sm={5} md={4.2} lg={4.2}>
                      <Tooltip
                        title={`Ingrese la fecha del ${transaction.toLowerCase()}`}
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
                              ? `*Escoja la fecha del ${transaction.toLowerCase()}`
                              : null
                          }
                          style={{
                            backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                            borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                          }}
                        />
                      </Tooltip>
                    </Grid>
                    <Grid
                      item
                      xs={5}
                      sm={5}
                      md={4}
                      lg={4}
                      marginLeft={isLargeScreen ? "2.5rem" : ""}
                    >
                      <FormControl size="small" style={{ width: "100%" }}>
                        <Tooltip
                          title={`Ingrese el monto del ${transaction.toLowerCase()}`}
                          placement="top-start"
                        >
                          <TextField
                            className="noarrows"
                            variant="outlined"
                            label={"Monto"}
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
                              montoError ? `*Se requiere el monto del ${transaction.toLowerCase()}` : null
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
                  <Grid>
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
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        style={{
                          backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                          borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                        }}
                      />
                    </Tooltip>
                  </Grid>
                  {alert && (
                    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                      <Alert severity="error" action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setAlert(false);
                          }}
                        >
                          <Close fontSize="inherit" />
                        </IconButton>
                      }>No se puede agregar un monto mayor al de la cuenta</Alert>
                    </div>)
                  }
                  <div style={{ marginTop: "2rem", textAlign: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={<Save />}
                      onClick={handleSubmit}
                    >
                      Guardar
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

export default ExecuteTransaction;
