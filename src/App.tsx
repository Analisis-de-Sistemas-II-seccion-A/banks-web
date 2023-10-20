import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { CssBaseline, Hidden, createTheme, useMediaQuery } from "@mui/material";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import ReportGeneration from "./components/ReportGeneration";
import Footer from "./components/Footer";
import AccountsDrawer from "./components/BanksDrawer";
import AccountNavigation from "./components/BanksNavigation";
import AccountsList from "./components/AccountsList";
import Statistics from "./components/Statistics";
import AccountDetail from "./components/AccountDetail";
import Transactions from "./components/Transactions";
import ReportsDetail from "./components/ReportsDetail";
import BankReconciliation from "./components/Reconciliation";
import ReconciliationDetail from "./components/ReconciliationDetail";
import CreateOrUpdateAccount from "./components/CreateOrUpdateAccount";
import Transfer from "./components/Transfer";
import ExecuteTransaction from "./components/ExecuteTransaction";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isLargeScreen = useMediaQuery("(min-width: 1200px)");
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: prefersDarkMode ? "#121212" : "#ebebeb", //NAVBAR
                boxShadow: "none",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {},
              contained: {
                boxShadow: "none",
                backgroundColor: "#3e5cb2",
                border: "1px solid #3e5cb2",
                color: "white",
                "&:hover": {
                  backgroundColor: prefersDarkMode ? "#1e1e1e" : "#fff",
                  color: prefersDarkMode ? "white" : "#3e5cb2",
                  border: "1px solid #3e5cb2",
                  boxShadow: "none",
                },
              },
              text: {
                "&:hover": {
                  backgroundColor: "none",
                },
              },
            },
          },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <BrowserRouter>
          <Header theme={theme} />
          <Hidden lgDown>
            <AccountsDrawer />
          </Hidden>
          <div className={isLargeScreen ? "content-container" : ""}>
            <Routes>
              <Route path={`/`} element={<AccountsList theme={theme} />} />
              <Route
                path={`/reports`}
                element={<ReportGeneration theme={theme} />}
              />
              <Route
                path={`/statistics`}
                element={<Statistics theme={theme} />}
              />
              <Route
                path={`/accounts/:account/detail`}
                element={<AccountDetail theme={theme} />}
              />
              <Route
                path={`/transactions`}
                element={<Transactions theme={theme} />}
              />
              <Route
                path={`/reports/:type`}
                element={<ReportsDetail theme={theme} />}
              />
              <Route
                path={`/reconciliation`}
                element={<BankReconciliation theme={theme} />}
              />
              <Route
                path={`/reconciliation/detail`}
                element={<ReconciliationDetail theme={theme} />}
              />
              <Route
                path={`/accounts/:type`}
                element={<CreateOrUpdateAccount theme={theme} />}
              />
              <Route path={`/transfer`} element={<Transfer theme={theme} />} />
              <Route
                path={`/transaction/:type`}
                element={<ExecuteTransaction theme={theme} />}
              />
            </Routes>
          </div>
          <Hidden lgUp>
            <AccountNavigation />
          </Hidden>
          <Footer />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
