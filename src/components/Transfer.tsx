import { Container, Typography, Card, Grid, TextField, TextareaAutosize, Button, MenuItem, InputAdornment } from '@mui/material';

const Transfer = () => {
    return (
        <Container maxWidth="lg">
            <Typography variant="h4" color="textPrimary" textAlign={"start"} sx={{ marginBottom: '2rem' }} gutterBottom>
                Transferencia de Cuenta
            </Typography>
            <Grid container justifyContent="center">
                <Grid item xs={12}>
                    <Card >
                        <div style={{ margin: '20px' }}>
                            <form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <label htmlFor="origen"><strong>Número de la cuenta origen</strong></label>
                                        <TextField
                                            fullWidth
                                            select
                                            name="origen"
                                            variant="outlined"
                                            autoFocus
                                        >
                                            <MenuItem value="undefined">Seleccionar número de cuenta...</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} style={{ marginTop: '13px' }}>
                                        <label htmlFor="destino"><strong>Número de la cuenta destino</strong></label>
                                        <TextField
                                            fullWidth
                                            select
                                            name="destino"
                                            variant="outlined"
                                        >
                                            <MenuItem value="undefined">Seleccionar número de cuenta...</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid container spacing={2} mt={3}>
                                        <Grid item xs={12} sm={6}>
                                            <label htmlFor="fecha"><strong>Fecha</strong></label>
                                            <TextField
                                                fullWidth
                                                type="date"
                                                name="fecha"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <label htmlFor="monto"><strong>Monto</strong></label>
                                            <TextField
                                                fullWidth
                                                type="text"
                                                placeholder="100.00"
                                                variant="outlined"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">Q</InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} mt={4}>
                                        <label htmlFor="descripcion"><strong>Descripción</strong></label>
                                        <TextareaAutosize
                                            name="descripcion"
                                            placeholder="Añadir descripción o comentario..."
                                            minRows={3}
                                            style={{ width: '100%', resize: 'vertical' }}
                                        />
                                    </Grid>
                                </Grid>
                                <div style={{ textAlign: 'center', marginTop: '12px' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        id="ingreso-agromercantil"
                                        onClick={() => {
                                            // Aquí puedes agregar la lógica para mostrar la notificación
                                            // similar a la que tenías en el código original.
                                        }}
                                    >
                                        Transferir
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

export default Transfer;
