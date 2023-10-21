import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {
  MenuItem,
  Select,
  useMediaQuery,
  Tooltip,
  FormHelperText,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Button from "@mui/material/Button";
import UpdateIcon from "@mui/icons-material/Update";
import SaveIcon from "@mui/icons-material/Save";
import AccountService from "../services/Account.service";
import { Account } from "../interfaces/Account.interface";
import React from "react";
import { Add, ArrowBack, Wallet } from "@mui/icons-material";
import CatalogService from "../services/Catalog.service";
import { AccountType } from "../interfaces/AccountType.interface";
import { Currency } from "../interfaces/Currency.interface";
import { Bank } from "../interfaces/Bank.interface";
import BankService, { subscribeToSelectedBank } from "../services/Bank.service";

const CreateOrUpdateAccount = ({ theme }: any) => {
  const { type } = useParams();
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery("(min-width: 1200px)");
  const isDarkMode: boolean = theme.palette.mode === "dark";
  const [accountToUpdate] = useState<Account>(AccountService.selectedAccount());

  if (type === "update" && !accountToUpdate) {
    return <Box sx={{minHeight: '100vh'}}>
      <div>
        No hay ninguna cuenta para actualizar :(
      </div>
      <div>
        ¿Desea crear una nueva o ir al listado de cuentas?
        <div >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/accounts/create")}
          startIcon={<Add />}
        >
          Nueva Cuenta
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("")}
          startIcon={<Wallet />}
        >
          Ir al Listado
        </Button>
        </div>
      </div>
    </Box>
  }

  
  const [accountNumber, setAccountNumber] = useState<number | null>(type === "update" ? accountToUpdate.CNT_NUMERO_CUENTA : null);
  const [accountName, setAccountName] = useState<string>(type === "update" ? accountToUpdate.CNT_NOMBRE : "");
  const [accountType, setAccountType] = useState<number | null>(type === "update" ? accountToUpdate.TCN_TIPO_CUENTA : null);
  const [currency, setCurrency] = useState<number | null>(type === "update" ? accountToUpdate.MND_MONEDA : null);
  const [representative, setRepresentative] = useState<string>(type === "update" ? accountToUpdate.CNT_TITULAR : "");
  const [phoneNumber, setPhoneNumber] = useState<number | null>(type === "update" ? accountToUpdate.CNT_TELEFONO : null);
  const [email, setEmail] = useState<string>(type === "update" ? accountToUpdate.CNT_CORREO : "");

  const [accountNumberError, setAccountNumberError] = useState(false);
  const [accountNameError, setAccountNameError] = useState(false);
  const [accountTypeError, setAccountTypeError] = useState(false);
  const [currencyError, setCurrencyError] = useState(false);
  const [representativeError, setRepresentativeError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const validKeysForNumber = [

    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "Backspace",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
  ];

  const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setSelectedBank(BankService.selectedBank);
    const unsubscribe = subscribeToSelectedBank(
      (newSelectedBank: any) => {
        setSelectedBank(newSelectedBank);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []); 
  
  useEffect(() => {

      CatalogService.getAccountTypes().then((data) => {
        setAccountTypes(data);
      });

      CatalogService.getCurrencies().then((data) => {
        setCurrencies(data);
      });
    
  }, []);

  const numberInputOnWheelPreventChange = (
    e: React.WheelEvent<HTMLInputElement>
  ) => {
    const targetInput = e.target as HTMLInputElement;
    targetInput.blur();
    e.stopPropagation();
    setTimeout(() => {
      targetInput.focus();
    }, 0);
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailPattern.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!validateEmail(newEmail)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleSubmit = () => {
    if (!accountNumber) {
      setAccountNumberError(true);
    } else {
      setAccountNumberError(false);
    }

    if (!accountName) {
      setAccountNameError(true);
    } else {
      setAccountNameError(false);
    }

    if (!accountType) {
      setAccountTypeError(true);
    } else {
      setAccountTypeError(false);
    }

    if (!currency) {
      setCurrencyError(true);
    } else {
      setCurrencyError(false);
    }

    if (!representative) {
      setRepresentativeError(true);
    } else {
      setRepresentativeError(false);
    }

    if (!phoneNumber) {
      setPhoneNumberError(true);
    } else {
      setPhoneNumberError(false);
    }

    if (!validateEmail(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (
      accountNumber &&
      accountName &&
      accountType &&
      currency &&
      representative &&
      phoneNumber &&
      validateEmail(email)
    ) {
     setOpen(true);
    }
  };

  const handleExecuteAction = () => {
    if(type === "update") {
      AccountService.updateAccount({
        CNT_CUENTA: accountToUpdate.CNT_CUENTA,
        CNT_NUMERO_CUENTA: accountNumber,
        CNT_NOMBRE: accountName,
        TCN_TIPO_CUENTA: accountType,
        MND_MONEDA: currency,
        CNT_TITULAR: representative,
        CNT_TELEFONO: phoneNumber,
        CNT_CORREO: email,
      } as Account).then((data) => {
        AccountService.deleteSelectedAccount();
        navigate(`/accounts/${data.CNT_CUENTA}/detail`);
      });
    } else {
      AccountService.createAccount({
        CNT_NUMERO_CUENTA: accountNumber,
        CNT_NOMBRE: accountName,
        TCN_TIPO_CUENTA: accountType,
        MND_MONEDA: currency,
        CNT_TITULAR: representative,
        CNT_TELEFONO: phoneNumber,
        CNT_CORREO: email,
        BNC_BANCO: selectedBank?.BNC_BANCO,
        CNT_ESTADO: true,
        CNT_SALDO: 0
      } as Account).then((data) => {
        navigate(`/accounts/${data.CNT_CUENTA}/detail`);
      });
    }
  }

  return (
    <Container maxWidth="lg">
        <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmación"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           { "Confirma que los datos son correctos y que quiere " + (type === "update" ? "actualizar" : "crear") + " la cuenta?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={()=> handleExecuteAction()} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Typography
        variant="h4"
        textAlign={"start"}
        color="textPrimary"
        gutterBottom
        marginBottom={"2rem"}
        marginTop={"1rem"}
      >
        {type === "update" ? "Actualizar cuenta" : "Agregar cuenta"}
      </Typography>
      <Grid
        container
        maxWidth="lg"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Card
        variant="outlined"
          style={{
            marginBottom: "16px",
            marginTop: "1rem",
            backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7",
            width: isLargeScreen ? "50%" : "100%",
          }}
        >
          <CardContent
          >
            <Typography
              variant="h6"
              color="textPrimary"
              textAlign="start"
              gutterBottom
              marginBottom="1rem"
            >
              Información de la Cuenta
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={5} md={4} lg={5} marginBottom="5px">
                <Tooltip
                  title="Ingrese el número de cuenta"
                  placement="top-start"
                >
                  <TextField
                    className="noarrows"
                    fullWidth
                    size="small"
                    label="Número de cuenta"
                    variant="outlined"
                    type="number"
                    value={accountNumber}
                    onChange={(e) => {
                      setAccountNumber(parseInt(e.target.value));
                      if (accountNumberError) {
                        setAccountNumberError(false); 
                           }
                    }}
                    error={accountNumberError}
                    FormHelperTextProps={{
                      style: {
                        backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7",
                        margin: 0,
                        paddingLeft: "10",
                        paddingRight: "10",
                      },
                    }}
                    helperText={
                      accountNumberError ? "*Numero de cuenta invalido" : null
                    }
                    InputProps={{
                      inputProps: {
                        min: 0, 
                      },
                    }}
                    onKeyDown={(e) => {
                      if (!validKeysForNumber.includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    onWheel={numberInputOnWheelPreventChange} 
                        style={{
                      backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                      borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                    }}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={10} sm={6} md={6} lg={6} marginBottom="5px">
                <Tooltip
                  title="Ingrese el nombre que le asignará a su cuenta"
                  placement="top-start"
                >
                  <TextField
                    fullWidth
                    size="small"
                    label="Nombre de Cuenta"
                    variant="outlined"
                    value={accountName}
                    onChange={(e) => {
                      setAccountName(e.target.value);
                      if (accountNameError) {
                        setAccountNameError(false);
                      }
                    }}
                    error={accountNameError}
                    FormHelperTextProps={{
                      style: {
                        backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7",
                        margin: 0,
                        paddingLeft: "10",
                        paddingRight: "10",
                      },
                    }}
                    helperText={
                      accountNameError
                        ? "*Se requiere el nombre de la cuenta"
                        : null
                    }
                    style={{
                      backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                      borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                    }}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={5} sm={5} md={3} lg={4.5}>
                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel>Tipo de Cuenta</InputLabel>
                  <Tooltip
                    placement="top-start"
                    title="Seleccione un tipo de cuenta"
                  >
                    <Select
                      size="small"
                      label="Tipo de Cuenta"
                      value={accountType}
                      onChange={(e) => {
                        setAccountType(e.target.value as number);
                        if (accountTypeError) {
                          setAccountTypeError(false);
                        }
                      }}
                      error={accountTypeError}
                      style={{
                        backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                        borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                      }}
                    >
                        {accountTypes.map((accountType) => (
                        <MenuItem
                          key={accountType.TCN_TIPO_CUENTA}
                          value={accountType.TCN_TIPO_CUENTA}>
                          {accountType.TCN_NOMBRE}
                        </MenuItem>
                      ))}
                    </Select>
                  </Tooltip>
                  {accountTypeError && (
                    <FormHelperText
                      sx={{
                        backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7",
                        color: "#f44336",
                        margin: 0,

                        paddingRight: 1,
                      }}
                    >
                      *Seleccione un tipo de cuenta
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={5} sm={5} md={2.5} lg={4}>
                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel>Moneda</InputLabel>
                  <Tooltip
                    placement="top-start"
                    title="Seleccione un tipo de moneda"
                  >
                    <Select
                      size="small"
                      value={currency}
                      label="Moneda"
                      onChange={(e) => {
                        setCurrency(e.target.value as number);
                        if (currencyError) {
                          setCurrencyError(false);
                        }
                      }}
                      error={currencyError}
                      style={{
                        backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                        borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                      }}
                    >
                      {currencies.map((currency) => (
                        <MenuItem
                          key={currency.MND_MONEDA}
                          value={currency.MND_MONEDA}
                        >
                          {currency.MND_DESCRIPCION}
                        </MenuItem>
                      ))}
                    </Select>
                  </Tooltip>
                  {currencyError && (
                    <FormHelperText
                      sx={{
                        backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7",
                        color: "#f44336",
                        margin: 0,
                      }}
                    >
                      *Seleccione un tipo de moneda
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card
          variant="outlined"
          sx={{
            backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7",
            width: isLargeScreen ? "50%" : "100%",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              color="textPrimary"
              textAlign="start"
              gutterBottom
              marginBottom="1rem"
            >
              Información del Titular
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={10} md={10} lg={12} marginBottom="5px">
                <Tooltip
                  title="Ingrese el nombre completo del titular"
                  placement="top-start"
                >
                  <TextField
                    fullWidth
                    size="small"
                    label="Nombre del titular"
                    variant="outlined"
                    value={representative}
                    onChange={(e) => {
                      setRepresentative(e.target.value);
                      if (representativeError) {
                        setRepresentativeError(false);
                      }
                    }}
                    error={representativeError}
                    FormHelperTextProps={{
                      style: {
                        backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7",
                        margin: 0,
                        paddingLeft: "10",
                        paddingRight: "10",
                      },
                    }}
                    helperText={
                      representativeError
                        ? "*Se requiere el nombre del titular"
                        : null
                    }
                    style={{
                      backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                      borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                    }}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={6} sm={3} md={4} lg={4}>
                <Tooltip
                  title="Ingrese el número de teléfono del titular"
                  placement="top-start"
                >
                  <TextField
                    className="textfield noarrows"
                    fullWidth
                    size="small"
                    label="Teléfono"
                    variant="outlined"
                    type="number"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(parseInt(e.target.value));
                      if (phoneNumberError) {
                        setPhoneNumberError(false);
                      }
                    }}
                    error={phoneNumberError}
                    FormHelperTextProps={{
                      style: {
                        backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7",
                        margin: 0,
                      },
                    }}
                    helperText={
                      phoneNumberError
                        ? "*Ingrese el número de télefono del titular"
                        : null
                    }
                    InputProps={{
                      inputProps: {
                        min: 0, // Esto evita números negativos
                      },
                    }}
                    onKeyDown={(e) => {
                      // Evita que el usuario escriba letras en el input
                      if (!validKeysForNumber.includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    onWheel={numberInputOnWheelPreventChange} // Evita que el usuario cambie el valor del input con la rueda del mouse
                    style={{
                      backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                      borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                    }}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={8}>
                <Tooltip
                  title="Ingrese la dirección de correo electrónico del titular"
                  placement="top-start"
                >
                  <TextField
                    fullWidth
                    size="small"
                    label="Correo electrónico"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    error={emailError}
                    FormHelperTextProps={{
                      style: {
                        backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7f7",
                        margin: 0,
                      },
                    }}
                    helperText={
                      emailError
                        ? "*Dirección de correo electrónico invalida"
                        : null
                    }
                    style={{
                      backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                      borderColor: isDarkMode ? "#3b3b3b" : "#bcbcbc",
                    }}
                  />
                </Tooltip>
              </Grid>
            </Grid>
          </CardContent>
          <div
            style={{
              display: "grid",
              justifyContent: "center",
              marginTop: "1rem",
              marginBottom: "2rem",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={type === "update" ? <UpdateIcon /> : <SaveIcon />}
              onClick={handleSubmit}
            >
              {type === "update" ? "Actualizar" : "Guardar"}
            </Button>
            <div style={{height:'1rem'}}>

            </div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={ <ArrowBack />}
              onClick={type === "create" ? () => navigate("/") : () => navigate(`/accounts/${accountToUpdate.CNT_CUENTA}/detail`)}
            >
              {"Regresar"}
            </Button>
          </div>
        </Card>
      </Grid>
    </Container>
  );
};

export default CreateOrUpdateAccount;
