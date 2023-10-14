import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Avatar, Container, useMediaQuery, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dataService from '../services/Data.Service';
import { Bank } from '../interfaces/Bank.interface';
import { useNavigate } from 'react-router-dom';
import { ArrowForwardIosOutlined } from '@mui/icons-material';

function BankReconciliation({ theme }: any) {
    const navigate = useNavigate();
    const isDarkMode: boolean = theme.palette.mode === "dark";
    const isLargeScreen = useMediaQuery('(min-width: 1200px)');
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
    const [values, setValues] = useState({
        pagos1: 0,
        cobros1: 0,
        pagos2: 0,
        cobros2: 0,
        resultado: 0,
        resultado2: 0,
    });

    const [validation, setValidation] = useState({
        pagos1: { error: false, helperText: '' },
        cobros1: { error: false, helperText: '' },
        pagos2: { error: false, helperText: '' },
        cobros2: { error: false, helperText: '' },
    });

    const [isValid, setIsValid] = useState(false);

    const columns: GridColDef[] = [
        { field: 'fecha', headerName: 'Fecha', width: 150, align: 'center', headerAlign: 'center', headerClassName: isDarkMode ? 'dark-column-header' : 'column-header' },
        { field: 'pagosRealizados1', headerName: 'Pagos Realizados', width: 180, type: 'number', align: 'center', headerAlign: 'center', headerClassName: isDarkMode ? 'dark-column-header' : 'column-header' },
        { field: 'cobrosRealizados1', headerName: 'Cobros Realizados', width: 180, type: 'number', align: 'center', headerAlign: 'center', headerClassName: isDarkMode ? 'dark-column-header' : 'column-header' },
        { field: 'pagosRealizados2', headerName: 'Pagos Realizados', width: 180, type: 'number', align: 'center', headerAlign: 'center', headerClassName: isDarkMode ? 'dark-column-header' : 'column-header' },
        { field: 'cobrosRealizados2', headerName: 'Cobros Realizados', width: 180, type: 'number', align: 'center', headerAlign: 'center', headerClassName: isDarkMode ? 'dark-column-header' : 'column-header' },
        { field: 'diferencia', headerName: 'Diferencia', width: 180, type: 'number', align: 'center', headerAlign: 'center', headerClassName: isDarkMode ? 'dark-column-header' : 'column-header' },
    ];

    const rows = [
        { id: 1, fecha: '15/04/23', pagosRealizados1: 23549, cobrosRealizados1: 45894.59, pagosRealizados2: 25325.50, cobrosRealizados2: 45894.59, diferencia: 1776.50 },
        { id: 2, fecha: '31/04/23', pagosRealizados1: 78435.90, cobrosRealizados1: 43900.00, pagosRealizados2: 78435.90, cobrosRealizados2: 43900.00, diferencia: 0.00 },
    ];

    const handleRedirect = (route: string) => {
        if (isValid) {
            navigate(`/banks-web/${route}`);
        }
    };

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: parseFloat(value) || 0 });
    };

    const calcularResultado = () => {
        const pagos1 = values.pagos1 || 0;
        const cobros1 = values.cobros1 || 0;
        const pagos2 = values.pagos2 || 0;
        const cobros2 = values.cobros2 || 0;

        const pagos1Valid = pagos1 !== 0;
        const cobros1Valid = cobros1 !== 0;
        const pagos2Valid = pagos2 !== 0;
        const cobros2Valid = cobros2 !== 0;

        setValidation({
            pagos1: { error: !pagos1Valid, helperText: pagos1Valid ? '' : 'Ingrese un valor' },
            cobros1: { error: !cobros1Valid, helperText: cobros1Valid ? '' : 'Ingrese un valor' },
            pagos2: { error: !pagos2Valid, helperText: pagos2Valid ? '' : 'Ingrese un valor' },
            cobros2: { error: !cobros2Valid, helperText: cobros2Valid ? '' : 'Ingrese un valor' },
        });

        const allFieldsValid = pagos1Valid && cobros1Valid && pagos2Valid && cobros2Valid;

        if (allFieldsValid) {
            const resultadoCalculado = (pagos1 - cobros1) - (pagos2 - cobros2);
            setValues({ ...values, resultado: resultadoCalculado, resultado2: resultadoCalculado });
        } else {
            setValues({ ...values, resultado: 0, resultado2: 0 });
        }

        setIsValid(allFieldsValid);
    };

    useEffect(() => {
        setSelectedBank(dataService.selectedBank);
        const unsubscribe = dataService.subscribeToSelectedBank((newSelectedBank) => {
            setSelectedBank(newSelectedBank);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    if (!selectedBank) {
        return <div style={{ marginBottom: '25rem' }}>Seleccione un Banco para realizar una conciliación.</div>;
    }

    return (
        <Container maxWidth="lg">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                <Avatar alt="User Avatar" src={selectedBank.image} style={{ marginRight: '2rem' }} />
                <Typography variant="h4" align={'left'} color="textPrimary" gutterBottom>
                    Conciliación Bancaria {selectedBank.name}
                </Typography>
            </div>
            <Card>
                <CardContent>
                    <Grid container spacing={2} sx={{ display: isLargeScreen ? '2rem' : 'grid', alignItems: 'center', justifyContent: 'center' }}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" gutterBottom>
                                Según Extracto Bancario
                            </Typography>
                            <Grid container spacing={2} sx={{ display: isLargeScreen ? '2rem' : 'grid', alignItems: 'center', justifyContent: 'center' }}>
                                <Grid item xs={12} sm={6}>
                                    <Tooltip title="Ingrese los Débitos a su cuenta indicados en el estado de cuenta">
                                        <TextField
                                            name="pagos1"
                                            label="Pagos Realizados"
                                            type="number"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            size="small"
                                            value={values.pagos1}
                                            onChange={handleChange}
                                            onBlur={calcularResultado}
                                            error={validation.pagos1.error}
                                            helperText={validation.pagos1.helperText}
                                        />
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Tooltip title="Ingrese los Créditos a su cuenta indicados en el estado de cuenta">
                                        <TextField
                                            name="cobros1"
                                            label="Cobros Realizados"
                                            type="number"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            size="small"
                                            value={values.cobros1}
                                            onChange={handleChange}
                                            onBlur={calcularResultado}
                                            error={validation.cobros1.error}
                                            helperText={validation.cobros1.helperText}
                                        />
                                    </Tooltip>
                                </Grid>
                            </Grid>
                            <Card variant="outlined" style={{ width: '100%', height: '50%' }}>
                                <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px' }}>
                                    <Typography variant="body2">
                                        Resultado:
                                    </Typography>
                                    <Typography variant="body2">
                                        {values.resultado}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" gutterBottom>
                                Según Auxiliar
                            </Typography>
                            <Grid container spacing={2} sx={{ display: isLargeScreen ? '2rem' : 'grid', alignItems: 'center', justifyContent: 'center' }}>
                                <Grid item xs={12} sm={6}>
                                    <Tooltip title="Ingrese los Débitos registrados en sistema">
                                        <TextField
                                            name="pagos2"
                                            label="Pagos Realizados"
                                            type="number"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            size="small"
                                            value={values.pagos2}
                                            onChange={handleChange}
                                            onBlur={calcularResultado}
                                            error={validation.pagos2.error}
                                            helperText={validation.pagos2.helperText}
                                        />
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Tooltip title="Ingrese los Créditos registrados en sistema">
                                        <TextField
                                            name="cobros2"
                                            label="Cobros Realizados"
                                            type="number"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            size="small"
                                            value={values.cobros2}
                                            onChange={handleChange}
                                            onBlur={calcularResultado}
                                            error={validation.cobros2.error}
                                            helperText={validation.cobros2.helperText}
                                        />
                                    </Tooltip>
                                </Grid>
                            </Grid>
                            <Card variant="outlined" style={{ width: '100%', height: '50%', marginBottom: '2rem' }}>
                                <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px' }}>
                                    <Typography variant="body2">
                                        Resultado:
                                    </Typography>
                                    <Typography variant="body2">
                                        {values.resultado2}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Button
                                variant="contained"
                                size="medium"
                                endIcon={<ArrowForwardIosOutlined />}
                                onClick={() => handleRedirect('reconciliation/detail')}
                                disabled={!isValid} // Deshabilitar el botón si no son válidos
                            >
                                Detalle de Conciliación
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <div style={{ height: '100%', marginTop: '20px', marginBottom: '2rem' }}>
                <Typography variant="h6" align={'left'} color="textPrimary" gutterBottom>
                    Últimas Conciliaciones
                </Typography>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    sx={{ backgroundColor: isDarkMode ? '#1a1a1a' : '' }}
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
