import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Avatar, Button, Typography, useMediaQuery } from '@mui/material';
import dataService from '../services/Data.Service';
import { Bank } from '../interfaces/Bank.interface';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function AccountList({ theme }: any) {
    const navigate = useNavigate();
    const isLargeScreen = useMediaQuery('(min-width: 1200px)');
    const isDarkMode: boolean = theme.palette.mode === "dark";
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
    const handleRedirect = (route: string) => {
        navigate(`/banks-web/${route}`);
      };
    const columns: GridColDef[] = [
        { field: 'accountNumber', headerName: 'Numero de cuenta', width: 200 },
        { field: 'accountType', headerName: 'Tipo de cuenta', width: 200 },
        { field: 'accountUsage', headerName: 'Uso de la cuenta', width: 250 },
        { field: 'accountHolder', headerName: 'Titular de la cuenta', width: 250 },
        {
            field: 'details',
            headerName: '',
            width: 150,
            renderCell: () => (
                <a onClick={()=> handleRedirect("accounts/1/detail")}>Ver detalles</a>
            ),
        },
    ];
    
    const rows = [
        {
            id: 1,
            accountNumber: '123456789',
            accountType: 'Cuenta Corriente',
            accountUsage: 'Pago a Proveedores',
            accountHolder: 'Ferretería Estrellita',
        },
        {
            id: 2,
            accountNumber: '987654321',
            accountType: 'Cuenta de Ahorro',
            accountUsage: 'Reserva de Emergencia',
            accountHolder: 'Ferretería Estrellita',
        },
        {
            id: 3,
            accountNumber: '555000111',
            accountType: 'Cuenta de Ahorro',
            accountUsage: 'Fondos de Expansión',
            accountHolder: 'Ferretería Estrellita',
        },
        {
            id: 4,
            accountNumber: '222333444',
            accountType: 'Cuenta Corriente',
            accountUsage: 'Pago de Nómina',
            accountHolder: 'Ferretería Estrellita',
        },
        {
            id: 5,
            accountNumber: '888777666',
            accountType: 'Cuenta de Nómina',
            accountUsage: 'Pago de Salario',
            accountHolder: 'Ferretería Estrellita',
        },
    ];

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
        return <div style={{marginBottom:'25rem'}}>Seleccione un banco.</div>;
    }

    return (
        <div style={{ width: '80%', margin: '0 auto', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar alt="User Avatar" src={selectedBank.image} style={{ marginRight: '2rem' }} />
                <Typography variant="h4" align={'left'} color="textPrimary" gutterBottom>
                    Cuentas {selectedBank.name}
                </Typography>
            </div>
            <div style={{ textAlign: isLargeScreen ? 'end' : 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleRedirect("accounts/create")}
                >
                    Crear Cuenta
                </Button>
            </div>
            <div style={{ height: '100%', marginTop: '20px' }}>
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
        </div>
    );
}
