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
import { Link, useNavigate } from "react-router-dom";

function ReportGeneration({theme}: any) {
    const isLargeScreen = useMediaQuery('(min-width: 1200px)');
    const isDarkMode: boolean = theme.palette.mode === "dark";
    const navigate = useNavigate();
    const handleRedirect = (route: string) => {
        navigate(`/banks-web/${route}`);
      };

    return (
        <Container maxWidth="lg">
            <CssBaseline />
            <Box mt={7} />
            <Typography variant="h4" align={isLargeScreen ? 'left' : 'center'} color="textPrimary" gutterBottom>
                Reportería
            </Typography>
            <Box mb={7} />
                    <Grid container spacing={2}>
                        {/* Estadísticas */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Card variant="outlined" sx={{backgroundColor: isDarkMode ? '#1a1a1a' : '#ebebeb'}}>
                                <CardContent>
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                        sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                                    >
                                        Estado de Cuenta
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={() => handleRedirect("reports/detail")}
                                    >
                                        Generar Reporte
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card variant="outlined" sx={{backgroundColor: isDarkMode ? '#1a1a1a' : '#ebebeb'}}>
                                <CardContent>
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                        sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                                    >
                                        Transferencias
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        to="/detalle-reporte/reporte-cuentas"
                                        fullWidth
                                    >
                                        Generar Reporte
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Transferencias */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Card variant="outlined" sx={{backgroundColor: isDarkMode ? '#1a1a1a' : '#ebebeb'}}>
                                <CardContent>
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                        sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                                    >
                                        Ingresos
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        to="/detalle-reporte/reporte-transferencias"
                                        fullWidth
                                    >
                                        Generar Reporte
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Egresos */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Card variant="outlined" sx={{backgroundColor: isDarkMode ? '#1a1a1a' : '#ebebeb'}}>
                                <CardContent>
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                        sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                                    >
                                        Egresos
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        to="/detalle-reporte/reporte-egresos"
                                        fullWidth
                                    >
                                        Generar Reporte
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Conciliaciones */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Card variant="outlined" sx={{backgroundColor: isDarkMode ? '#1a1a1a' : '#ebebeb'}}>
                                <CardContent>
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                        sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                                    >
                                        Conciliaciones
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component={Link}
                                        to="/detalle-reporte/reporte-conciliaciones"
                                        fullWidth
                                    >
                                        Generar Reporte
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
            <Box mb={7} />
        </Container>
    );
}

export default ReportGeneration;