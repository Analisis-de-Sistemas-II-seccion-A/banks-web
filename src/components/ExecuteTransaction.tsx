import { Container, Typography, Card, Grid, TextField, TextareaAutosize, MenuItem, InputAdornment, Button } from '@mui/material';
import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { useParams } from 'react-router-dom';

const ExecuteTransaction = () => {
    const { type } = useParams();
    const [tipoDocumento, setTipoDocumento] = useState('');
    const [mostrarCard2, setMostrarCard2] = useState(false);
    const [mostrarCard3, setMostrarCard3] = useState(false);
    const [mostrarCard4, setMostrarCard4] = useState(false);
    const [mostrarCard5, setMostrarCard5] = useState(false);
    const [efectivoChecked, setEfectivoChecked] = useState(false);
    const [chequePropioChecked, setChequePropioChecked] = useState(false);
    const [chequeAjenoChecked, setChequeAjenoChecked] = useState(false);
    const [chequeExtranjeroChecked, setChequeExtranjeroChecked] = useState(false);

    const tipoDocumentoOptions = type === 'income'
        ? [
            { value: '1', label: 'Nota de crédito' },
            { value: '2', label: 'Boleta de depósito' },
        ]
        : [
            { value: '3', label: 'Nota de débito' },
            { value: '4', label: 'Cheque' },
        ];

    const handleTipoDocumentoChange = (event: any) => {
        const selectedTipoDocumento = event.target.value;
        setTipoDocumento(selectedTipoDocumento);
        setMostrarCard2(selectedTipoDocumento === '1');
        setMostrarCard3(selectedTipoDocumento === '2');
        setMostrarCard4(selectedTipoDocumento === '4');
        setMostrarCard5(selectedTipoDocumento === '3');
    };

    const titleText = type === 'income' ? 'Ingreso a Cuenta' : 'Egreso de Cuenta';
    const tipoDocumentoLabel = type === 'income' ? 'Tipo de documento de ingreso' : 'Tipo de documento de egreso';
    const motivoLabel = type === 'income' ? 'Motivo de la nota de crédito' : 'Motivo del egreso';
    const origenIngresoLabel = type === 'income' ? 'Origen del Ingreso' : 'Origen del Egreso';

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" color="textPrimary" textAlign={"start"} gutterBottom>
                {titleText}
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                    <Card>
                        <div style={{ margin: '20px' }}>
                            <form>
                                <div>
                                    <label htmlFor="origen"><strong>Número de cuenta</strong></label>
                                    <TextField
                                        fullWidth
                                        select
                                        name="origen"
                                        variant="outlined"
                                        required
                                        autoFocus
                                    >
                                        <MenuItem value="undefined">Seleccionar número de cuenta...</MenuItem>
                                    </TextField>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ flex: 1, marginRight: '1rem' }}>
                                        <label htmlFor="TipoDocumento"><strong>{tipoDocumentoLabel}</strong></label>
                                        <TextField
                                            fullWidth
                                            select
                                            name="TipoDocumento"
                                            variant="outlined"
                                            value={tipoDocumento}
                                            onChange={handleTipoDocumentoChange}
                                        >
                                            <MenuItem value="undefined">Seleccionar tipo de documento...</MenuItem>
                                            {tipoDocumentoOptions.map(option => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label htmlFor="numeroDocumento"><strong>Número de documento</strong></label>
                                        <TextField
                                            fullWidth
                                            type="text"
                                            variant="outlined"
                                            placeholder="Ingresar número de documento"
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ flex: 1, marginRight: '1rem' }}>
                                        <label htmlFor="estadoDocumento"><strong>Estado del documento</strong></label>
                                        <TextField
                                            fullWidth
                                            type="text"
                                            variant="outlined"
                                            placeholder="Ingresar el estado del documento"
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label htmlFor="origenIngreso"><strong>{origenIngresoLabel}</strong></label>
                                        <TextField
                                            fullWidth
                                            select
                                            name="origenIngreso"
                                            variant="outlined"
                                        >
                                            <MenuItem value="undefined">Seleccionar {origenIngresoLabel.toLowerCase()}...</MenuItem>
                                            <MenuItem value="">Ventas</MenuItem>
                                            <MenuItem value="">Intereses sobre cuentas</MenuItem>
                                        </TextField>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Card>

                    {mostrarCard2 && (
                        <Card style={{ marginTop: '16px' }}>
                            <div style={{ margin: '20px' }}>
                                <form>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ flex: 1, marginRight: '1rem' }}>
                                            <label htmlFor="nombreCliente"><strong>Nombre del cliente</strong></label>
                                            <TextField
                                                fullWidth
                                                type="text"
                                                variant="outlined"
                                                placeholder="Ingresar el nombre del cliente"
                                            />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <label htmlFor="nitCliente"><strong>NIT del cliente</strong></label>
                                            <TextField
                                                fullWidth
                                                type="text"
                                                variant="outlined"
                                                placeholder="Ingresar NIT del cliente"
                                            />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ flex: 1, marginRight: '1rem' }}>
                                            <label htmlFor="numeroFactura"><strong>Número de la factura</strong></label>
                                            <TextField
                                                fullWidth
                                                type="text"
                                                variant="outlined"
                                                placeholder="Ingresar el número de la factura"
                                            />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <label htmlFor="fechaFactura"><strong>Fecha de la factura</strong></label>
                                            <TextField
                                                fullWidth
                                                type="date"
                                                name="Fecha"
                                                variant="outlined"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="motivoNotaCredito"><strong>{motivoLabel}</strong></label>
                                        <TextareaAutosize
                                            minRows={3}
                                            maxRows={6}
                                            placeholder={`Ingresar ${motivoLabel.toLowerCase()}...`}
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                </form>
                            </div>
                        </Card>
                    )}

                    {mostrarCard3 && (
                        <Card style={{ marginTop: '16px' }}>
                            <div style={{ margin: '20px' }}>
                                <form>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ flex: 1, marginRight: '1rem' }}>
                                            <label htmlFor="formaPago"><strong>Forma de Pago</strong></label>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    id="formCheck-1"
                                                    onChange={() => setEfectivoChecked(!efectivoChecked)}
                                                />
                                                <label htmlFor="formCheck-1">Efectivo</label>
                                            </div>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    id="formCheck-2"
                                                    onChange={() => setChequePropioChecked(!chequePropioChecked)}
                                                />
                                                <label htmlFor="formCheck-2">Cheque Propio</label>
                                            </div>
                                            {type === 'expense' && (
                                                <>
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            id="formCheck-3"
                                                            onChange={() => setChequeAjenoChecked(!chequeAjenoChecked)}
                                                        />
                                                        <label htmlFor="formCheck-3">Cheque Ajeno</label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            id="formCheck-4"
                                                            onChange={() => setChequeExtranjeroChecked(!chequeExtranjeroChecked)}
                                                        />
                                                        <label htmlFor="formCheck-4">Cheque Extranjero</label>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <label htmlFor="monto"><strong>Monto</strong></label>
                                            <TextField
                                                fullWidth
                                                type="text"
                                                id="mtnefectivo"
                                                variant="outlined"
                                                placeholder="100.00"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">Q</InputAdornment>,
                                                }}
                                                disabled={!efectivoChecked}
                                            />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <label htmlFor="monto"><strong>Monto Cheque Propio</strong></label>
                                            <TextField
                                                fullWidth
                                                type="text"
                                                id="mntChequePropio"
                                                variant="outlined"
                                                placeholder="100.00"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">Q</InputAdornment>,
                                                }}
                                                disabled={!chequePropioChecked}
                                            />
                                        </div>
                                        {type === 'expense' && (
                                            <>
                                                <div style={{ flex: 1 }}>
                                                    <label htmlFor="monto"><strong>Monto Cheque Ajeno</strong></label>
                                                    <TextField
                                                        fullWidth
                                                        type="text"
                                                        id="mntChequeAjeno"
                                                        variant="outlined"
                                                        placeholder="100.00"
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">Q</InputAdornment>,
                                                        }}
                                                        disabled={!chequeAjenoChecked}
                                                    />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <label htmlFor="monto"><strong>Monto Cheque Extranjero</strong></label>
                                                    <TextField
                                                        fullWidth
                                                        type="text"
                                                        id="mntChequeExtranjero"
                                                        variant="outlined"
                                                        placeholder="100.00"
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">Q</InputAdornment>,
                                                        }}
                                                        disabled={!chequeExtranjeroChecked}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div style={{ marginTop: '16px' }}>
                                        <label htmlFor="montoTotal"><strong>Monto Total</strong></label>
                                        <TextField
                                            fullWidth
                                            type="text"
                                            id="mtnTotal"
                                            variant="outlined"
                                            placeholder="100.00"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">Q</InputAdornment>,
                                            }}
                                        />
                                    </div>
                                </form>
                            </div>
                        </Card>
                    )}

                    {mostrarCard4 && (
                        <Card style={{ marginTop: '16px' }}>
                            <div style={{ margin: '20px' }}>
                                <form>

                                    <fieldset id="optCheque">
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div style={{ flex: 1, marginRight: '1rem' }}>
                                                <label htmlFor="nombreBeneficiario"><strong>Nombre del beneficiario del cheque</strong></label>
                                                <TextField
                                                    fullWidth
                                                    type="text"
                                                    variant="outlined"
                                                    placeholder="Ingresar el nombre del beneficiario del cheque"
                                                />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <label htmlFor="referenciaFactura"><strong>Referencia o número de factura (opcional)</strong></label>
                                                <TextField
                                                    fullWidth
                                                    type="text"
                                                    variant="outlined"
                                                    placeholder="Ingresar referencia o número de factura"
                                                />
                                            </div>
                                        </div>
                                    </fieldset>

                                </form>
                            </div>
                        </Card>
                    )}

                    {mostrarCard5 && (
                        <Card style={{ marginTop: '16px' }}>
                            <div style={{ margin: '20px' }}>
                                <form>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ flex: 1, marginRight: '1rem' }}>
                                            <label htmlFor="nombreClienteNotaDebito"><strong>Nombre del cliente</strong></label>
                                            <TextField
                                                fullWidth
                                                type="text"
                                                variant="outlined"
                                                placeholder="Ingresar el nombre del cliente"
                                            />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <label htmlFor="nitCliente"><strong>NIT del cliente</strong></label>
                                            <TextField
                                                fullWidth
                                                type="text"
                                                variant="outlined"
                                                placeholder="Ingresar NIT del cliente"
                                            />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ flex: 1, marginRight: '1rem' }}>
                                            <label htmlFor="numeroFacturaNotaDebito"><strong>Número de la factura</strong></label>
                                            <TextField
                                                fullWidth
                                                type="text"
                                                variant="outlined"
                                                placeholder="Ingresar el número de la factura"
                                            />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <label htmlFor="fechaFacturaNotaDebito"><strong>Fecha de la factura</strong></label>
                                            <TextField
                                                fullWidth
                                                type="date"
                                                name="Fecha"
                                                variant="outlined"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="motivoNotaDebito"><strong>Motivo de la nota de débito</strong></label>
                                        <TextareaAutosize
                                            minRows={3}
                                            maxRows={6}
                                            placeholder="Ingresar motivo de la nota de débito..."
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="instruccionesPago"><strong>Instrucciones de pago</strong></label>
                                        <TextareaAutosize
                                            minRows={3}
                                            maxRows={6}
                                            placeholder="Añadir instrucciones de pago..."
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                </form>
                            </div>
                        </Card>
                    )}

                    <Card style={{ marginTop: '16px' }}>
                        <div style={{ margin: '20px' }}>
                            <form>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ flex: 1, marginRight: '1rem' }}>
                                        <label htmlFor="descripcion"><strong>Descripción</strong></label>
                                        <TextareaAutosize
                                            minRows={3}
                                            maxRows={6}
                                            placeholder="Ingresar descripción..."
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label htmlFor="fecha"><strong>Fecha</strong></label>
                                        <TextField
                                            fullWidth
                                            type="date"
                                            name="Fecha"
                                            variant="outlined"
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label htmlFor="monto"><strong>Monto</strong></label>
                                        <TextField
                                            fullWidth
                                            type="text"
                                            id="mtnefectivo"
                                            variant="outlined"
                                            placeholder="100.00"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">Q</InputAdornment>,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div style={{ marginTop: '16px' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
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
