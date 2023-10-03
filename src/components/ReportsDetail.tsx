import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Container, useMediaQuery, RadioGroup, Radio, FormControlLabel, Button } from '@mui/material';

function ReportsDetail() {
    const isLargeScreen = useMediaQuery('(min-width: 600px)');
    const [formatoDocumento, setFormatoDocumento] = useState('csv');

    const handleFormatoDocumentoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormatoDocumento((event.target as HTMLInputElement).value);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align={isLargeScreen ? 'left' : 'center'} color="textPrimary" gutterBottom>
                Reporte de Ingresos
            </Typography>
            <Card style={{ marginTop: '2rem' }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Selecciona los parámetros del reporte
                    </Typography>
                    <div style={{ display: isLargeScreen ? 'flex' : 'grid', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', marginTop: '2rem' }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="bancos-label">Bancos</InputLabel>
                            <Select
                                labelId="bancos-label"
                                id="bancos-select"
                                label="Bancos"
                            >
                                <MenuItem value={1}>Banco 1</MenuItem>
                                <MenuItem value={2}>Banco 2</MenuItem>
                                <MenuItem value={3}>Banco 3</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="cuentas-label">Cuentas</InputLabel>
                            <Select
                                labelId="cuentas-label"
                                id="cuentas-select"
                                label="Cuentas"
                            >
                                <MenuItem value={1}>Cuenta 1</MenuItem>
                                <MenuItem value={2}>Cuenta 2</MenuItem>
                                <MenuItem value={3}>Cuenta 3</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="categorias-label">Categorías</InputLabel>
                            <Select
                                labelId="categorias-label"
                                id="categorias-select"
                                label="Categorías"
                            >
                                <MenuItem value={1}>Categoría 1</MenuItem>
                                <MenuItem value={2}>Categoría 2</MenuItem>
                                <MenuItem value={3}>Categoría 3</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{ display: isLargeScreen ? 'flex' : 'grid', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                        <TextField
                            id="fecha-inicio"
                            label="Fecha de Inicio"
                            type="date"
                            sx={{ m: 1, minWidth: 120 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="fecha-fin"
                            label="Fecha de Fin"
                            type="date"
                            sx={{ m: 1, minWidth: 120 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    {/* Tercer div con radio buttons */}
                    <div style={{ display: isLargeScreen ? 'flex' : 'grid', alignItems: 'center', justifyContent: 'center' }}>
                        <FormControl component="fieldset">
                            <Typography variant="body1" component="div" sx={{ marginBottom: '0.5rem' }}>Selecciona el formato del documento</Typography>
                            <RadioGroup
                                aria-label="formato-documento"
                                name="formato-documento"
                                value={formatoDocumento}
                                onChange={handleFormatoDocumentoChange}
                                row
                            >
                                <FormControlLabel value="csv" control={<Radio />} label="CSV" />
                                <FormControlLabel value="xlsx" control={<Radio />} label="XLSX" />
                                <FormControlLabel value="pdf" control={<Radio />} label="PDF" />
                                <FormControlLabel value="txt" control={<Radio />} label="TXT" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem' }}>
                        <Button variant="contained" color="primary">
                            Generar Reporte
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Container>
    );
}

export default ReportsDetail;