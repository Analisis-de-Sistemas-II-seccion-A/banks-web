import {
  Container,
  Typography,
  Select,
  FormControl,
  InputLabel,
  Card,
  Grid,
  TextField,
  TextareaAutosize,
  MenuItem,
  InputAdornment,
  Button,
} from "@mui/material";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { useParams } from "react-router-dom";

const ExecuteTransaction = () => {
  const { type } = useParams();
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [mostrarCard2, setMostrarCard2] = useState(false);
  const [mostrarCard3, setMostrarCard3] = useState(false);
  const [mostrarCard4, setMostrarCard4] = useState(false);
  const [mostrarCard5, setMostrarCard5] = useState(false);
  const [efectivoChecked, setEfectivoChecked] = useState(false);
  const [chequePropioChecked, setChequePropioChecked] = useState(false);
  const [chequeAjenoChecked, setChequeAjenoChecked] = useState(false);
  const [chequeExtranjeroChecked, setChequeExtranjeroChecked] = useState(false);

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

  const titleText = type === "income" ? "Ingreso a Cuenta" : "Egreso de Cuenta";
  /*const tipoDocumentoLabel =
    type === "income"
      ? "Tipo de documento de ingreso"
      : "Tipo de documento de egreso";*/
  const motivoLabel =
    type === "income" ? "Motivo de la nota de crédito" : "Motivo del egreso";
  const origenIngresoLabel =
    type === "income" ? "Origen del Ingreso" : "Origen del Egreso";

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        color="textPrimary"
        textAlign={"start"}
        gutterBottom
      >
        {titleText}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: "#f0f0f0" }}>
            <div style={{ margin: "20px" }}>
              <form>
                <div style={{ marginBottom: "1rem" }}>
                  <Typography variant="subtitle1" textAlign={"start"}>
                    <strong>Número de cuenta</strong>
                  </Typography>
                  <FormControl size="small" style={{ width: "100%" }}>
                    <InputLabel
                      id="cuenta-select-label"
                      style={{ color: "#a3a3a3" }}
                    >
                      Seleccione el número de cuenta...
                    </InputLabel>
                    <Select
                      labelId="cuenta-select-label"
                      id="cuenta-select"
                      label="Seleccione el número de cuenta..."
                      size="small"
                      className="textfield"
                    >
                      <MenuItem value={1}>Cuenta 1</MenuItem>
                      <MenuItem value={2}>Cuenta 2</MenuItem>
                      <MenuItem value={3}>Cuenta 3</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div
                  style={{
                    marginBottom: "1rem",
                    textAlign: "left",
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4.5} md={3.5} lg={3.5}>
                      <Typography variant="subtitle1">
                        <strong>Tipo de documento</strong>
                      </Typography>
                      <TextField
                        className="textfield"
                        size="small"
                        fullWidth
                        select
                        name="TipoDocumento"
                        variant="outlined"
                        value={tipoDocumento}
                        onChange={handleTipoDocumentoChange}
                      >
                        <MenuItem value="undefined">
                          Seleccionar tipo de documento...
                        </MenuItem>
                        {tipoDocumentoOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={5} md={4} lg={3}>
                      <Typography variant="subtitle1">
                        <strong>Número de documento</strong>
                      </Typography>
                      <TextField
                        className="textfield"
                        size="small"
                        fullWidth
                        type="text"
                        variant="outlined"
                        placeholder="Ingresar número de documento"
                      />
                    </Grid>
                  </Grid>
                </div>
                <div
                  style={{
                    marginBottom: "2rem",
                    textAlign: "left",
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={5} md={3.2} lg={3.2}>
                      <Typography variant="subtitle1" textAlign={"start"}>
                        <strong>Estado del documento</strong>
                      </Typography>
                      <TextField
                        className="textfield"
                        size="small"
                        fullWidth
                        type="text"
                        variant="outlined"
                        placeholder="Ingresar el estado del documento"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={3.4}>
                      <Typography variant="subtitle1" textAlign={"start"}>
                        <strong>{origenIngresoLabel}</strong>
                      </Typography>
                      <FormControl size="small" style={{ width: "100%" }}>
                        <InputLabel
                          id="origen-select-label"
                          style={{ color: "#a3a3a3" }}
                        >
                          Seleccione el {origenIngresoLabel.toLowerCase()}...
                        </InputLabel>
                        <Select
                          labelId="origen-select-label"
                          id="origen-select"
                          label="Seleccione el número de origen..."
                          size="small"
                          className="textfield"
                        >
                          <MenuItem value={1}>Ventas</MenuItem>
                          <MenuItem value={2}>Compras</MenuItem>
                          <MenuItem value={3}>Intereses sobre cuentas</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </div>
              </form>
            </div>
          </Card>

          {mostrarCard2 && (
            <Card
              style={{ marginTop: "16px" }}
              sx={{ backgroundColor: "#f0f0f0" }}
            >
              <div style={{ margin: "20px" }}>
                <form>
                  <div
                    style={{
                      marginBottom: "1rem",
                      textAlign: "left",
                    }}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={5.5} md={4.5} lg={4}>
                        <label htmlFor="nombreCliente">
                          <strong>Nombre del cliente</strong>
                        </label>
                        <TextField
                          className="textfield"
                          size="small"
                          fullWidth
                          type="text"
                          variant="outlined"
                          placeholder="Ingresar el nombre del cliente"
                        />
                      </Grid>
                      <Grid item xs={6.5} sm={4} md={3} lg={2.5}>
                        <label htmlFor="nitCliente">
                          <strong>NIT del cliente</strong>
                        </label>
                        <TextField
                          className="textfield"
                          size="small"
                          fullWidth
                          type="text"
                          variant="outlined"
                          placeholder="Ingresar NIT del cliente"
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
                    <Grid container spacing={2}>
                      <Grid item xs={8} sm={4} md={3.4} lg={3.2}>
                        <label htmlFor="numeroFactura">
                          <strong>Número de la factura</strong>
                        </label>
                        <TextField
                          className="textfield"
                          size="small"
                          fullWidth
                          type="text"
                          variant="outlined"
                          placeholder="Ingresar el número de la factura"
                        />
                      </Grid>
                      <Grid item xs={5} sm={2.8} md={2.8} lg={2.2}>
                        <label htmlFor="fechaFactura">
                          <strong>Fecha de la factura</strong>
                        </label>
                        <TextField
                          className="textfield"
                          size="small"
                          fullWidth
                          type="date"
                          name="Fecha"
                          variant="outlined"
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
                      <Typography variant="subtitle1" textAlign={"start"}>
                        <strong>{motivoLabel}</strong>
                      </Typography>
                      <TextareaAutosize
                        className="textarea"
                        minRows={3}
                        maxRows={6}
                        placeholder={`Ingresar ${motivoLabel.toLowerCase()}...`}
                        style={{
                          padding: "12px",
                          borderRadius: "12px",
                          borderColor: "rgba(0, 0, 0, 0.23)",
                          fontFamily: "Roboto",
                          fontSize: "1rem",
                          resize: "none",
                        }}
                      />
                    </Grid>
                  </div>
                </form>
              </div>
            </Card>
          )}

          {mostrarCard3 && (
            <Card
              style={{ marginTop: "16px" }}
              sx={{ backgroundColor: "#f0f0f0" }}
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
                    <Grid item xs={6} sm={4} md={3} lg={2}>
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
                          onChange={() => setEfectivoChecked(!efectivoChecked)}
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
                            setChequeExtranjeroChecked(!chequeExtranjeroChecked)
                          }
                        />
                        <label htmlFor="formCheck-4">Cheque Extranjero</label>
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={3.8} md={3} lg={2.5}>
                      <Typography
                        variant="subtitle1"
                        style={{ marginBottom: "0.1rem" }}
                      >
                        <strong>Monto</strong>
                      </Typography>
                      <div style={{ marginBottom: "0.4rem" }}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                          <TextField
                            className="textfield"
                            size="small"
                            fullWidth
                            type="text"
                            id="mtnefectivo"
                            variant="outlined"
                            placeholder="100.00"
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
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                          <TextField
                            className="textfield"
                            size="small"
                            fullWidth
                            type="text"
                            id="mntChequePropio"
                            variant="outlined"
                            placeholder="100.00"
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
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                          <TextField
                            className="textfield"
                            size="small"
                            fullWidth
                            type="text"
                            id="mntChequeAjeno"
                            variant="outlined"
                            placeholder="100.00"
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
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <TextField
                          className="textfield"
                          size="small"
                          fullWidth
                          type="text"
                          id="mntChequeExtranjero"
                          variant="outlined"
                          placeholder="100.00"
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
              style={{ marginTop: "16px" }}
              sx={{ backgroundColor: "#f0f0f0" }}
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
                        <Grid item xs={12} sm={5} md={4} lg={3.5}>
                          <label htmlFor="nombreBeneficiario">
                            <strong>Nombre del beneficiario del cheque</strong>
                          </label>
                          <TextField
                            className="textfield"
                            size="small"
                            fullWidth
                            type="text"
                            variant="outlined"
                            placeholder="Ingresar el nombre del beneficiario "
                          />
                        </Grid>
                        <Grid item xs={12} sm={6.5} md={5.5} lg={5}>
                          <label htmlFor="referenciaFactura">
                            <strong>
                              Referencia o número de factura (opcional)
                            </strong>
                          </label>
                          <TextField
                            className="textfield"
                            size="small"
                            fullWidth
                            type="text"
                            variant="outlined"
                            placeholder="Ingresar referencia o número de factura"
                          />
                        </Grid>
                      </Grid>
                </form>
              </div>
            </Card>
          )}

          {mostrarCard5 && (
            <Card
              style={{ marginTop: "16px" }}
              sx={{ backgroundColor: "#f0f0f0" }}
            >
              <div style={{ margin: "20px" }}>
                <form>
                  <div
                    style={{
                      marginBottom: "1rem",
                      textAlign: "left",
                    }}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={5.5} md={4.5} lg={4}>
                        <label htmlFor="nombreCliente">
                          <strong>Nombre del cliente</strong>
                        </label>
                        <TextField
                          className="textfield"
                          size="small"
                          fullWidth
                          type="text"
                          variant="outlined"
                          placeholder="Ingresar el nombre del cliente"
                        />
                      </Grid>
                      <Grid item xs={6.5} sm={4} md={3} lg={2.5}>
                        <label htmlFor="nitCliente">
                          <strong>NIT del cliente</strong>
                        </label>
                        <TextField
                          className="textfield"
                          size="small"
                          fullWidth
                          type="text"
                          variant="outlined"
                          placeholder="Ingresar NIT del cliente"
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
                    <Grid container spacing={2}>
                      <Grid item xs={8} sm={4} md={3.4} lg={3.2}>
                        <label htmlFor="numeroFactura">
                          <strong>Número de la factura</strong>
                        </label>
                        <TextField
                          className="textfield"
                          size="small"
                          fullWidth
                          type="text"
                          variant="outlined"
                          placeholder="Ingresar el número de la factura"
                        />
                      </Grid>
                      <Grid item xs={5} sm={2.8} md={2.8} lg={2.2}>
                        <label htmlFor="fechaFactura">
                          <strong>Fecha de la factura</strong>
                        </label>
                        <TextField
                          className="textfield"
                          size="small"
                          fullWidth
                          type="date"
                          name="Fecha"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </div>

                  <div
                    style={{
                      marginBottom: "0.5rem",
                      textAlign: "left",
                    }}
                  >
                    <Grid>
                      <Typography variant="subtitle1" textAlign={"start"}>
                        <strong>Motivo de la nota de débito</strong>
                      </Typography>
                      <TextareaAutosize
                        className="textarea"
                        minRows={3}
                        maxRows={6}
                        placeholder={`Ingresar motivo de la nota de débito...`}
                        style={{
                          padding: "12px",
                          borderRadius: "12px",
                          borderColor: "rgba(0, 0, 0, 0.23)",
                          fontFamily: "Roboto",
                          fontSize: "1rem",
                          resize: "none",
                        }}
                      />
                    </Grid>
                  </div>
                  <div
                    style={{
                      marginBottom: "1rem",
                      textAlign: "left",
                    }}
                  >
                    <Grid>
                      <Typography variant="subtitle1" textAlign={"start"}>
                        <strong>Instrucciones de pago</strong>
                      </Typography>
                      <TextareaAutosize
                        className="textarea"
                        minRows={3}
                        maxRows={6}
                        placeholder={`Añadir instrucciones de pago...`}
                        style={{
                          padding: "12px",
                          borderRadius: "12px",
                          borderColor: "rgba(0, 0, 0, 0.23)",
                          fontFamily: "Roboto",
                          fontSize: "1rem",
                          resize: "none",
                        }}
                      />
                    </Grid>
                  </div>
                </form>
              </div>
            </Card>
          )}

          <Card
            style={{ marginTop: "16px" }}
            sx={{ backgroundColor: "#f0f0f0" }}
          >
            <div
              style={{
                margin: "20px",
                marginBottom: "2rem",
                textAlign: "left",
              }}
            >
              <form>
                <Grid container spacing={3} style={{ marginBottom: "1rem" }}>
                  <Grid item xs={5} sm={2.8} md={2.8} lg={2.2}>
                    <label htmlFor="fecha">
                      <strong>Fecha</strong>
                    </label>
                    <TextField
                      className="textfield"
                      size="small"
                      fullWidth
                      type="date"
                      name="Fecha"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4} sm={2.3} md={2} lg={1.7}>
                    <label htmlFor="monto">
                      <strong>Monto</strong>
                    </label>
                    <TextField
                      className="textfield"
                      size="small"
                      fullWidth
                      type="text"
                      id="mtnefectivo"
                      variant="outlined"
                      placeholder="100.00"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">Q</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid>
                  <Typography variant="subtitle1" textAlign={"start"}>
                    <strong>Descripción</strong>
                  </Typography>
                  <TextareaAutosize
                    className="textarea"
                    minRows={3}
                    maxRows={6}
                    placeholder="Añadir descripción o comentario..."
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                      borderColor: "rgba(0, 0, 0, 0.23)",
                      fontFamily: "Roboto",
                      fontSize: "1rem",
                      resize: "none",
                    }}
                  />
                </Grid>
                <div style={{ marginTop: "2rem", textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SaveIcon />}
                  >
                    Guardar
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExecuteTransaction;
