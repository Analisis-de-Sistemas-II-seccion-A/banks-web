import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import dataService, { subscribeToSelectedBank } from "../services/Bank.service";
import { Bank } from "../interfaces/Bank.interface";
import { Account } from "../interfaces/Account.interface";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { green } from "@mui/material/colors";
import bi from "../assets/bi.jpg";
import banrural from "../assets/banrural.png";
import bam from "../assets/bam.jpg";
import CatalogService from "../services/Catalog.service";
import { Currency } from "../interfaces/Currency.interface";
import { AccountType } from "../interfaces/AccountType.interface";

export default function AccountList({ theme }: any) {
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery("(min-width: 1200px");
  const isDarkMode: boolean = theme.palette.mode === "dark";
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);

  const handleRedirect = (route: string) => {
    navigate(`/${route}`);
  };

  const obtenerImagen = (nombreImagen: string) => {
    if (nombreImagen === 'bi') return bi;
    if (nombreImagen === 'banrural') return banrural;
    if (nombreImagen === 'bam') return bam;
  }

  useEffect(() => {
    setSelectedBank(dataService.selectedBank);
    const unsubscribe = subscribeToSelectedBank(
      (newSelectedBank) => {
        setSelectedBank(newSelectedBank);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []); 

  useEffect(() => {
    if (selectedBank) {
      CatalogService.getCurrencies().then((data) => {
        setCurrencies(data);
      });

      CatalogService.getAccountTypes().then((data) => {
        setAccountTypes(data);
      });

      dataService.getAccounts(selectedBank.BNC_BANCO).then((data) => {
        if(data) {
          setAccounts(data);
          
        }
      });
    }
  }, [selectedBank]); 

  const rows = accounts.map((account) => ({
    id: account.CNT_CUENTA,
    CNT_NUMERO_CUENTA: account.CNT_NUMERO_CUENTA,
    TCN_TIPO_CUENTA: accountTypes.find((type) => type.TCN_TIPO_CUENTA === account.TCN_TIPO_CUENTA)?.TCN_NOMBRE,
    CNT_NOMBRE: account.CNT_NOMBRE,
    CNT_TITULAR: account.CNT_TITULAR,
    MND_MONEDA: currencies.find((currency) => currency.MND_MONEDA === account.MND_MONEDA)?.MND_ABREVIATURA,
  }));

  const columns: GridColDef[] = [
    {
      field: "CNT_NUMERO_CUENTA",
      headerName: "Numero de cuenta",
      headerAlign: "center",
      align: "center",
      width: 150,
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
    },
    {
      field: "CNT_NOMBRE",
      headerName: "Nombre de cuenta",
      headerAlign: "center",
      align: "center",
      width: 300,
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
    },
    {
      field: "TCN_TIPO_CUENTA",
      headerName: "Tipo de cuenta",
      headerAlign: "center",
      align: "center",
      width: 200,
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
    },
    {
      field: "CNT_TITULAR",
      headerName: "Titular de la cuenta",
      headerAlign: "center",
      align: "center",
      width: 200,
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
    },
    {
      field: "MND_MONEDA",
      headerName: "Moneda",
      headerAlign: "center",
      align: "center",
      width: 100,
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
    },
    {
      field: "details",
      headerName: "Ver Detalle",
      align: "center",
      headerAlign: "center",
      width: 128,
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
      renderCell: (params) => (
        <IconButton
          onClick={() => handleRedirect(`accounts/${params.row.id}/detail`)}
          size="small"
          style={{ color: green[500] }}
        >
          <ArrowForwardIcon />
        </IconButton>
      ),
    },
  ];
  
  if (!selectedBank) {
    return <div style={{ marginBottom: "25rem" }}>Seleccione un banco.</div>;
  }

  return (
    <div
      style={{
        width: "80%",
        margin: "0 auto",
        padding: "20px",
        maxWidth: "70rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          alt="User Avatar"
          src={obtenerImagen(selectedBank.BNC_IMAGEN)}
          style={{ marginRight: "2rem" }}
        />
        <Typography variant="h4" align={"left"} color="textPrimary" gutterBottom>
          Cuentas {selectedBank ? selectedBank.BNC_NOMBRE : ""}
        </Typography>
      </div>
      <div style={{ textAlign: isLargeScreen ? "end" : "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleRedirect("accounts/create")}
          startIcon={<AddIcon />}
        >
          Nueva Cuenta
        </Button>
      </div>
      <div style={{ height: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{
            backgroundColor: isDarkMode ? "#1a1a1a" : "",
            color: isDarkMode ? "#959595" : "black",
          }}
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
