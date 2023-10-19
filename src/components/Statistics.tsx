import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import DownloadIcon from "@mui/icons-material/Download";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const banks = [
  { id: 1, image: "bi", name: "Banco Industrial" },
  { id: 2, image: "banrural", name: "Banrural" },
  { id: 3, image: "bam", name: "Banco Agromercantil" },
];

const accounts = [
  { id: 1, name: "Cuenta 1" },
  { id: 2, name: "Cuenta 2" },
  { id: 3, name: "Cuenta 3" },
];

const Title = styled(Typography)({
  textAlign: "left",
});

const StyledSelect = styled(Select)({
  minWidth: "200px",
  margin: "8px 0px 8px 8px",
  alignSelf: "center",
});

const CardContentWrapper = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const IconWrapper = styled("div")({
  fontSize: "2rem",
  margin: "8px 0",
});

const GridContainer = styled(Grid)({
  flexGrow: 1,
});

const GridItem = styled(Grid)({
  minWidth: "200px",
});

function Statistics({ theme }: any) {
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery("(min-width: 900px)");
  const isDarkMode: boolean = theme.palette.mode === "dark";
  const [selectedBank, setSelectedBank] = React.useState("");
  const [selectedAccount, setSelectedAccount] = React.useState("");
  const sample = [1, 10, 30, 50, 70, 90, 100];

  const StyledCard = styled(Card)({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "&.MuiGrid-item": {
      margin: "16px",
    },
    backgroundColor: isDarkMode ? "#1a1a1a" : "#F7F7F7",
  });

  const handleRedirect = (route: string) => {
    navigate(`/${route}`);
  };

  const handleBankChange = (event: any) => {
    setSelectedBank(event.target.value);
  };

  const handleAccountChange = (event: any) => {
    setSelectedAccount(event.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Title variant="h4">Estadísticas</Title>
      <Card
        variant="outlined"
        sx={{
          marginBottom: "2rem",
          marginTop: "2rem",
        }}
      >
        <CardContent
          sx={{
            backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7",
          }}
        >
          <Grid
            justifyContent="start"
            alignItems="center"
            sx={{
              textAlign: "end",
            }}
            container
            spacing={2}
          >
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<DownloadIcon />}
                size="large"
              >
                Descargar Informe
              </Button>
            </Grid>
            <Grid item style={{ marginRight: "22.25vw" }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<DoubleArrowIcon />}
                onClick={() => handleRedirect("reports")}
              >
                Generar Reportes
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<DeleteIcon />}
              >
                Limpiar Filtros
              </Button>
            </Grid>
          </Grid>

          <Grid sx={{ marginTop: "2rem", textAlign: "end" }}>
            <TextField
              label="Fecha Inicial"
              size="small"
              type="date"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              style={{
                marginRight: "16px",
                backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
              }}
            />
            <TextField
              label="Fecha Final"
              size="small"
              type="date"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              style={{
                backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
              }}
            />
          </Grid>
          <div
            style={{
              display: isLargeScreen ? "flex" : "grid",
              justifyContent: "end",
              marginBottom: "1rem",
            }}
          >
            <StyledSelect
              value={selectedBank}
              size="small"
              onChange={handleBankChange}
              displayEmpty
              style={{
                backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
              }}
              inputProps={{ "aria-label": "Seleccione un banco" }}
            >
              <MenuItem value="" disabled>
                Seleccione un banco
              </MenuItem>
              {banks.map((bank) => (
                <MenuItem key={bank.id} value={bank.name}>
                  {bank.name}
                </MenuItem>
              ))}
            </StyledSelect>
            {selectedBank && (
              <StyledSelect
                value={selectedAccount}
                size="small"
                onChange={handleAccountChange}
                displayEmpty
                style={{
                  backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                  borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                }}
                inputProps={{ "aria-label": "Seleccione una cuenta" }}
              >
                <MenuItem value="" disabled>
                  Seleccione una cuenta
                </MenuItem>
                {accounts.map((account) => (
                  <MenuItem key={account.id} value={account.name}>
                    {account.name}
                  </MenuItem>
                ))}
              </StyledSelect>
            )}
          </div>
        </CardContent>
      </Card >
      <GridContainer container spacing={2}>
        <GridItem item xs={12} sm={6} md={3}>
          <StyledCard variant="outlined">
            <IconWrapper>
              <AttachMoneyIcon color="primary" />
            </IconWrapper>
            <CardContentWrapper>
              <Typography variant="subtitle1" color="textSecondary">
                Saldo Actual en la Cuenta
              </Typography>
              <Typography variant="h5" color="primary">
                Q.600,000.00
              </Typography>
            </CardContentWrapper>
          </StyledCard>
        </GridItem>
        <GridItem item xs={12} sm={6} md={3}>
          <StyledCard variant="outlined">
            <IconWrapper>
              <ArrowDownwardIcon color="error" />
            </IconWrapper>
            <CardContentWrapper>
              <Typography variant="subtitle1" color="textSecondary">
                Monto de Egresos
              </Typography>
              <Typography variant="h5" color="error">
                Q.230,000.00
              </Typography>
            </CardContentWrapper>
          </StyledCard>
        </GridItem>
        <GridItem item xs={12} sm={6} md={3}>
          <StyledCard variant="outlined">
            <IconWrapper>
              <ArrowUpwardIcon color="success" />
            </IconWrapper>
            <CardContentWrapper>
              <Typography variant="subtitle1" color="textSecondary">
                Monto de Ingresos
              </Typography>
              <Typography variant="h5" color="success">
                Q.400,000.00
              </Typography>
            </CardContentWrapper>
          </StyledCard>
        </GridItem>
        <GridItem item xs={12} sm={6} md={3}>
          <StyledCard variant="outlined">
            <IconWrapper>
              <DoubleArrowIcon color="primary" />
            </IconWrapper>
            <CardContentWrapper>
              <Typography variant="subtitle1" color="textSecondary">
                Monto en Reserva
              </Typography>
              <Typography variant="h5" color="primary">
                Q.30,000.00
              </Typography>
            </CardContentWrapper>
          </StyledCard>
        </GridItem>
      </GridContainer>
      <div
        style={{
          display: isLargeScreen ? "flex" : "grid",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <LineChart
          sx={{ backgroundColor: isDarkMode ? "#1a1a1a" : "#F7F7F7" }}
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [20000, 15000, 24000, 40000, 10000, 5000],
            },
          ]}
          width={isLargeScreen ? 500 : 400}
          height={400}
        />
        <PieChart
          sx={{ backgroundColor: isDarkMode ? "#1a1a1a" : "#F7F7F7" }}
          series={[
            {
              data: [
                { id: 0, value: 20, label: "Ingresos" },
                { id: 1, value: 10, label: "Egresos" },
                { id: 2, value: 5, label: "Reserva" },
              ],
            },
          ]}
          width={isLargeScreen ? 500 : 400}
          height={400}
        />
      </div>
      <div
        style={{
          display: isLargeScreen ? "flex" : "grid",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "2rem",
          marginTop: "wrem",
        }}
      >
        <BarChart
          sx={{ backgroundColor: isDarkMode ? "#1a1a1a" : "#F7F7F7" }}
          title="Gastos por Categoría"
          yAxis={[
            { scaleType: "band", data: ["Gasolina", "Comida", "Utilería"] },
          ]}
          series={[{ data: [5000, 10000, 4000] }]}
          layout="horizontal"
          width={isLargeScreen ? 500 : 400}
          height={400}
        />
        <LineChart
          sx={{ backgroundColor: isDarkMode ? "#1a1a1a" : "#F7F7F7" }}
          xAxis={[{ data: sample }]}
          yAxis={[
            { id: "linearAxis", scaleType: "linear" },
            { id: "logAxis", scaleType: "log" },
          ]}
          series={[
            { yAxisKey: "linearAxis", data: sample, label: "Ingresos" },
            { yAxisKey: "logAxis", data: sample, label: "Egresos" },
          ]}
          leftAxis="linearAxis"
          rightAxis="logAxis"
          width={isLargeScreen ? 500 : 400}
          height={400}
        />
      </div>
    </Container>
  );
}

export default Statistics;
