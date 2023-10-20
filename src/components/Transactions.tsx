import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container, useMediaQuery } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useEffect, useState } from "react";
import { Bank } from "../interfaces/Bank.interface";
import dataService, { subscribeToSelectedBank } from "../services/Bank.service";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import bi from "../assets/bi.jpg";
import banrural from "../assets/banrural.png";
import bam from "../assets/bam.jpg";
import BankService from "../services/Bank.service";
import TransactionService from "../services/Transaction.service";
import { TransactionHistory } from "../interfaces/TransactionHistory.interface";
import { Account } from "../interfaces/Account.interface";
import CatalogService from "../services/Catalog.service";
import { Currency } from "../interfaces/Currency.interface";

const Transactions = ({ theme }: any) => {
  const navigate = useNavigate();
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const isDarkMode: boolean = theme.palette.mode === "dark";
  const isLargeScreen = useMediaQuery("(min-width: 1200px)");
  const [transactions, setTransactions] = useState<TransactionHistory[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const handleRedirect = (route: string) => {
    navigate(`/${route}`);
  };

  const formatCurrency = (ammount: number, currency: number) => {
    const actualCurrency: Currency | null = currencies.find((moned) => moned.MND_MONEDA === currency) || null;
    return new Intl.NumberFormat(actualCurrency?.MND_ABREVIATURA === "GTQ" ? "es-GT" : "en-US", {
      style: "currency",
      currency: actualCurrency?.MND_ABREVIATURA || "GTQ",
    }).format(ammount);
  };

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
      BankService.getAccounts(selectedBank?.BNC_BANCO || 0).then(async (accounttins) => {
        setAccounts(accounttins);
        await CatalogService.getCurrencies().then((currencies) => {
          setCurrencies(currencies);
        });

        let accountList: number[] = [];
        accounttins.forEach((account) => {
          accountList.push(account.CNT_CUENTA);
        });
        if (accountList.length > 0) {
          TransactionService.getLastestTransations(accountList).then((transactions) => {
            setTransactions(transactions);
          });
        }
      });
    }
  }, [selectedBank]); 

  const obtenerImagen = (nombreImagen: string) => {
    if (nombreImagen === 'bi') return bi;
    if (nombreImagen === 'banrural') return banrural;
    if (nombreImagen === 'bam') return bam;
  }

  const columns:  GridColDef[] = [
    {
      field: "fecha",
      headerName: "Fecha",
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "monto",
      headerName: "Monto",
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "descripcion",
      headerName: "Descripción",
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
      width: 358,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "account",
      headerName: "Cuenta",
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
      width: 300,
      headerAlign: "center",
      align: "center",
    },
  ];
  
  const rows = transactions.map((transaction) => {
    return {
      id: transaction.dbid,
      fecha: transaction.fecha,
      monto: formatCurrency(transaction.monto_transaccion, accounts.find((account) => account.CNT_CUENTA === transaction.cuenta)?.MND_MONEDA || 0),
      descripcion: transaction.descripcion,
      account: accounts.find((account) => account.CNT_CUENTA === transaction.cuenta)?.CNT_NOMBRE,
    };
  });

  if (!selectedBank) {
    return (
      <div style={{ marginBottom: "25rem", marginTop: "0.05rem" }}>
        Seleccione un banco.
      </div>
    );
  }
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align={"left"} color="textPrimary" gutterBottom>
        Transacciones {selectedBank.BNC_NOMBRE}
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "2rem",
          marginBottom: "2rem",
          //display: isLargeScreen ? "flex" : "grid",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} sm={9} md={7} lg={6.5}>
          <Card>
            <CardHeader
              title="Realizar Transacción"
              className="card-header"
              sx={{ backgroundColor: isDarkMode ? "#333333" : "" }}
            />
            <CardContent>
              <div style={{ marginRight: "2rem", marginLeft: "2rem" }}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  style={{ marginBottom: "1rem" }}
                  onClick={() => handleRedirect("transaction/income")}
                  startIcon={<ArrowForwardIcon fontSize="large" />}
                >
                  Ingresos
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  style={{ marginBottom: "1rem" }}
                  onClick={() => handleRedirect("transaction/expense")}
                  startIcon={<ArrowBackIcon fontSize="large" />}
                >
                  Egresos
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={() => handleRedirect("transfer")}
                  startIcon={<CompareArrowsIcon fontSize="large" />}
                >
                  Transferencias
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={9} md={4} lg={3}>
          <Card>
            <CardHeader
              title="Banco Seleccionado"
              className="card-header"
              sx={{ backgroundColor: isDarkMode ? "#333333" : "" }}
            />
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar
                alt="Bank Logo"
                src={obtenerImagen(selectedBank.BNC_IMAGEN)}
                sx={{ height: "164px", width: "164px" }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8} md={8.5} lg={9} sx={{ marginTop: "2rem" }}>
          <Typography
            variant="h6"
            align={isLargeScreen ? "left" : "center"}
            color="textPrimary"
            sx={{ marginBottom: "1rem" }}
          >
            Ultimas transacciones
          </Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            sx={{
              backgroundColor: isDarkMode ? "#1a1a1a" : "",
              color: isDarkMode ? "#959595" : "black"
            }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            pagination
            /* components={{
              Pagination: (props) => (
                <TablePagination
                  labelRowsPerPage="Número de filas"
                  rowsPerPageOptions={[5, 10]}
                />
              ),
            }}*/
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Transactions;
