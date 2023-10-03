
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Avatar, Container, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import SubjectIcon from '@mui/icons-material/Subject';
import { DataGrid } from '@mui/x-data-grid';
import dataService from '../services/Data.Service';
import { Bank } from '../interfaces/Bank.interface';
import { useNavigate } from 'react-router-dom';

const columns = [
    { field: 'fecha', headerName: 'Fecha', width: 150 },
    { field: 'pagosRealizados1', headerName: 'Pagos Realizados', width: 180, type: 'number' },
    { field: 'cobrosRealizados1', headerName: 'Cobros Realizados', width: 180, type: 'number' },
    { field: 'pagosRealizados2', headerName: 'Pagos Realizados', width: 180, type: 'number' },
    { field: 'cobrosRealizados2', headerName: 'Cobros Realizados', width: 180, type: 'number' },
    { field: 'diferencia', headerName: 'Diferencia', width: 180, type: 'number' },
];

const rows = [
    { id: 1, fecha: '15/04/23', pagosRealizados1: 23549, cobrosRealizados1: 45894.59, pagosRealizados2: 25325.50, cobrosRealizados2: 45894.59, diferencia: 1776.50 },
    { id: 2, fecha: '31/04/23', pagosRealizados1: 78435.90, cobrosRealizados1: 43900.00, pagosRealizados2: 78435.90, cobrosRealizados2: 43900.00, diferencia: 0.00 },
];


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
    });

    const handleRedirect = (route: string) => {
        navigate(`/banks-web/${route}`);
      };

    const calcularResultado = () => {
        const resultadoCalculado = (values.pagos1 - values.cobros1) - (values.pagos2 - values.cobros2);
        setValues({ ...values, resultado: resultadoCalculado });
    };

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: parseFloat(value) || 0 });
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
                        <Grid item xs={isLargeScreen ? 6 : 12}>
                            <Typography variant="h6" gutterBottom>
                                Según Extracto Bancario
                            </Typography>
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
                            />
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
                            />
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
                        <Grid item xs={isLargeScreen ? 6 : 12}>
                            <Typography variant="h6" gutterBottom>
                                Según Auxiliar
                            </Typography>
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
                            />
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
                            />
                            <Button
                                variant="contained"
                                size="medium"
                                startIcon={<SubjectIcon />}
                                onClick={() => handleRedirect('reconciliation/detail')}
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
