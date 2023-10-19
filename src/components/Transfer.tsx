import {
  Container,
  Typography,
  Select,
  FormControl,
  InputLabel,
  Card,
  Grid,
  TextField,
  Tooltip,
  Button,
  MenuItem,
  InputAdornment,
  OutlinedInput,
  useMediaQuery,
} from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import dataservice, { subscribeToSelectedBank } from "../services/Bank.service";
import { Bank } from "../interfaces/Bank.interface";
import { useEffect, useState } from "react";

const Transfer = ({ theme }: any) => {
  const isDarkMode: boolean = theme.palette.mode === "dark";
  const isLargeScreen = useMediaQuery("(min-width: 600px)");
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  useEffect(() => {
    setSelectedBank(dataservice.selectedBank);
    const unsubscribe = subscribeToSelectedBank((newSelectedBank) => {
      setSelectedBank(newSelectedBank);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        color="textPrimary"
        textAlign={"start"}
        gutterBottom
        marginBottom={"2rem"}
      >
        Transferencia de Cuenta de {selectedBank?.name}
      </Typography>
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Grid container justifyContent="center">
          <Grid xs={12} sm={8} md={6} lg={6}>
            <Card sx={{ backgroundColor: isDarkMode ? "#292929" : "#f7f7f7" }}>
              <div style={{ margin: "20px" }}>
                <form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl size="small" style={{ width: "100%" }}>
                        <InputLabel id="cuenta-select-label">
                          Número de cuenta Origen
                        </InputLabel>
                        <Select
                          className="textfield"
                          fullWidth
                          size="small"
                          label="Número de cuenta Origen"
                          //value={accountType}
                          //onChange={(e) => setAccountType(e.target.value)}
                          //error={accountTypeError}
                          style={{
                            backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                            borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                          }}
                        >
                          <MenuItem value={1}>Cuenta 1</MenuItem>
                          <MenuItem value={2}>Cuenta 2</MenuItem>
                          <MenuItem value={3}>Cuenta 3</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{ marginTop: "13px", marginBottom: "1rem" }}
                    >
                      <FormControl size="small" style={{ width: "100%" }}>
                        <InputLabel id="cuenta-select-label">
                          Número de cuenta Destino
                        </InputLabel>
                        <Select
                          className="textfield"
                          fullWidth
                          size="small"
                          label="Número de cuenta Destino"
                          //value={accountType}
                          //onChange={(e) => setAccountType(e.target.value)}
                          //error={accountTypeError}
                          style={{
                            backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                            borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                          }}
                        >
                          <MenuItem value={1}>Cuenta 1</MenuItem>
                          <MenuItem value={2}>Cuenta 2</MenuItem>
                          <MenuItem value={3}>Cuenta 3</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={5.2} md={4.2} lg={4.2}>
                      <TextField
                        label="Fecha"
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
                    <Grid
                      item
                      xs={5}
                      sm={4}
                      md={4}
                      lg={4}
                      marginLeft={isLargeScreen ? "2.5rem" : ""}
                    >
                      <FormControl size="small" style={{ width: "100%" }}>
                        <InputLabel htmlFor="monto">Monto</InputLabel>
                        <OutlinedInput
                          id="monto"
                          startAdornment={
                            <InputAdornment position="start">Q</InputAdornment>
                          }
                          name="monto"
                          label="Monto"
                          size="small"
                          placeholder="00.00"
                          //value={values.cobros1}
                          //onChange={handleChange}
                          //onBlur={calcularResultado}
                          //error={validation.cobros1.error}
                          style={{
                            backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                            borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid style={{ marginTop: "2rem" }}>
                    <Tooltip
                      title="Agregue una descripción o comentario"
                      placement="top-start"
                    >
                      <TextField
                        fullWidth
                        multiline
                        size="small"
                        label="Descripción"
                        variant="outlined"
                        minRows={2}
                        maxRows={6}
                        //value={accountName}
                        //onChange={(e) => setAccountName(e.target.value)}
                        //error={accountNameError}
                        style={{
                          backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                          borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                        }}
                      />
                    </Tooltip>
                  </Grid>
                  <div style={{ textAlign: "center", marginTop: "2rem" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      id="ingreso-agromercantil"
                      onClick={() => {}}
                      startIcon={<AutorenewIcon />}
                    >
                      Transferir
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Transfer;
