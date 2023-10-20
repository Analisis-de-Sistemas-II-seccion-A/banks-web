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
} from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import dataservice, { subscribeToSelectedBank } from "../services/Bank.service";
import { Bank } from "../interfaces/Bank.interface";
import { useEffect, useState } from "react";

const Transfer = ({ theme }: any) => {
  const isDarkMode: boolean = theme.palette.mode === "dark";
  const isLargeScreen = useMediaQuery("(min-width: 600px)");
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

  const [numeroCuentaOrigen, setNumeroCuentaOrigen] = useState("");
  const [numeroCuentaDestino, setNumeroCuentaDestino] = useState("");
  const [fecha, setFecha] = useState("");
  const [monto, setMonto] = useState("");
  //* Errores y validaciones
  const [NCOrigenError, setNCOrigenError] = useState(false);
  const [NCDestinoError, setNCDestinoError] = useState(false);
  const [fechaError, setFechaError] = useState(false);
  const [montoError, setMontoError] = useState(false);

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
    // Validar los campos aquí antes de enviar los datos
    let hasError = false;
    if (!numeroCuentaOrigen) {
      setNCOrigenError(true);
      hasError = true;
    } else {
      setNCOrigenError(false);
    }
    if (!numeroCuentaDestino) {
      setNCDestinoError(true);
      hasError = true;
    } else {
      setNCDestinoError(false);
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
    if (hasError) {
      // Hay errores, no se puede enviar el formulario
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
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl size="small" style={{ width: "100%" }}>
                        <InputLabel id="cuenta-select-label">
                          Número de cuenta Origen
                        </InputLabel>
                        <Tooltip
                          placement="top-start"
                          title="Seleccione el número de la cuenta de origen"
                        >
                          <Select
                            fullWidth
                            size="small"
                            label="Número de cuenta Origen"
                            value={numeroCuentaOrigen}
                            onChange={(e) => {
                              setNumeroCuentaOrigen(e.target.value);
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
                            <MenuItem value={1}>Cuenta 1</MenuItem>
                            <MenuItem value={2}>Cuenta 2</MenuItem>
                            <MenuItem value={3}>Cuenta 3</MenuItem>
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
                      item
                      xs={12}
                      style={{ marginTop: "13px", marginBottom: "1rem" }}
                    >
                      <FormControl size="small" style={{ width: "100%" }}>
                        <InputLabel id="cuenta-select-label">
                          Número de cuenta Destino
                        </InputLabel>
                        <Tooltip
                          placement="top-start"
                          title="Seleccione el número de la cuenta de destino"
                        >
                          <Select
                            className="textfield"
                            fullWidth
                            size="small"
                            label="Número de cuenta Destino"
                            value={numeroCuentaDestino}
                            onChange={(e) => {
                              setNumeroCuentaDestino(e.target.value);
                              if (NCDestinoError) {
                                setNCDestinoError(false);
                              }
                            }}
                            error={NCDestinoError}
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
                    <Grid item xs={6} sm={5.2} md={4.2} lg={4.2}>
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
                    <Grid
                      item
                      xs={5}
                      sm={4}
                      md={4}
                      lg={4}
                      marginLeft={isLargeScreen ? "2.5rem" : ""}
                    >
                      <FormControl size="small" style={{ width: "100%" }}>
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
                              setMonto(e.target.value);
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
                  <div style={{ textAlign: "center", marginTop: "2rem" }}>
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
