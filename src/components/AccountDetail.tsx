import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import {
  Button,
  Container,
  IconButton,
  ListItemIcon,
  MenuItem,
  TextField,
  useMediaQuery,
} from "@mui/material";
import bi from "../assets/bi.jpg";
import bam from "../assets/bam.jpg";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import WalletIcon from "@mui/icons-material/Wallet";
import SearchIcon from "@mui/icons-material/Search";

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
  const accounts = [
    {
      id: 1,
      name: "Cuenta Monetaria BAM",
      number: "000-12667-3",
      accountType: "Cuenta Monetaria en Quetzales",
      principal: "Elmer Alessandro Juárez Hernández",
      ammount: 215000,
      paymentType: "Pago de Impuestos",
      currency: "GTQ",
      bank: { id: 1, image: bam, name: "Banco Agromercantil" },
    },
    {
      id: 2,
      name: "Cuenta Monetaria BI",
      number: "000-3222-3",
      accountType: "Cuenta Monetaria en Dólares",
      principal: "Elmer Alessandro Juárez Hernández",
      ammount: 150000,
      paymentType: "Pago de Servicios",
      currency: "USD",
      bank: { id: 2, image: bi, name: "Banco Industrial" },
    },
  ];

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

  const rows = [
    {
      id: 1,
      date: "20/08/2023",
      document: "522665",
      description: "Pago de ISR Trimestral",
      debit: "Q15,000.00",
      credit: "",
      balance: "Q.215,000.00",
    },
    {
      id: 2,
      date: "16/08/2023",
      document: "565855",
      description: "Transferencia desde CTA 456445",
      debit: "",
      credit: "Q10,000.00",
      balance: "Q.230,000.00",
    },
    {
      id: 3,
      date: "14/08/2023",
      document: "458565",
      description: "Pago de Servicio Telefónico",
      debit: "Q5,000.00",
      credit: "",
      balance: "Q.220,000.00",
    },
    {
      id: 4,
      date: "10/08/2023",
      document: "822655",
      description: "Pago de Préstamos",
      debit: "Q.10,000.00",
      credit: "",
      balance: "Q.225,000.00",
    },
    {
      id: 5,
      date: "07/08/2023",
      document: "866555",
      description: "Depósito Bancario, boleta NO.866555",
      debit: "",
      credit: "Q.235,000.00",
      balance: "Q.235,000.00",
    },
  ];

  const handleRedirect = (route: string) => {
    navigate(`/banks-web/${route}`);
  };

  const selectedAccount = accounts.find((acc) => acc.id === Number(account));

  if (!selectedAccount) {
    return (
      <div style={{ marginBottom: "25rem" }}>No se encontró el banco.</div>
    );
  }

  const formattedAmount = new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: selectedAccount.currency,
  }).format(selectedAccount.ammount);

  return (
    <Container
      maxWidth="lg"
      style={{ marginBottom: isLargeScreen ? "10rem" : "20rem" }}
    >
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
                {selectedAccount.name}
              </Typography>
              <Typography variant="body2" style={{ color: "white" }}>
                {selectedAccount.bank.name}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Avatar
                alt="Bank Logo"
                src={selectedAccount.bank.image}
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
                Cuenta No. {selectedAccount.number}
              </Typography>
              <Typography variant="body1">
                <span style={{ color: isDarkMode ? "#e6b061" : "#3e5cb2" }}>
                  Titular:{" "}
                </span>
                {selectedAccount.principal}
              </Typography>
              <Typography variant="body1">
                <span style={{ color: isDarkMode ? "#e6b061" : "#3e5cb2" }}>
                  Tipo:{" "}
                </span>
                {selectedAccount.accountType}
              </Typography>
              <Typography variant="body1">
                <span style={{ color: isDarkMode ? "#e6b061" : "#3e5cb2" }}>
                  Uso de la cuenta:{" "}
                </span>
                {selectedAccount.paymentType}
              </Typography>
            </Grid>
            <Grid item xs={isLargeScreen ? 6 : 12}>
              <div style={{ display: "grid", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  style={{ marginBottom: "1rem", width: "100%" }}
                  startIcon={<EditIcon />}
                  size="large"
                  onClick={() => handleRedirect("accounts/update")}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
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
              <Typography variant="h4">{formattedAmount}</Typography>
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
          //height: 200, altura
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
              <TextField
                label="Fecha Inicial"
                type="date"
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{
                  marginRight: isLargeScreen ? "16px" : "",
                  marginBottom: isLargeScreen ? "" : "20px",
                }}
              />
              <TextField
                label="Fecha Final"
                type="date"
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{
                  marginRight: isLargeScreen ? "16px" : "",
                  marginBottom: isLargeScreen ? "" : "20px",
                }}
              />
              <IconButton color="primary" aria-label="Buscar">
                <SearchIcon />
              </IconButton>
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
