import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import {
  Alert,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItemIcon,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import bi from "../assets/bi.jpg";
import bam from "../assets/bam.jpg";
import banrural from "../assets/banrural.png";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import WalletIcon from "@mui/icons-material/Wallet";
import { Account } from "../interfaces/Account.interface";
import React, { useEffect } from "react";
import AccountService from "../services/Account.service";
import CatalogService from "../services/Catalog.service";
import { AccountType } from "../interfaces/AccountType.interface";
import { Currency } from "../interfaces/Currency.interface";
import BankService from "../services/Bank.service";
import { Bank } from "../interfaces/Bank.interface";
import { DateRange, DateRangePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { DateTime } from "luxon";
import TransactionService from "../services/Transaction.service";
import { TransactionHistory } from "../interfaces/TransactionHistory.interface";
import { Close } from "@mui/icons-material";

const styles = {
  button: {
    width: "100%",
    backgroundColor: "red",
    border: "1px solid red",
    "&:hover": {
      backgroundColor: "none",
      border: "1px solid red",
      color: "red",
    },
  },
};

const AccountDetail = ({ theme }: any) => {
  const isDarkMode: boolean = theme.palette.mode === "dark";
  const { account } = useParams();
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery("(min-width: 600px)");
  const [selectedAccount, setSelectedAccount] = React.useState<Account | null>(null);
  const [accountTypes, setAccountTypes] = React.useState<AccountType[]>([]);
  const [currencies, setCurrencies] = React.useState<Currency[]>([]);
  const [banks, setBanks] = React.useState<Bank[]>([]);
  const [value, setValue] = React.useState<DateRange<DateTime>>([null, null]);
  const [transactionHistory, setTransactionHistory] = React.useState<TransactionHistory[]>([]);
  const [showError, setShowError] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);

  const handleRedirect = (route: string) => {
    navigate(`/${route}`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateAccount = () => {
    handleRedirect("accounts/update");
    AccountService.selectAccount(selectedAccount as Account);
  }

  const formatCurrency = (ammount: number, currency: string) => {
    return new Intl.NumberFormat(currency === "GTQ" ? "es-GT" : "en-US", {
      style: "currency",
      currency: currency,
    }).format(ammount);
  };

  const obtenerImagen = (nombreImagen: string) => {
    if (nombreImagen === 'bi') return bi;
    if (nombreImagen === 'banrural') return banrural;
    if (nombreImagen === 'bam') return bam;
  }

  const handleDeleteAccount = async (account: number) => {
    await AccountService.deleteAccount(account).then((data) => {
      if(data.deleted) {
        setShowError(false);
        setOpen(false);
        handleRedirect("");
      } else {
        setOpen(false);
        setShowError(true);
      }
    });
  };

  useEffect(() => {
    if (account) {
      CatalogService.getAccountTypes().then((data) => {
        setAccountTypes(data);
      });

      CatalogService.getCurrencies().then((data) => {
        setCurrencies(data);
      });

      BankService.getBanks().then((data) => {
        setBanks(data);
      });

      AccountService.getAccountByid(parseInt(account)).then((data) => {
        if(!data) {
          handleRedirect("");
        }
        setSelectedAccount(data);
      });
    }
  }, []);


  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Fecha",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
    },
    {
      field: "document",
      headerName: "Documento",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
    },
    {
      field: "description",
      headerName: "Descripción",
      width: 350,
      headerAlign: "center",
      align: "center",
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
    },
    {
      field: "debit",
      headerName: "Débito",
      width: 160,
      headerAlign: "center",
      align: "center",
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
    },
    {
      field: "credit",
      headerName: "Crédito",
      width: 160,
      headerAlign: "center",
      align: "center",
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
    },
    {
      field: "balance",
      headerName: "Saldo",
      width: 180,
      headerAlign: "center",
      align: "center",
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
    },
  ];

  const rows = transactionHistory.map((transaction) => {
    return {
      id: transaction.dbid,
      date:  DateTime.fromFormat(transaction.fecha.toString(), "yyyy-MM-dd").toLocaleString(),
      document: transaction.documento,
      description: transaction.descripcion,
      debit: transaction.tipo_operacion === "RESTA"? formatCurrency(transaction.monto_transaccion, currencies.find((currency) => currency.MND_MONEDA === selectedAccount?.MND_MONEDA)?.MND_ABREVIATURA || "GTQ"):"",
      credit: transaction.tipo_operacion === "SUMA"? formatCurrency(transaction.monto_transaccion, currencies.find((currency) => currency.MND_MONEDA === selectedAccount?.MND_MONEDA)?.MND_ABREVIATURA || "GTQ"): "",
      balance: formatCurrency(transaction.nuevo_monto, currencies.find((currency) => currency.MND_MONEDA === selectedAccount?.MND_MONEDA)?.MND_ABREVIATURA || "GTQ"),
    };
  });


  if (!selectedAccount) {
    return (
      <div style={{ marginBottom: "25rem" }}>No se encontró la cuenta.</div>
    );
  }

  return (
    <Container
      maxWidth="lg"
      style={{ marginBottom: isLargeScreen ? "10rem" : "20rem" }}
    >
       <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          La Cuenta se eliminará
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Al hacer click en aceptar la cuenta se eliminará completamente,
             lo que significa que no podrá ver su información ni crear nuevas transacciones en la cuenta
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={()=> handleDeleteAccount(selectedAccount.CNT_CUENTA)} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Card>
        <CardContent
          style={{
            backgroundColor: "#3e5cb2",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} sx={{ display: "grid", alignItems: "center" }}>
              <Typography variant="h6" style={{ color: "white" }}>
                {selectedAccount.CNT_NOMBRE}
              </Typography>
              <Typography variant="body2" style={{ color: "white" }}>
                {banks.find((bank) => bank.BNC_BANCO === selectedAccount.BNC_BANCO)?.BNC_NOMBRE}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Avatar
                alt="Bank Logo"
                src={obtenerImagen(banks.find((bank) => bank.BNC_BANCO === selectedAccount.BNC_BANCO)?.BNC_IMAGEN || "")}
                sx={{ width: 50, height: 50, backgroundColor: "white" }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardContent style={{ display: "flex", alignItems: "center" }}>
          <Grid
            container
            spacing={2}
            style={{
              display: isLargeScreen ? "flex" : "grid",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid
              item
              xs={isLargeScreen ? 6 : 12}
              sx={{ display: "grid", alignItems: "center" }}
            >
              <Typography variant="h5" style={{ marginBottom: "1rem" }}>
                Cuenta No. {selectedAccount.CNT_NUMERO_CUENTA}
              </Typography>
              <Typography variant="body1">
                <span style={{ color: isDarkMode ? "#e6b061" : "#3e5cb2" }}>
                  Titular:{" "}
                </span>
                {selectedAccount.CNT_TITULAR}
              </Typography>
              <Typography variant="body1">
                <span style={{ color: isDarkMode ? "#e6b061" : "#3e5cb2" }}>
                  Tipo:{" "}
                </span>
                {accountTypes.find((type) => type.TCN_TIPO_CUENTA === selectedAccount.TCN_TIPO_CUENTA)?.TCN_NOMBRE}
              </Typography>
            </Grid>
            <Grid item xs={isLargeScreen ? 6 : 12}>
              <div style={{ display: "grid", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  style={{ marginBottom: "1rem", width: "100%" }}
                  startIcon={<EditIcon />}
                  size="large"
                  onClick={handleUpdateAccount}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  onClick={() => setOpen(true)}
                  size="large"
                  style={{ width: "100%" }}
                  sx={styles.button}
                >
                  Desactivar
                </Button>

                
              </div>
              
            </Grid>
            
          </Grid>
          
        </CardContent>
       { showError && (
        <div style={{alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
         <Alert severity="error"    action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShowError(false);
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }>Ocurrió un error al eliminar la cuenta</Alert>
        </div>)
          }
        <CardContent style={{ display: "flex", alignItems: "center" }}>
          <Grid
            container
            spacing={2}
            style={{
              display: isLargeScreen ? "flex" : "grid",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid
              item
              xs={isLargeScreen ? 6 : 12}
              sx={{ display: "grid", alignItems: "center" }}
            >
              <Typography variant="h6">Saldo en la Cuenta</Typography>
              <Typography variant="h4">{formatCurrency(selectedAccount.CNT_SALDO, currencies.find((currency) => currency.MND_MONEDA === selectedAccount.MND_MONEDA)?.MND_ABREVIATURA || "GTQ")}</Typography>
            </Grid>
            <Grid item xs={isLargeScreen ? 6 : 12}>
              <div style={{ display: "grid", justifyContent: "center" }}>
                <MenuItem>
                  <ListItemIcon>
                    <WalletIcon />
                  </ListItemIcon>
                  <Button
                    style={{ color: "gray" }}
                    onClick={() => handleRedirect("")}
                  >
                    Ir al listado de cuentas
                  </Button>
                </MenuItem>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <div
        style={{
          width: "100%",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <Card>
          <CardContent
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: isLargeScreen ? "end" : "center",
            }}
          >
            <div
              style={{
                display: isLargeScreen ? "flex" : "grid",
                justifyContent: isLargeScreen ? "end" : "center",
                marginTop: "1rem",
              }}
            >
                <LocalizationProvider dateAdapter={AdapterLuxon}>
              <DateRangePicker
                value={value}
                maxDate={DateTime.now()}
                onAccept={async (newValue) => { setValue(newValue)
                  await TransactionService.getTransactionHistoryByDate(selectedAccount?.CNT_CUENTA || 0,newValue[0]?.toISODate() || "", newValue[1]?.toISODate() || "").then((data) => {
                    setTransactionHistory(data)
                  })}}
              />
                </LocalizationProvider>
            </div>
          </CardContent>
        </Card>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
            sorting: {
              sortModel: [
                {
                  field: 'date',
                  sort: 'desc', 
                },
              ],
            }, 
          }}
          sx={{
            backgroundColor: isDarkMode ? "#1a1a1a" : "",
            color: isDarkMode ? "#959595" : "black",
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </Container>
  );
};

export default AccountDetail;
