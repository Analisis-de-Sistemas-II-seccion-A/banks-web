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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Save } from "@mui/icons-material";
import dataservice, { subscribeToSelectedBank } from "../services/Bank.service";
import { Bank } from "../interfaces/Bank.interface";

const ExecuteTransaction = ({ theme }: any) => {
  const isDarkMode: boolean = theme.palette.mode === "dark";
  const isLargeScreen = useMediaQuery("(min-width: 600px)");
  const { type } = useParams();

  const [numeroCuenta, setNumeroCuenta] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [estadoDocumento, setEstadoDocumento] = useState("");
  const [origenIngreso, setOrigenIngreso] = useState("");
  const [fecha, setFecha] = useState("");
  const [monto, setMonto] = useState("");
  //const [descripcion, setDescripcion] = useState("");

  const [nombreCliente, setNombreCliente] = useState("");
  const [nitCliente, setNitCliente] = useState("");
  const [numeroFactura, setNumeroFactura] = useState("");
  const [fechaFactura, setFechaFactura] = useState("");
  const [motivo, setMotivo] = useState("");

  const [mostrarCard2, setMostrarCard2] = useState(false);
  const [mostrarCard3, setMostrarCard3] = useState(false);
  const [mostrarCard4, setMostrarCard4] = useState(false);
  const [mostrarCard5, setMostrarCard5] = useState(false);

  const [efectivoChecked, setEfectivoChecked] = useState(false);
  const [chequePropioChecked, setChequePropioChecked] = useState(false);
  const [chequeAjenoChecked, setChequeAjenoChecked] = useState(false);
  const [chequeExtranjeroChecked, setChequeExtranjeroChecked] = useState(false);

  const [atLeastOneCheked, setAtLeastOneCheked] = useState(false);

  const [mtnefectivo, setMtnefectivo] = useState("");
  const [mntChequePropio, setMntChequePropio] = useState("");
  const [mntChequeAjeno, setMntChequeAjeno] = useState("");
  const [mntChequeExtranjero, setMntChequeExtranjero] = useState("");
  const [total, setTotal] = useState(0);

  const [nombreBeneficiario, setNombreBeneficiario] = useState("");
  const [numeroFactRefe, setNumeroFactRefe] = useState("");

  const [nombreClienteD, setNombreClienteD] = useState("");
  const [nitClienteD, setNitClienteD] = useState("");
  const [numeroFacturaD, setNumeroFacturaD] = useState("");
  const [fechaFacturaD, setFechaFacturaD] = useState("");
  const [motivoD, setMotivoD] = useState("");
  const [instucD, setInstucD] = useState("");

  //* Errores y validaciones
  const [numeroCuentaError, setNumeroCuentaError] = useState(false);
  const [tipoDocumentoError, setTipoDocumentoError] = useState(false);
  const [numeroDocumentoError, setNumeroDocumentoError] = useState(false);
  const [estadoDocumentoError, setEstadoDocumentoError] = useState(false);
  const [origenIngresoError, setOrigenIngresoError] = useState(false);
  const [fechaError, setFechaError] = useState(false);
  const [montoError, setMontoError] = useState(false);
  //const [descripcionError, setDescripcionError] = useState(false);

  const [nombreClienteError, setNombreClienteError] = useState(false);
  const [nitClienteError, setNitClienteError] = useState(false);
  const [numeroFacturaError, setNumeroFacturaError] = useState(false);
  const [fechaFacturaError, setFechaFacturaError] = useState(false);
  const [motivoError, setMotivoError] = useState(false);

  const [mtnefectivoError, setMtnefectivoError] = useState(false);
  const [mntChequePropioError, setMntChequePropioError] = useState(false);
  const [mntChequeAjenoError, setMntChequeAjenoError] = useState(false);
  const [mntChequeExtranjeroError, setMntChequeExtranjeroError] =
    useState(false);

  const [nombreBeneficiarioError, setNombreBeneficiarioError] = useState(false);
  const [numeroFactRefeError, setNumeroFactRefeError] = useState(false);

  const [nombreClienteDError, setNombreClienteDError] = useState(false);
  const [nitClienteDError, setNitClienteDError] = useState(false);
  const [numeroFacturaDError, setNumeroFacturaDError] = useState(false);
  const [fechaFacturaDError, setFechaFacturaDError] = useState(false);
  const [motivoDError, setMotivoDError] = useState(false);
  const [instucDError, setInstucDError] = useState(false);

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
  const handleSubmit = () => {
    // Validar los campos aquí antes de enviar los datos
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
    if (!nombreCliente) {
      setNombreClienteError(true);
      hasError = true;
    } else {
      setNombreClienteError(false);
    }
    if (!nitCliente) {
      setNitClienteError(true);
      hasError = true;
    } else {
      setNitClienteError(false);
    }
    if (!numeroFactura) {
      setNumeroFacturaError(true);
      hasError = true;
    } else {
      setNumeroFacturaError(false);
    }
    if (!fechaFactura) {
      setFechaFacturaError(true);
      hasError = true;
    } else {
      setFechaFacturaError(false);
    }
    if (!motivo) {
      setMotivoError(true);
      hasError = true;
    } else {
      setMotivoError(false);
    }
    if (!mtnefectivo) {
      setMtnefectivoError(true);
      hasError = true;
    } else {
      setMtnefectivoError(false);
    }
    if (!mntChequePropio) {
      setMntChequePropioError(true);
      hasError = true;
    } else {
      setMntChequePropioError(false);
    }
    if (!mntChequeAjeno) {
      setMntChequeAjenoError(true);
      hasError = true;
    } else {
      setMntChequeAjenoError(false);
    }
    if (!mntChequeExtranjero) {
      setMntChequeExtranjeroError(true);
      hasError = true;
    } else {
      setMntChequeExtranjeroError(false);
    }
    if (!nombreBeneficiario) {
      setNombreBeneficiarioError(true);
      hasError = true;
    } else {
      setNombreBeneficiarioError(false);
    }
    if (!numeroFactRefe) {
      setNumeroFactRefeError(true);
      hasError = true;
    } else {
      setNumeroFactRefeError(false);
    }
    if (!nombreClienteD) {
      setNombreClienteDError(true);
      hasError = true;
    } else {
      setNombreClienteDError(false);
    }
    if (!nitClienteD) {
      setNitClienteDError(true);
      hasError = true;
    } else {
      setNitClienteDError(false);
    }
    if (!numeroFacturaD) {
      setNumeroFacturaDError(true);
      hasError = true;
    } else {
      setNumeroFacturaDError(false);
    }
    if (!fechaFacturaD) {
      setFechaFacturaDError(true);
      hasError = true;
    } else {
      setFechaFacturaDError(false);
    }
    if (!motivoD) {
      setMotivoDError(true);
      hasError = true;
    } else {
      setMotivoDError(false);
    }
    if (!instucD) {
      setInstucDError(true);
      hasError = true;
    } else {
      setInstucDError(false);
    }
    if (
      !efectivoChecked &&
      !chequePropioChecked &&
      !chequeAjenoChecked &&
      !chequeExtranjeroChecked
    ) {
      hasError = true;
    }
    setAtLeastOneCheked(true);
    if (hasError) {
      // Hay errores, no se puede enviar el formulario
      return;
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

  const isBoletaDeposito = tipoDocumento === "2";

  //TODO Calcular el monto total de la boleta de deposito

  const handleInputChange = () => {
    let suma = 0;
    if (efectivoChecked && mtnefectivo) {
      suma += parseFloat(mtnefectivo);
    }
    if (chequePropioChecked && mntChequePropio) {
      suma += parseFloat(mntChequePropio);
    }
    if (chequeAjenoChecked && mntChequeAjeno) {
      suma += parseFloat(mntChequeAjeno);
    }
    if (chequeExtranjeroChecked && mntChequeExtranjero) {
      suma += parseFloat(mntChequeExtranjero);
    }
    setTotal(suma); // Actualizar la variable de estado 'total'
  };

  useEffect(() => {
    handleInputChange();
  }, [
    efectivoChecked,
    chequePropioChecked,
    chequeAjenoChecked,
    chequeExtranjeroChecked,
    mtnefectivo,
    mntChequePropio,
    mntChequeAjeno,
    mntChequeExtranjero,
  ]);

  const titleText =
    type === "income" ? "Ingreso a Cuenta de" : "Egreso de Cuenta de";
  const transaction = type === "income" ? "Ingreso" : "Egreso";
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
                              value={nombreCliente}
                              onChange={(e) => {
                                setNombreCliente(e.target.value);
                                if (nombreClienteError) {
                                  setNombreClienteError(false);
                                }
                              }}
                              error={nombreClienteError}
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
                                nombreClienteError
                                  ? "*Se requiere el nombre del cliente"
                                  : null
                              }
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
                              value={nitCliente}
                              onChange={(e) => {
                                setNitCliente(e.target.value);
                                if (nitClienteError) {
                                  setNitClienteError(false);
                                }
                              }}
                              error={nitClienteError}
                              FormHelperTextProps={{
                                style: {
                                  backgroundColor: isDarkMode
                                    ? "#1e1e1e"
                                    : "#f7f7f7",
                                  margin: 0,
                                },
                              }}
                              helperText={
                                nitClienteError
                                  ? "*Se requiere el NIT del cliente"
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
                              value={numeroFactura}
                              onChange={(e) => {
                                setNumeroFactura(e.target.value);
                                if (numeroFacturaError) {
                                  setNumeroFacturaError(false);
                                }
                              }}
                              error={numeroFacturaError}
                              FormHelperTextProps={{
                                style: {
                                  backgroundColor: isDarkMode
                                    ? "#1e1e1e"
                                    : "#f7f7f7",
                                  margin: 0,
                                },
                              }}
                              helperText={
                                numeroFacturaError
                                  ? "*Se requiere el número de la factura"
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
                            value={fechaFactura}
                            onChange={(e) => {
                              setFechaFactura(e.target.value);
                              if (fechaFacturaError) {
                                setFechaFacturaError(false);
                              }
                            }}
                            error={fechaFacturaError}
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
                              fechaFacturaError
                                ? `*Escoja la fecha de la factura`
                                : null
                            }
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
                            value={motivo}
                            onChange={(e) => {
                              setMotivo(e.target.value);
                              if (motivoError) {
                                setMotivoError(false);
                              }
                            }}
                            error={motivoError}
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
                              motivoError
                                ? `*Se requiere el ${motivoLabel.toLowerCase()} `
                                : null
                            }
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
                style={{
                  marginTop: "16px",
                  borderWidth: "1px",
                  backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7",
                  borderColor:
                    atLeastOneCheked &&
                    !efectivoChecked &&
                    !chequePropioChecked &&
                    !chequeAjenoChecked &&
                    !chequeExtranjeroChecked
                      ? "#f44336"
                      : "",
                }}
              >
                <div
                  style={{
                    margin: "20px",
                    marginBottom: "1rem",
                    textAlign: "left",
                  }}
                >
                  <form>
                    {atLeastOneCheked &&
                      !efectivoChecked &&
                      !chequePropioChecked &&
                      !chequeAjenoChecked &&
                      !chequeExtranjeroChecked && (
                        <Typography
                          variant="subtitle1"
                          style={{ color: "#f44336" }}
                        >
                          <p>* Seleccione al menos una forma de pago</p>
                        </Typography>
                      )}
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
                            onChange={(e) => {
                              setEfectivoChecked(e.target.checked);
                              if (!e.target.checked) {
                                setMtnefectivo("");
                              }
                              handleInputChange();
                            }}
                            checked={efectivoChecked}
                          />
                          <label htmlFor="formCheck-1">Efectivo</label>
                        </div>
                        <div style={{ marginBottom: "1.6rem" }}>
                          <input
                            type="checkbox"
                            id="formCheck-2"
                            onChange={(e) => {
                              setChequePropioChecked(e.target.checked);
                              if (!e.target.checked) {
                                setMntChequePropio("");
                              }
                              handleInputChange();
                            }}
                            checked={chequePropioChecked}
                          />
                          <label htmlFor="formCheck-2">Cheque Propio</label>
                        </div>
                        <div style={{ marginBottom: "1.3rem" }}>
                          <input
                            type="checkbox"
                            id="formCheck-3"
                            onChange={(e) => {
                              setChequeAjenoChecked(e.target.checked);
                              if (!e.target.checked) {
                                setMntChequeAjeno("");
                              }
                              handleInputChange();
                            }}
                            checked={chequeAjenoChecked}
                          />
                          <label htmlFor="formCheck-3">Cheque Ajeno</label>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            id="formCheck-4"
                            onChange={(e) => {
                              setChequeExtranjeroChecked(e.target.checked);
                              if (!e.target.checked) {
                                setMntChequeExtranjero("");
                              }
                              handleInputChange();
                            }}
                            checked={chequeExtranjeroChecked}
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
                              className="noarrows"
                              size="small"
                              fullWidth
                              type="number"
                              id="mtnefectivo"
                              variant="outlined"
                              placeholder="00.00"
                              value={mtnefectivo}
                              onChange={(e) => {
                                setMtnefectivo(e.target.value);
                                if (mtnefectivoError) {
                                  setMtnefectivoError(false);
                                }
                              }}
                              error={efectivoChecked && mtnefectivoError}
                              FormHelperTextProps={{
                                style: {
                                  backgroundColor: isDarkMode
                                    ? "#1e1e1e"
                                    : "#f7f7f7",
                                  margin: 0,
                                },
                              }}
                              helperText={
                                efectivoChecked && mtnefectivoError
                                  ? "*Monto faltante"
                                  : null
                              }
                              disabled={!efectivoChecked}
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
                            />
                          </Grid>
                        </div>
                        <div style={{ marginBottom: "0.4rem" }}>
                          <Grid item xs={9} sm={9} md={9} lg={9}>
                            <TextField
                              className="noarrows"
                              size="small"
                              fullWidth
                              type="number"
                              id="mntChequePropio"
                              variant="outlined"
                              placeholder="00.00"
                              value={mntChequePropio}
                              onChange={(e) => {
                                setMntChequePropio(e.target.value);
                                if (mntChequePropioError) {
                                  setMntChequePropioError(false);
                                }
                              }}
                              error={
                                chequePropioChecked && mntChequePropioError
                              }
                              FormHelperTextProps={{
                                style: {
                                  backgroundColor: isDarkMode
                                    ? "#1e1e1e"
                                    : "#f7f7f7",
                                  margin: 0,
                                },
                              }}
                              helperText={
                                chequePropioChecked && mntChequePropioError
                                  ? "*Monto faltante"
                                  : null
                              }
                              disabled={!chequePropioChecked}
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
                            />
                          </Grid>
                        </div>
                        <div style={{ marginBottom: "0.4rem" }}>
                          <Grid item xs={9} sm={9} md={9} lg={9}>
                            <TextField
                              className="noarrows"
                              size="small"
                              fullWidth
                              type="text"
                              id="mntChequeAjeno"
                              variant="outlined"
                              placeholder="00.00"
                              value={mntChequeAjeno}
                              onChange={(e) => {
                                setMntChequeAjeno(e.target.value);
                                if (mntChequeAjenoError) {
                                  setMntChequeAjenoError(false);
                                }
                              }}
                              error={chequeAjenoChecked && mntChequeAjenoError}
                              FormHelperTextProps={{
                                style: {
                                  backgroundColor: isDarkMode
                                    ? "#1e1e1e"
                                    : "#f7f7f7",
                                  margin: 0,
                                },
                              }}
                              helperText={
                                chequeAjenoChecked && mntChequeAjenoError
                                  ? "*Monto faltante"
                                  : null
                              }
                              disabled={!chequeAjenoChecked}
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
                            />
                          </Grid>
                        </div>
                        <Grid item xs={9} sm={9} md={9} lg={9}>
                          <TextField
                            className="noarrows"
                            size="small"
                            fullWidth
                            type="text"
                            id="mntChequeExtranjero"
                            variant="outlined"
                            placeholder="00.00"
                            value={mntChequeExtranjero}
                            onChange={(e) => {
                              setMntChequeExtranjero(e.target.value);
                              if (mntChequeExtranjeroError) {
                                setMntChequeExtranjeroError(false);
                              }
                            }}
                            error={
                              chequeExtranjeroChecked &&
                              mntChequeExtranjeroError
                            }
                            FormHelperTextProps={{
                              style: {
                                backgroundColor: isDarkMode
                                  ? "#1e1e1e"
                                  : "#f7f7f7",
                                margin: 0,
                              },
                            }}
                            helperText={
                              chequeExtranjeroChecked &&
                              mntChequeExtranjeroError
                                ? "*Monto faltante"
                                : null
                            }
                            disabled={!chequeExtranjeroChecked}
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
                            type="text"
                            value={nombreBeneficiario}
                            onChange={(e) => {
                              setNombreBeneficiario(e.target.value);
                              if (nombreBeneficiarioError) {
                                setNombreBeneficiarioError(false);
                              }
                            }}
                            error={nombreBeneficiarioError}
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
                              nombreBeneficiarioError
                                ? "Ingrese el nombre del beneficiario"
                                : null
                            }
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
                            className="noarrows"
                            fullWidth
                            size="small"
                            label="Referencia de la factura"
                            variant="outlined"
                            type="number"
                            value={numeroFactRefe}
                            onChange={(e) => {
                              setNumeroFactRefe(e.target.value);
                              if (numeroFactRefeError) {
                                setNumeroFactRefeError(false);
                              }
                            }}
                            error={numeroFactRefeError}
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
                              numeroFactRefeError
                                ? "*Ingrese el número de la factura o referencia"
                                : null
                            }
                            InputProps={{
                              inputProps: {
                                min: 0, // Esto evita números negativos
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
                              value={nombreClienteD}
                              onChange={(e) => {
                                setNombreClienteD(e.target.value);
                                if (nombreClienteDError) {
                                  setNombreClienteDError(false);
                                }
                              }}
                              error={nombreClienteDError}
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
                                nombreClienteDError
                                  ? "*Se requiere el nombre del cliente"
                                  : null
                              }
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
                              className="noarrows"
                              fullWidth
                              size="small"
                              label="NIT del cliente"
                              variant="outlined"
                              type="number"
                              value={nitClienteD}
                              onChange={(e) => {
                                setNitClienteD(e.target.value);
                                if (nitClienteDError) {
                                  setNitClienteDError(false);
                                }
                              }}
                              error={nitClienteDError}
                              FormHelperTextProps={{
                                style: {
                                  backgroundColor: isDarkMode
                                    ? "#1e1e1e"
                                    : "#f7f7f7",
                                  margin: 0,
                                },
                              }}
                              helperText={
                                nitClienteDError
                                  ? "*Se requiere el NIT del cliente"
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
                              className="noarrows"
                              fullWidth
                              size="small"
                              label="Número de la factura"
                              variant="outlined"
                              type="number"
                              value={numeroFacturaD}
                              onChange={(e) => {
                                setNumeroFacturaD(e.target.value);
                                if (numeroFacturaDError) {
                                  setNumeroFacturaDError(false);
                                }
                              }}
                              error={numeroFacturaDError}
                              FormHelperTextProps={{
                                style: {
                                  backgroundColor: isDarkMode
                                    ? "#1e1e1e"
                                    : "#f7f7f7",
                                  margin: 0,
                                },
                              }}
                              helperText={
                                numeroFacturaDError
                                  ? "*Se requiere el número de la factura"
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
                            value={fechaFacturaD}
                            onChange={(e) => {
                              setFechaFacturaD(e.target.value);
                              if (fechaFacturaDError) {
                                setFechaFacturaDError(false);
                              }
                            }}
                            error={fechaFacturaDError}
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
                              fechaFacturaDError
                                ? `*Escoja la fecha de la factura`
                                : null
                            }
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
                            value={motivoD}
                            onChange={(e) => {
                              setMotivoD(e.target.value);
                              if (motivoDError) {
                                setMotivoDError(false);
                              }
                            }}
                            error={motivoDError}
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
                              motivoDError
                                ? `*Se requiere el ${motivoLabel.toLowerCase()} `
                                : null
                            }
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
                            label={"Intrucciones de pago"}
                            variant="outlined"
                            minRows={2}
                            maxRows={6}
                            value={instucD}
                            onChange={(e) => {
                              setInstucD(e.target.value);
                              if (instucDError) {
                                setInstucDError(false);
                              }
                            }}
                            error={instucDError}
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
                              instucDError
                                ? "*Se requiere las instrucciones de pago "
                                : null
                            }
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
                            label={isBoletaDeposito ? "Monto Total" : "Monto"}
                            size="small"
                            type="number"
                            placeholder="00.00"
                            value={isBoletaDeposito ? total.toFixed(2) : monto}
                            onChange={(e) => {
                              if (isBoletaDeposito) {
                                const nuevoTotal =
                                  parseFloat(
                                    e.target.value.replace(/[^0-9.]/g, "")
                                  ) || 0;
                                setTotal(nuevoTotal);
                              } else {
                                setMonto(e.target.value);
                                if (montoError) {
                                  setMontoError(false);
                                }
                              }
                            }}
                            disabled={isBoletaDeposito}
                            error={isBoletaDeposito ? false : montoError}
                            FormHelperTextProps={{
                              style: {
                                backgroundColor: isDarkMode
                                  ? "#1e1e1e"
                                  : "#f7f7f7",
                                margin: 0,
                              },
                            }}
                            helperText={
                              isBoletaDeposito
                                ? null
                                : montoError
                                ? `*Se requiere el monto del ${transaction.toLowerCase()}`
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
                        /*value={descripcion} Error de la descripción pero esta es opcional
                        onChange={(e) => {
                          setDescripcion(e.target.value);
                          if (descripcionError) {
                            setDescripcionError(false);
                          }
                        }}
                        error={descripcionError}
                        FormHelperTextProps={{
                          style: {
                            backgroundColor: isDarkMode
                              ? "#1e1e1e"
                              : "#f7f7f7",
                            margin: 0,
                          },
                        }}
                        helperText={
                          descripcionError
                            ? `*Se requiere el monto del ${transaction.toLowerCase()}`
                            : null
                        }*/
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
