import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Box,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import Avatar from "@mui/material/Avatar";
import estadoCuenta from "../assets/estadoCuenta.png";
import estadoCuentaDark from "../assets/estadoCuenta B.png";
import transferencia from "../assets/transferencia.png";
import transferenciaDark from "../assets/transferencia B.png";
import ingresos from "../assets/ingresos.png";
import ingresosDark from "../assets/ingresos B.png";
import egresos from "../assets/egresos.png";
import egresosDark from "../assets/egresos B.png";
import conciliacion from "../assets/conciliacion.png";
import conciliacionDark from "../assets/conciliacion B.png";

function ReportGeneration({ theme }: any) {
  const isLargeScreen = useMediaQuery("(min-width: 1200px)");
  const isDarkMode: boolean = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const handleRedirect = (route: string) => {
    navigate(`/banks-web/${route}`);
  };

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Box mt={7} />
      <Typography
        variant="h4"
        align={isLargeScreen ? "left" : "center"}
        color="textPrimary"
        gutterBottom
      >
        Reportería
      </Typography>
      <Box mb={7} />
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {/* Estadísticas */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            variant="outlined"
            sx={{ backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7" }}
          >
            <CardContent>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  Estado de Cuenta
                </Typography>
                <Avatar
                  alt="Estado de Cuenta"
                  src={isDarkMode ? estadoCuentaDark : estadoCuenta}
                  sx={{ height: "80px", width: "80px" }}
                  variant="square"
                  style={{ margin: "1vw" }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleRedirect("reports/detail")}
                >
                  Generar Reporte
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            variant="outlined"
            sx={{ backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7" }}
          >
            <CardContent>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  Transferencias
                </Typography>
                <Avatar
                  alt="Transferencia"
                  src={isDarkMode ? transferenciaDark : transferencia}
                  sx={{ height: "80px", width: "80px" }}
                  variant="square"
                  style={{ margin: "1vw" }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleRedirect("reports/detail")}
                >
                  Generar Reporte
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Transferencias */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            variant="outlined"
            sx={{ backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7" }}
          >
            <CardContent>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  Ingresos
                </Typography>
                <Avatar
                  alt="Transferencia"
                  src={isDarkMode ? ingresosDark : ingresos}
                  sx={{ height: "80px", width: "80px" }}
                  variant="square"
                  style={{ margin: "1vw" }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleRedirect("reports/detail")}
                >
                  Generar Reporte
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Egresos */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            variant="outlined"
            sx={{ backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7" }}
          >
            <CardContent>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  Egresos
                </Typography>
                <Avatar
                  alt="Transferencia"
                  src={isDarkMode ? egresosDark : egresos}
                  sx={{ height: "80px", width: "80px" }}
                  variant="square"
                  style={{ margin: "1vw" }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleRedirect("reports/detail")}
                >
                  Generar Reporte
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Conciliaciones */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            variant="outlined"
            sx={{ backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7" }}
          >
            <CardContent>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  Conciliaciones
                </Typography>
                <Avatar
                  alt="Transferencia"
                  src={isDarkMode ? conciliacionDark : conciliacion}
                  sx={{ height: "80px", width: "80px" }}
                  variant="square"
                  style={{ margin: "1vw" }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleRedirect("reports/detail")}
                >
                  Generar Reporte
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box mb={7} />
    </Container>
  );
}

export default ReportGeneration;
