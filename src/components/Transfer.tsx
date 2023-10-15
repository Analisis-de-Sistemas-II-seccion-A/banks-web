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
  Button,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const Transfer = ({ theme }: any) => {
  const isDarkMode: boolean = theme.palette.mode === "dark";
  return (
    <Container maxWidth="md">
      <Typography
        variant="h4"
        color="textPrimary"
        textAlign={"start"}
        sx={{ marginBottom: "2rem" }}
        gutterBottom
      >
        Transferencia de Cuenta
      </Typography>

      <Grid item xs={12}>
        <Card sx={{ backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7" }}>
          <div style={{ margin: "20px" }}>
            <form>
              <Grid container spacing={1} justifyContent="center">
                <Grid item xs={12}>
                  <Typography variant="subtitle1" textAlign={"start"}>
                    <strong>Número de la cuenta origen</strong>
                  </Typography>
                  <FormControl size="small" style={{ width: "100%" }}>
                    <InputLabel
                      id="cuenta-select-label"
                      style={{ color: "#a3a3a3" }}
                    >
                      Seleccione el número de cuenta...
                    </InputLabel>
                    <Select
                      style={{
                        backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                        borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                      }}
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
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "13px", marginBottom: "1rem" }}
                >
                  <Typography variant="subtitle1" textAlign={"start"}>
                    <strong>Número de la cuenta destino</strong>
                  </Typography>

                  <FormControl size="small" style={{ width: "100%" }}>
                    <InputLabel
                      id="cuenta-select-label"
                      style={{ color: "#a3a3a3" }}
                    >
                      Seleccione el número de cuenta...
                    </InputLabel>
                    <Select
                      style={{
                        backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                        borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                      }}
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
                </Grid>
                <Grid
                  item
                  xs={5}
                  sm={3.5}
                  md={2.8}
                  lg={2.8}
                  style={{ marginRight: "2rem" }}
                >
                  <Typography variant="subtitle1" textAlign={"start"}>
                    <strong>Fecha</strong>
                  </Typography>
                  <TextField
                    className="textfield"
                    size="small"
                    fullWidth
                    type="date"
                    name="Fecha"
                    variant="outlined"
                    style={{
                      backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                      borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                    }}
                  />
                </Grid>
                <Grid item xs={4} sm={2.8} md={2.3} lg={2.3}>
                  <Typography variant="subtitle1" textAlign={"start"}>
                    <strong>Monto</strong>
                  </Typography>
                  <TextField
                    style={{
                      backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                      borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                    }}
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
              <Grid textAlign={"center"} style={{ marginTop: "2rem" }}>
                <Typography variant="subtitle1">
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
              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  id="ingreso-agromercantil"
                  onClick={() => {
                    // Aquí puedes agregar la lógica para mostrar la notificación
                    // similar a la que tenías en el código original.
                  }}
                  startIcon={<AutorenewIcon />}
                >
                  Transferir
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </Grid>
    </Container>
  );
};

export default Transfer;
