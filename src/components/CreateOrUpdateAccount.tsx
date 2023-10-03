import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import { MenuItem, Select, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import bam from '../assets/bam.jpg';

const CreateOrUpdateAccount = ({theme}: any) => {
    const { type } = useParams();
    const isLargeScreen = useMediaQuery('(min-width: 1200px)');
  const isDarkMode: boolean = theme.palette.mode === "dark";
    
    const initialAccountInfo = type === 'update' ? {
        accountNumber: '123456789',
        accountName: 'Cuenta Monetaria BAM',
        accountType: 'Monetaria',
        currency: 'Quetzales',
        image: bam,
        representative: 'Juan Pérez',
        phoneNumber: '12345678',
        email: 'ejuarezh5@miumg.edu.gt'
    } : {
        accountNumber: '',
        accountName: '',
        accountType: '',
        currency: '',
        image: '',
        representative: '',
        phoneNumber: '',
        email: ''
    };

    const [accountNumber, setAccountNumber] = useState(initialAccountInfo?.accountNumber || '');
    const [accountName, setAccountName] = useState(initialAccountInfo?.accountName || '');
    const [accountType, setAccountType] = useState(initialAccountInfo?.accountType || '');
    const [currency, setCurrency] = useState(initialAccountInfo?.currency || '');
    const [selectedImage, setSelectedImage] = useState(initialAccountInfo?.image || '');

    const [representative, setRepresentative] = useState(initialAccountInfo?.representative || '');
    const [phoneNumber, setPhoneNumber] = useState(initialAccountInfo?.phoneNumber || '');
    const [email, setEmail] = useState(initialAccountInfo?.email || '');

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    setSelectedImage(e.target.result as string);
                }
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    return (
        <Container maxWidth="lg">
            <Card variant="outlined" style={{ marginBottom: '16px',  backgroundColor: isDarkMode ? '#1a1a1a' : ''  }}>
                <CardContent>
                    <Typography variant="h6" color="textPrimary" textAlign="start" gutterBottom>
                        Información de la Cuenta
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div style={{ display: isLargeScreen?'flex': 'grid', gap: '8px', alignItems: 'center' }}>
                                <TextField
                                    fullWidth
                                    label="No. de Cuenta"
                                    variant="outlined"
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label="Nombre de Cuenta"
                                    variant="outlined"
                                    value={accountName}
                                    onChange={(e) => setAccountName(e.target.value)}
                                />
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Tipo de Cuenta</InputLabel>
                                    <Select
                                        value={accountType}
                                        onChange={(e) => setAccountType(e.target.value)}
                                        label="Tipo de Cuenta"
                                    >
                                        <MenuItem value="Monetaria">Monetaria</MenuItem>
                                        <MenuItem value="Ahorro">Ahorro</MenuItem>
                                        <MenuItem value="Planilla">Planilla</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Moneda</InputLabel>
                                    <Select
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                        label="Moneda"
                                    >
                                        <MenuItem value="Quetzales">Quetzales</MenuItem>
                                        <MenuItem value="Dólares">Dólares</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{ textAlign: 'center', marginTop: '16px' }}>
                                <InputLabel>Elige la imagen de la cuenta</InputLabel>
                                <Input
                                    type="file"
                                    onChange={handleImageChange}
                                />
                            </div>
                            {selectedImage && (
                                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                                    <img src={selectedImage} alt="Imagen de la cuenta" style={{ maxWidth: '100px' }} />
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card variant="outlined" sx={{ backgroundColor: isDarkMode ? '#1a1a1a' : '' }}>
                <CardContent>
                    <Typography variant="h6" color="textPrimary" textAlign="start" gutterBottom>
                        Información de Contacto
                    </Typography>
                    <div style={{ display: isLargeScreen?'flex': 'grid', gap: '8px', alignItems: 'center' }}>
                        <TextField
                            fullWidth
                            label="Representante Legal"
                            variant="outlined"
                            value={representative}
                            onChange={(e) => setRepresentative(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Teléfono"
                            variant="outlined"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Correo"
                            variant="outlined"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px', marginBottom:'2rem' }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={type === 'update' ? <CreateIcon /> : <AddCircleIcon />}
                >
                    {type === 'update' ? 'Actualizar Cuenta' : 'Crear Cuenta'}
                </Button>
            </div>
        </Container>
    );
};

export default CreateOrUpdateAccount;
