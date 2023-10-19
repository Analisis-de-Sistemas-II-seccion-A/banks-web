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
  OutlinedInput,
  useMediaQuery,
  FormHelperText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Save } from "@mui/icons-material";
import dataservice, { subscribeToSelectedBank } from "../services/Bank.service";
import { Bank } from "../interfaces/Bank.interface";

const ExecuteTransaction = ({ theme }: any) => {
  const isDarkMode: boolean = theme.palette.mode === "dark";
  const { type } = useParams();
  const [numeroCuenta, setNumeroCuenta] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [estadoDocumento, setEstadoDocumento] = useState("");
  const [origenIngreso, setOrigenIngreso] = useState("");
  const [mostrarCard2, setMostrarCard2] = useState(false);
  const [mostrarCard3, setMostrarCard3] = useState(false);
  const [mostrarCard4, setMostrarCard4] = useState(false);
  const [mostrarCard5, setMostrarCard5] = useState(false);
  const [efectivoChecked, setEfectivoChecked] = useState(false);
  const [chequePropioChecked, setChequePropioChecked] = useState(false);
  const [chequeAjenoChecked, setChequeAjenoChecked] = useState(false);
  const [chequeExtranjeroChecked, setChequeExtranjeroChecked] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 600px)");

  //* Errores y validaciones
  const [numeroCuentaError, setNumeroCuentaError] = useState(false);
  const [tipoDocumentoError, setTipoDocumentoError] = useState(false);
  const [numeroDocumentoError, setNumeroDocumentoError] = useState(false);
  const [estadoDocumentoError, setEstadoDocumentoError] = useState(false);
  const [origenIngresoError, setOrigenIngresoError] = useState(false);

  const validKeysForNumber = [
    // Estas son las teclas que se pueden usar en los inputs de tipo number
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

  const numberInputOnWheelPreventChange = (
    // Evita que el usuario cambie el valor del input con la rueda del mouse
    e: React.WheelEvent<HTMLInputElement>
  ) => {
    const targetInput = e.target as HTMLInputElement;
    targetInput.blur();
    e.stopPropagation();
    setTimeout(() => {
      targetInput.focus();
    }, 0);
  };

  const handleSubmit = () => {
    // Validar los campos aquí antes de enviar los datos
    if (!numeroCuenta) {
      setNumeroCuentaError(true);
    } else {
      setNumeroCuentaError(false);
    }
    if (!tipoDocumento) {
      setTipoDocumentoError(true);
    } else {
      setTipoDocumentoError(false);
    }
    if (!numeroDocumento) {
      setNumeroDocumentoError(true);
    } else {
      setNumeroDocumentoError(false);
    }
    if (!estadoDocumento) {
      setEstadoDocumentoError(true);
    } else {
      setEstadoDocumentoError(false);
    }
    if (!origenIngreso) {
      setOrigenIngresoError(true);
    } else {
      setOrigenIngresoError(false);
    }
    if (
      numeroCuenta &&
      tipoDocumento &&
      numeroDocumento &&
      estadoDocumento &&
      origenIngreso
    ) {
    }
  };

  //& Constantes y demás funciones
  const tipoDocumentoOptions =
    type === "income"
      ? [
          { value: "1", label: "Nota de crédito" },
          { value: "2", label: "Boleta de depósito" },
        ]
      : [
          { value: "3", label: "Nota de débito" },
          { value: "4", label: "Cheque" },
        ];

  const handleTipoDocumentoChange = (event: any) => {
    const selectedTipoDocumento = event.target.value;
    setTipoDocumento(selectedTipoDocumento);
    setMostrarCard2(selectedTipoDocumento === "1");
    setMostrarCard3(selectedTipoDocumento === "2");
    setMostrarCard4(selectedTipoDocumento === "4");
    setMostrarCard5(selectedTipoDocumento === "3");
  };

  const titleText =
    type === "income" ? "Ingreso a Cuenta de" : "Egreso de Cuenta de";
  const motivoLabel =
    type === "income"
      ? "Motivo de la nota de crédito"
      : "Motivo de la nota de debito";
  const origenIngresoLabel =
    type === "income" ? "Origen del Ingreso" : "Origen del Egreso";

  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  useEffect(() => {
    setSelectedBank(dataservice.selectedBank);
    const unsubscribe = subscribeToSelectedBank((newSelectedBank) => {
      setSelectedBank(newSelectedBank);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        color="textPrimary"
        textAlign={"start"}
        gutterBottom
        marginBottom={"3rem"}
      >
        {titleText} {selectedBank?.name}
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
                              setNumeroCuenta(e.target.value);
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
                            <MenuItem value={1}>Cuenta 1</MenuItem>
                            <MenuItem value={2}>Cuenta 2</MenuItem>
                            <MenuItem value={3}>Cuenta 3</MenuItem>
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
                                handleTipoDocumentoChange(e);
                                setTipoDocumento(e.target.value);
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
                              <MenuItem value="">
                                <em>Seleccione un tipo de documento</em>
                              </MenuItem>
                              {tipoDocumentoOptions.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
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
                              setNumeroDocumento(e.target.value);
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
                                min: 0, // Esto evita números negativos
                              },
                            }}
                            onKeyDown={(e) => {
                              // Evita que el usuario escriba letras en el input
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
                                setEstadoDocumento(e.target.value);
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
                              <MenuItem value={1}>Cobrado</MenuItem>
                              <MenuItem value={2}>Pendiente</MenuItem>
                              <MenuItem value={3}>Comprometido</MenuItem>
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
                                setOrigenIngreso(e.target.value);
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
                              <MenuItem value={1}>Ventas</MenuItem>
                              <MenuItem value={2}>Compras</MenuItem>
                              <MenuItem value={3}>Devoluciones</MenuItem>
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

            {mostrarCard2 && (
              <Card
                variant="outlined"
                sx={{
                  marginTop: "16px",
                  backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7",
                }}
              >
                <div style={{ margin: "20px" }}>
                  <form>
                    <div
                      style={{
                        marginBottom: "1rem",
                        textAlign: "left",
                      }}
                    >
                      <Grid container spacing={3} marginBottom={"1.5rem"}>
                        <Grid item xs={12} sm={6} md={6} lg={7}>
                          <Tooltip
                            title="Ingrese el nombre del cliente"
                            placement="top-start"
                          >
                            <TextField
                              fullWidth
                              size="small"
                              label="Nombre del cliente"
                              variant="outlined"
                              /*value={representative}
                              onChange={(e) =>
                                setRepresentative(e.target.value)
                              }
                              error={representativeError}*/
                              style={{
                                backgroundColor: isDarkMode
                                  ? "#3b3b3b"
                                  : "#ffffff",
                                borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                              }}
                            />
                          </Tooltip>
                        </Grid>
                        <Grid item xs={5} sm={4} md={4} lg={4}>
                          <Tooltip
                            title="Ingrese el NIT del cliente"
                            placement="top-start"
                          >
                            <TextField
                              className="textfield noarrows"
                              fullWidth
                              size="small"
                              label="NIT del cliente"
                              variant="outlined"
                              type="number"
                              onWheel={(event) => {
                                event.preventDefault();
                              }}
                              //value={accountNumber}
                              //onChange={(e) => setAccountNumber(e.target.value)}
                              //error={accountNumberError}
                              InputProps={{
                                inputProps: {
                                  min: 0, // Esto evita números negativos
                                },
                              }}
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
                        marginBottom: "1rem",
                        textAlign: "left",
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid
                          item
                          xs={8}
                          sm={5}
                          md={5}
                          lg={5}
                          marginBottom={"1rem"}
                        >
                          <Tooltip
                            title="Ingrese el Número de la factura"
                            placement="top-start"
                          >
                            <TextField
                              className="textfield noarrows"
                              fullWidth
                              size="small"
                              label="Número de la factura"
                              variant="outlined"
                              type="number"
                              onWheel={(event) => {
                                event.preventDefault();
                              }}
                              //value={accountNumber}
                              //onChange={(e) => setAccountNumber(e.target.value)}
                              //error={accountNumberError}
                              InputProps={{
                                inputProps: {
                                  min: 0, // Esto evita números negativos
                                },
                              }}
                              style={{
                                backgroundColor: isDarkMode
                                  ? "#3b3b3b"
                                  : "#ffffff",
                                borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                              }}
                            />
                          </Tooltip>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          sm={5}
                          md={4.5}
                          lg={4.5}
                          marginBottom={"1rem"}
                        >
                          <TextField
                            label="Fecha de la factura"
                            size="small"
                            type="date"
                            variant="outlined"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            style={{
                              backgroundColor: isDarkMode
                                ? "#3b3b3b"
                                : "#ffffff",
                              borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </div>
                    <div
                      style={{
                        marginBottom: "1rem",
                        textAlign: "left",
                      }}
                    >
                      <Grid>
                        <Tooltip
                          title={`Ingrese el ${motivoLabel.toLowerCase()}`}
                          placement="top-start"
                        >
                          <TextField
                            fullWidth
                            multiline
                            size="small"
                            label={motivoLabel}
                            variant="outlined"
                            minRows={2}
                            maxRows={6}
                            //value={accountName}
                            //onChange={(e) => setAccountName(e.target.value)}
                            //error={accountNameError}
                            style={{
                              backgroundColor: isDarkMode
                                ? "#3b3b3b"
                                : "#ffffff",
                              borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                            }}
                          />
                        </Tooltip>
                      </Grid>
                    </div>
                  </form>
                </div>
              </Card>
            )}

            {mostrarCard3 && (
              <Card
                variant="outlined"
                style={{ marginTop: "16px" }}
                sx={{ backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7" }}
              >
                <div
                  style={{
                    margin: "20px",
                    marginBottom: "1rem",
                    textAlign: "left",
                  }}
                >
                  <form>
                    <Grid container spacing={1}>
                      <Grid item xs={6} sm={6} md={5} lg={5}>
                        <Typography
                          variant="subtitle1"
                          style={{ marginBottom: "0.5rem" }}
                        >
                          <strong>Forma de Pago</strong>
                        </Typography>
                        <div style={{ marginBottom: "1.5rem" }}>
                          <input
                            type="checkbox"
                            id="formCheck-1"
                            onChange={() =>
                              setEfectivoChecked(!efectivoChecked)
                            }
                          />
                          <label htmlFor="formCheck-1">Efectivo</label>
                        </div>
                        <div style={{ marginBottom: "1.6rem" }}>
                          <input
                            type="checkbox"
                            id="formCheck-2"
                            onChange={() =>
                              setChequePropioChecked(!chequePropioChecked)
                            }
                          />
                          <label htmlFor="formCheck-2">Cheque Propio</label>
                        </div>
                        <div style={{ marginBottom: "1.3rem" }}>
                          <input
                            type="checkbox"
                            id="formCheck-3"
                            onChange={() =>
                              setChequeAjenoChecked(!chequeAjenoChecked)
                            }
                          />
                          <label htmlFor="formCheck-3">Cheque Ajeno</label>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            id="formCheck-4"
                            onChange={() =>
                              setChequeExtranjeroChecked(
                                !chequeExtranjeroChecked
                              )
                            }
                          />
                          <label htmlFor="formCheck-4">Cheque Extranjero</label>
                        </div>
                      </Grid>
                      <Grid item xs={6} sm={3.8} md={3} lg={5}>
                        <Typography
                          variant="subtitle1"
                          style={{ marginBottom: "0.1rem" }}
                        >
                          <strong>Monto</strong>
                        </Typography>
                        <div style={{ marginBottom: "0.4rem" }}>
                          <Grid item xs={9} sm={9} md={9} lg={9}>
                            <TextField
                              className="textfield"
                              size="small"
                              fullWidth
                              type="text"
                              id="mtnefectivo"
                              variant="outlined"
                              placeholder="00.00"
                              style={{
                                backgroundColor: isDarkMode
                                  ? "#3b3b3b"
                                  : "#ffffff",
                                borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Q
                                  </InputAdornment>
                                ),
                              }}
                              disabled={!efectivoChecked}
                            />
                          </Grid>
                        </div>
                        <div style={{ marginBottom: "0.4rem" }}>
                          <Grid item xs={9} sm={9} md={9} lg={9}>
                            <TextField
                              className="textfield"
                              size="small"
                              fullWidth
                              type="text"
                              id="mntChequePropio"
                              variant="outlined"
                              placeholder="00.00"
                              style={{
                                backgroundColor: isDarkMode
                                  ? "#3b3b3b"
                                  : "#ffffff",
                                borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Q
                                  </InputAdornment>
                                ),
                              }}
                              disabled={!chequePropioChecked}
                            />
                          </Grid>
                        </div>
                        <div style={{ marginBottom: "0.4rem" }}>
                          <Grid item xs={9} sm={9} md={9} lg={9}>
                            <TextField
                              className="textfield"
                              size="small"
                              fullWidth
                              type="text"
                              id="mntChequeAjeno"
                              variant="outlined"
                              placeholder="00.00"
                              style={{
                                backgroundColor: isDarkMode
                                  ? "#3b3b3b"
                                  : "#ffffff",
                                borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    Q
                                  </InputAdornment>
                                ),
                              }}
                              disabled={!chequeAjenoChecked}
                            />
                          </Grid>
                        </div>
                        <Grid item xs={9} sm={9} md={9} lg={9}>
                          <TextField
                            className="textfield"
                            size="small"
                            fullWidth
                            type="text"
                            id="mntChequeExtranjero"
                            variant="outlined"
                            placeholder="00.00"
                            style={{
                              backgroundColor: isDarkMode
                                ? "#3b3b3b"
                                : "#ffffff",
                              borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Q
                                </InputAdornment>
                              ),
                            }}
                            disabled={!chequeExtranjeroChecked}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </Card>
            )}

            {mostrarCard4 && (
              <Card
                variant="outlined"
                style={{ marginTop: "16px" }}
                sx={{ backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7" }}
              >
                <div
                  style={{
                    margin: "20px",
                    marginBottom: "1rem",
                    textAlign: "left",
                  }}
                >
                  <form>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Tooltip
                          title="Ingrese el nombre del beneficiario del cheque"
                          placement="top-start"
                        >
                          <TextField
                            fullWidth
                            size="small"
                            label="Nombre del beneficiario"
                            variant="outlined"
                            /*value={representative}
                              onChange={(e) =>
                                setRepresentative(e.target.value)
                              }
                              error={representativeError}*/
                            style={{
                              backgroundColor: isDarkMode
                                ? "#3b3b3b"
                                : "#ffffff",
                              borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                            }}
                          />
                        </Tooltip>
                      </Grid>
                      <Grid item xs={12} sm={5.8} md={5.5} lg={5.5}>
                        <Tooltip
                          title="Ingrese la referencia o número de factura (opcional)"
                          placement="top-start"
                        >
                          <TextField
                            className="textfield noarrows"
                            fullWidth
                            size="small"
                            label="Referencia de la factura"
                            variant="outlined"
                            type="number"
                            onWheel={(event) => {
                              event.preventDefault();
                            }}
                            //value={accountNumber}
                            //onChange={(e) => setAccountNumber(e.target.value)}
                            //error={accountNumberError}
                            InputProps={{
                              inputProps: {
                                min: 0, // Esto evita números negativos
                              },
                            }}
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
                  </form>
                </div>
              </Card>
            )}

            {mostrarCard5 && (
              <Card
                variant="outlined"
                style={{ marginTop: "16px" }}
                sx={{ backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7" }}
              >
                <div style={{ margin: "20px" }}>
                  <form>
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
                          md={6}
                          lg={7}
                          marginBottom={"0.5rem"}
                        >
                          <Tooltip
                            title="Ingrese el nombre del cliente"
                            placement="top-start"
                          >
                            <TextField
                              fullWidth
                              size="small"
                              label="Nombre del cliente"
                              variant="outlined"
                              /*value={representative}
                              onChange={(e) =>
                                setRepresentative(e.target.value)
                              }
                              error={representativeError}*/
                              style={{
                                backgroundColor: isDarkMode
                                  ? "#3b3b3b"
                                  : "#ffffff",
                                borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                              }}
                            />
                          </Tooltip>
                        </Grid>
                        <Grid
                          item
                          xs={5}
                          sm={4}
                          md={4}
                          lg={4}
                          marginBottom={"0.5rem"}
                        >
                          <Tooltip
                            title="Ingrese el NIT del cliente"
                            placement="top-start"
                          >
                            <TextField
                              className="textfield noarrows"
                              fullWidth
                              size="small"
                              label="NIT del cliente"
                              variant="outlined"
                              type="number"
                              onWheel={(event) => {
                                event.preventDefault();
                              }}
                              //value={accountNumber}
                              //onChange={(e) => setAccountNumber(e.target.value)}
                              //error={accountNumberError}
                              InputProps={{
                                inputProps: {
                                  min: 0, // Esto evita números negativos
                                },
                              }}
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
                        marginBottom: "1rem",
                        textAlign: "left",
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid
                          item
                          xs={8}
                          sm={5}
                          md={5}
                          lg={5}
                          marginBottom={"0.5rem"}
                        >
                          <Tooltip
                            title="Ingrese el Número de la factura"
                            placement="top-start"
                          >
                            <TextField
                              className="textfield noarrows"
                              fullWidth
                              size="small"
                              label="Número de la factura"
                              variant="outlined"
                              type="number"
                              onWheel={(event) => {
                                event.preventDefault();
                              }}
                              //value={accountNumber}
                              //onChange={(e) => setAccountNumber(e.target.value)}
                              //error={accountNumberError}
                              InputProps={{
                                inputProps: {
                                  min: 0, // Esto evita números negativos
                                },
                              }}
                              style={{
                                backgroundColor: isDarkMode
                                  ? "#3b3b3b"
                                  : "#ffffff",
                                borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                              }}
                            />
                          </Tooltip>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          sm={5}
                          md={4.5}
                          lg={4.5}
                          marginBottom={"0.5rem"}
                        >
                          <TextField
                            label="Fecha de la factura"
                            size="small"
                            type="date"
                            variant="outlined"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            style={{
                              backgroundColor: isDarkMode
                                ? "#3b3b3b"
                                : "#ffffff",
                              borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </div>

                    <div
                      style={{
                        marginBottom: "1.5rem",
                        textAlign: "left",
                      }}
                    >
                      <Grid marginBottom={"0.5rem"}>
                        <Tooltip
                          title={`Ingrese el ${motivoLabel.toLowerCase()}`}
                          placement="top-start"
                        >
                          <TextField
                            fullWidth
                            multiline
                            size="small"
                            label={motivoLabel}
                            variant="outlined"
                            minRows={2}
                            maxRows={6}
                            //value={accountName}
                            //onChange={(e) => setAccountName(e.target.value)}
                            //error={accountNameError}
                            style={{
                              backgroundColor: isDarkMode
                                ? "#3b3b3b"
                                : "#ffffff",
                              borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                            }}
                          />
                        </Tooltip>
                      </Grid>
                    </div>
                    <div
                      style={{
                        marginTop: "0.5rem",
                        marginBottom: "1rem",
                        textAlign: "left",
                      }}
                    >
                      <Grid>
                        <Tooltip
                          title={"Ingrese las instrucciones de pago"}
                          placement="top-start"
                        >
                          <TextField
                            fullWidth
                            multiline
                            size="small"
                            label="Instrucciones de pago"
                            variant="outlined"
                            minRows={2}
                            maxRows={6}
                            //value={accountName}
                            //onChange={(e) => setAccountName(e.target.value)}
                            //error={accountNameError}
                            style={{
                              backgroundColor: isDarkMode
                                ? "#3b3b3b"
                                : "#ffffff",
                              borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                            }}
                          />
                        </Tooltip>
                      </Grid>
                    </div>
                  </form>
                </div>
              </Card>
            )}

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
                      <TextField
                        label="Fecha"
                        size="small"
                        type="date"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{
                          backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                          borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                        }}
                      />
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
                        <InputLabel htmlFor="monto">Monto</InputLabel>
                        <OutlinedInput
                          id="monto"
                          startAdornment={
                            <InputAdornment position="start">Q</InputAdornment>
                          }
                          name="monto"
                          label="Monto"
                          size="small"
                          placeholder="00.00"
                          //value={values.cobros1}
                          //onChange={handleChange}
                          //onBlur={calcularResultado}
                          //error={validation.cobros1.error}
                          style={{
                            backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                            borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Tooltip
                      title="Agregue una descripción o comentario"
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
                        //value={accountName}
                        //onChange={(e) => setAccountName(e.target.value)}
                        //error={accountNameError}
                        style={{
                          backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                          borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                        }}
                      />
                    </Tooltip>
                  </Grid>
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
