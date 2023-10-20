import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tooltip from "@mui/material/Tooltip";
import FormHelperText from "@mui/material/FormHelperText";
import { Check } from "@mui/icons-material";
import ReconciliationService from "../services/Reconciliation.service";
import { Reconciliation } from "../interfaces/Reconciliation.interface";
import React from "react";

const columns = ["fecha", "importe", "descripcion", "conciliar", "eliminar"];

const CustomTable = ({ title, rows, setRows, isDarkMode }: any) => {
  const isSmallScreen = useMediaQuery("(max-width: 1200px)");

  const columnWidths: any = {
    fecha: "13%",
    importe: "15%",
    descripcion: "30%",
    conciliar: "10%",
    eliminar: "10%",
  };

  const handleAddRow = () => {
    const newRow = {
      fecha: "",
      descripcion: "",
      importe: "",
      conciliar: false,
      isError: false,
    };
    setRows([...rows, newRow]);
  };

  const handleInputChange = (e: any, rowIndex: any, fieldName: any) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][fieldName] = e.target.value;
    setRows(updatedRows);
  };

  const handleCheckboxChange = (e: any, rowIndex: any) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].conciliar = e.target.checked;
    setRows(updatedRows);
  };

  const StyledSmallTextField = styled(TextField)({
    width: "100%",
    size: "small",
    backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
    borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
  });

  return (
    <Card
      variant="outlined"
      style={{
        marginBottom: "20px",
        backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          align={"left"}
          color="textPrimary"
          gutterBottom
        >
          {title}
        </Typography>
        <TableContainer>
          <Table style={{ tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column}
                    style={{ width: columnWidths[column], textAlign: "center" }}
                  >
                    {column === "descripcion"
                      ? "Descripción"
                      : column.charAt(0).toUpperCase() + column.slice(1)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any, rowIndex: any) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={column} style={{ textAlign: "center" }}>
                      {isSmallScreen ? (
                        <div>
                          {column === "fecha" ? (
                            <Tooltip title="Ingrese la fecha" arrow>
                              <StyledSmallTextField
                                variant="outlined"
                                fullWidth
                                size="small"
                                type="date"
                                label="Fecha"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                value={row[column]}
                                onChange={(e: any) =>
                                  handleInputChange(e, rowIndex, column)
                                }
                                error={row.isError}
                              />
                            </Tooltip>
                          ) : column === "importe" ? (
                            <Tooltip title="Ingrese el importe" arrow>
                              <StyledSmallTextField
                                variant="outlined"
                                fullWidth
                                size="small"
                                type="number"
                                label="Importe"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                value={row[column]}
                                onChange={(e: any) =>
                                  handleInputChange(e, rowIndex, column)
                                }
                                error={row.isError}
                              />
                            </Tooltip>
                          ) : column === "descripcion" ? (
                            <Tooltip title="Descripción del importe" arrow>
                             <StyledSmallTextField
                                variant="outlined"
                                fullWidth
                                size="small"
                                type="text"
                                label="Descripción"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                value={row[column]}
                                onChange={(e: any) =>
                                  handleInputChange(e, rowIndex, column)
                                }
                                error={row.isError}
                              />
                            </Tooltip>
                          ) : column === "conciliar" ? (
                            <Checkbox
                              checked={row[column]}
                              onChange={(e) =>
                                handleCheckboxChange(e, rowIndex)
                              }
                            />
                          ) : (
                            ""
                          )}
                          {row.isError && (
                            <FormHelperText error>Obligatorio</FormHelperText>
                          )}
                        </div>
                      ) : (
                        <div>
                          {column === "fecha" ? (
                            <Tooltip title="Ingrese la fecha" arrow>
                              <StyledSmallTextField
                                variant="outlined"
                                fullWidth
                                size="small"
                                type="date"
                                label="Fecha"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                value={row[column]}
                                onChange={(e: any) =>
                                  handleInputChange(e, rowIndex, column)
                                }
                                error={row.isError}
                              />
                            </Tooltip>
                          ) : column === "importe" ? (
                            <Tooltip title="Ingrese el importe" arrow>
                              <StyledSmallTextField
                                variant="outlined"
                                fullWidth
                                size="small"
                                type="number"
                                label="Importe"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                value={row[column]}
                                onChange={(e: any) =>
                                  handleInputChange(e, rowIndex, column)
                                }
                                error={row.isError}
                              />
                            </Tooltip>
                          ) : column === "descripcion" ? (
                            <Tooltip title="Descripción del importe" arrow>
                               <StyledSmallTextField
                                variant="outlined"
                                fullWidth
                                size="small"
                                type="text"
                                label="Descripción"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                value={row[column]}
                                onChange={(e: any) =>
                                  handleInputChange(e, rowIndex, column)
                                }
                                error={row.isError}
                              />
                            </Tooltip>
                          ) : column === "conciliar" ? (
                            <Checkbox
                              checked={row[column]}
                              onChange={(e) =>
                                handleCheckboxChange(e, rowIndex)
                              }
                            />
                          ) : (
                            ""
                          )}
                          {row.isError && (
                            <FormHelperText error>Obligatorio</FormHelperText>
                          )}
                        </div>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <IconButton color="primary" onClick={handleAddRow}>
          <AddIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

const ReconciliationDetail = ({ theme }: any) => {
  const isDarkMode: boolean = theme.palette.mode === "dark";
  const [table1Rows, setTable1Rows] = useState([]);
  const [table2Rows, setTable2Rows] = useState([]);
  const [table3Rows, setTable3Rows] = useState([]);
  const [table4Rows, setTable4Rows] = useState([]);
  const [reconciliation, setReconciliation] = useState<Reconciliation>();
  const [conciliationPending, setConciliationPending] = useState<number>(0);

  const validateFields = () => {
    let isValid = true;
    table1Rows.forEach((row: any) => {
      if (
        isFieldEmpty(row.fecha) ||
        isFieldEmpty(row.descripcion) ||
        isFieldEmpty(row.importe)
      ) {
        isValid = false;
      }
    });
    return isValid;
  };

  React.useEffect(() => {
    setReconciliation(ReconciliationService.getReconciliation());
    setConciliationPending(ReconciliationService.getReconciliation().CON_DIFERENCIA);
  }, []);

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const isFieldEmpty = (value: string) => {
    return value.trim() === "";
  };

  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <Typography
          variant="h4"
          align={"left"}
          color="textPrimary"
          gutterBottom
        >
          Detalle de Conciliación Bancaria
        </Typography>
      </div>
      <Card
        variant="outlined"
        style={{
          marginBottom: "20px",
          backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7",
          marginTop: "2rem",
        }}
      >
        <CardContent sx={{ padding: "2rem" }}>

          <Grid
            container
            spacing={2}
            sx={{
              marginTop: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Grid item xs={3}>
              <Typography variant="body1" gutterBottom>
                Saldo a Conciliar:
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" gutterBottom>
                {formatCurrency(conciliationPending)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <CustomTable
        title="(+) Cargos del Banco no correspondidos por la Empresa"
        rows={table1Rows}
        setRows={setTable1Rows}
        isDarkMode={isDarkMode}
      />
      <CustomTable
        title="(+) Cargos de la Empresa no correspondidos por el Banco"
        rows={table2Rows}
        setRows={setTable2Rows}
        isDarkMode={isDarkMode}
      />
      <CustomTable
        title="(-) Abonos del Banco no correspondidos por la Empresa"
        rows={table3Rows}
        setRows={setTable3Rows}
        isDarkMode={isDarkMode}
      />
      <CustomTable
        title="(-) Abonos de la Empresa no correspondidos por el Banco"
        rows={table4Rows}
        setRows={setTable4Rows}
        isDarkMode={isDarkMode}
      />
      <Card
        variant="outlined"
        style={{
          marginBottom: "20px",
          backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7",
        }}
      >
        <CardContent
          sx={{ backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7" }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              marginBottom: "1rem",
            }}
          >
            <Grid item xs={3}>
              <Typography variant="body1" gutterBottom>
                Saldos faltante de conciliar:
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" gutterBottom>
                {formatCurrency(reconciliation?.CON_DIFERENCIA)}
              </Typography>
            </Grid>
          </Grid>
          <div style={{ marginBottom: "2px", marginTop: "1rem" }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Check />}
              onClick={validateFields}
            >
              Realizar Conciliación
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ReconciliationDetail;
