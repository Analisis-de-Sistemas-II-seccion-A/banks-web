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
import dataService from "../services/Data.Service";
import { DataGrid } from "@mui/x-data-grid";
//import { TablePagination } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Transactions = ({ theme }: any) => {
  const navigate = useNavigate();
  const handleRedirect = (route: string) => {
    navigate(`/${route}`);
  };

  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const isDarkMode: boolean = theme.palette.mode === "dark";
  const isLargeScreen = useMediaQuery("(min-width: 1200px)");

  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
      width: 200,
    },
    {
      field: "monto",
      headerName: "Monto",
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
      width: 200,
    },
    {
      field: "tipo",
      headerName: "Tipo",
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
      width: 200,
    },
    {
      field: "descripcion",
      headerName: "Descripción",
      headerClassName: isDarkMode ? "dark-column-header" : "column-header",
      width: 258,
    },
  ];

  const rows = [
    {
      id: 1,
      fecha: "15/04/2023",
      monto: "Q. 300.00",
      tipo: "Ingreso",
      descripcion: "Venta de productos",
    },
    {
      id: 2,
      fecha: "14/04/2023",
      monto: "Q. 400.00",
      tipo: "Egreso",
      descripcion: "Pago de nómina",
    },
    {
      id: 3,
      fecha: "12/04/2023",
      monto: "Q. 150.00",
      tipo: "Transferencia",
      descripcion: "Transferencia de fondos",
    },
    {
      id: 4,
      fecha: "10/04/2023",
      monto: "Q. 50.00",
      tipo: "Egreso",
      descripcion: "Pago de factura de servicios",
    },
    {
      id: 5,
      fecha: "08/04/2023",
      monto: "Q. 500.00",
      tipo: "Ingreso",
      descripcion: "Depósito de clientes",
    },
  ];

  useEffect(() => {
    setSelectedBank(dataService.selectedBank);
    const unsubscribe = dataService.subscribeToSelectedBank(
      (newSelectedBank) => {
        setSelectedBank(newSelectedBank);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  if (!selectedBank) {
    return <div style={{ marginBottom: "25rem" }}>Seleccione un Banco.</div>;
  }
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align={"left"} color="textPrimary" gutterBottom>
        Transacciones {selectedBank.name}
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "2rem",
          marginBottom: "2rem",
          display: isLargeScreen ? "flex" : "grid",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item xs={isLargeScreen ? 7 : 12}>
          <Card>
            <CardHeader
              title="Realizar Transacción"
              className="card-header"
              sx={{ backgroundColor: isDarkMode ? "#333333" : "" }}
            />
            <CardContent>
              <div style={{ marginRight: "5rem", marginLeft: "5rem" }}>
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
        <Grid item xs={isLargeScreen ? 3 : 12}>
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
                src={selectedBank.image}
                sx={{ height: "147px", width: "147px" }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={isLargeScreen ? 9 : 12} sx={{ marginTop: "2rem" }}>
          <Typography
            variant="h6"
            align={"left"}
            color="textPrimary"
            sx={{ marginBottom: "1rem" }}
          >
            Ultimas transacciones
          </Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            sx={{ color: isDarkMode ? "#959595" : "black" }}
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
