import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import {
  Container,
  useMediaQuery,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

function ReportsDetail({ theme }: any) {
  const isLargeScreen = useMediaQuery("(min-width: 600px)");
  const [formatoDocumento, setFormatoDocumento] = useState("csv");
  const isDarkMode: boolean = theme.palette.mode === "dark";

  const handleFormatoDocumentoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormatoDocumento((event.target as HTMLInputElement).value);
  };

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        align={isLargeScreen ? "left" : "center"}
        color="textPrimary"
        gutterBottom
      >
        Reporte de Ingresos
      </Typography>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Card
          style={{
            marginTop: "2rem",
            marginBottom: isLargeScreen ? "" : "3rem",
          }}
        >
          <CardHeader
            title="Seleccione los Parámetros del Reporte"
            className="card-header"
            sx={{ backgroundColor: isDarkMode ? "#333333" : "" }}
          />
          <CardContent style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
            <div
              style={{
                display: isLargeScreen ? "flex" : "grid",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "2rem",
                marginTop: "2rem",
              }}
            >
              <FormControl size="small" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="bancos-label">Seleccione Banco</InputLabel>
                <Select
                  labelId="bancos-label"
                  id="bancos-select"
                  label="Seleccione Banco"
                  size="small"
                  style={{
                    backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                    borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                  }}
                >
                  <MenuItem value={1}>Banco Industrial</MenuItem>
                  <MenuItem value={2}>Banco Banrural</MenuItem>
                  <MenuItem value={3}>Banco Agromercantil</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ m: 1, minWidth: 280 }}>
                <InputLabel id="cuentas-label">Cuentas</InputLabel>
                <Select
                  labelId="cuentas-label"
                  id="cuentas-select"
                  label="Cuentas"
                  size="small"
                  style={{
                    backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                    borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                  }}
                >
                  <MenuItem value={1}>Cuenta No. 0000000001</MenuItem>
                  <MenuItem value={2}>Cuenta No. 0000000002</MenuItem>
                  <MenuItem value={3}>Cuenta No. 0000000003</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ m: 0.5, minWidth: 140 }}>
                <InputLabel id="categorias-label">Categorías</InputLabel>
                <Select
                  labelId="categorias-label"
                  id="categorias-select"
                  label="Categorías"
                  size="small"
                  style={{
                    backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                    borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                  }}
                >
                  <MenuItem value={1}>Categoría 1</MenuItem>
                  <MenuItem value={2}>Categoría 2</MenuItem>
                  <MenuItem value={3}>Categoría 3</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div
              style={{
                display: isLargeScreen ? "flex" : "grid",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "2rem",
              }}
            >
              <TextField
                id="fecha-inicio"
                label="Fecha de Inicio"
                type="date"
                size="small"
                sx={{ m: 1, minWidth: 120 }}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{
                  backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                  borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                }}
              />
              <TextField
                id="fecha-fin"
                label="Fecha de Fin"
                type="date"
                size="small"
                sx={{ m: 1, minWidth: 120 }}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{
                  backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                  borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                }}
              />
            </div>
            {/* Tercer div con radio buttons */}
            <div
              style={{
                display: isLargeScreen ? "flex" : "grid",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControl component="fieldset">
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ marginBottom: "0.5rem" }}
                >
                  Selecciona el formato del documento
                </Typography>
                <RadioGroup
                  aria-label="formato-documento"
                  name="formato-documento"
                  value={formatoDocumento}
                  onChange={handleFormatoDocumentoChange}
                  row
                >
                  <FormControlLabel
                    value="csv"
                    control={<Radio />}
                    label="CSV"
                  />
                  <FormControlLabel
                    value="xlsx"
                    control={<Radio />}
                    label="XLSX"
                  />
                  <FormControlLabel
                    value="pdf"
                    control={<Radio />}
                    label="PDF"
                  />
                  <FormControlLabel
                    value="txt"
                    control={<Radio />}
                    label="TXT"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "2rem",
                marginBottom: "1rem",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<DownloadIcon />}
              >
                Descargar Reporte
              </Button>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}

export default ReportsDetail;
