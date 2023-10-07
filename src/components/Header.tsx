import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Hidden,
  Box,
} from "@mui/material";
import Isotipo from "../assets/Isotopo.png";
import IsotipoWhite from "../assets/Isotopo B.png";
import Profile from '../assets/profile.png';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Article, Equalizer, Receipt } from "@mui/icons-material";

import ProfileDrawer from "./ProfileDrawer";
import { useNavigate } from "react-router-dom";

function Header({ theme }: any) {
  const navigate = useNavigate();
  const isDarkMode: boolean = theme.palette.mode === "dark";
  const appBarClass = isDarkMode ? "dark-appbar" : "light-appbar";

  const buttonStyle = {
    color: isDarkMode ? "white" : "black",
    fontWeigth: "bold"
  };
 const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleRedirect = (route: string) => {
    navigate(`/banks-web/${route}`);
  };

  return (
    <AppBar position="static" className={appBarClass}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Hidden lgUp>
          <IconButton
            edge="end"
            aria-label="menu"
            onClick={toggleProfileMenu}
            style={{ padding: 0 }}
          >
            <img
              src={Profile}
              alt="Perfil del usuario"
              height={30}
              width={30}
              style={{ borderRadius: "50%" }}
            />
          </IconButton>
          <Box display="flex" alignItems="center">
            <img
              src={isDarkMode ? IsotipoWhite : Isotipo}
              alt="Isotipo"
              height={30}
            />
          </Box>
          <Box></Box>
        </Hidden>
        <Hidden lgDown>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            <ul
              className="navbar-nav mx-auto text-uppercase"
              style={{ display: "flex", listStyle: "none", padding: 0, backgroundColor: isDarkMode ? "#272727" : ""  }}
            >
              <li className="nav-item">
                <Button onClick={() => handleRedirect("")} sx={buttonStyle}>Cuentas</Button>
              </li>
              <li className="nav-item">
                <Button onClick={() => handleRedirect("transactions")} sx={buttonStyle}>Transacciones</Button>
              </li>
              <li className="nav-item">
                <Button onClick={() => handleRedirect('statistics')} sx={buttonStyle}>Estadísticas</Button>
              </li>
              <li className="nav-item">
                <Button onClick={() => handleRedirect('reconciliation')}   sx={buttonStyle}>Conciliaciones</Button>
              </li>
              <li className="nav-item">
                <Button onClick={() => handleRedirect('reports')} sx={buttonStyle}>Reportes</Button>
              </li>
            </ul>
          </div>
        </Hidden>
        <ProfileDrawer
          profileMenuOpen={profileMenuOpen}
          toggleProfileMenu={toggleProfileMenu}
          profileImage={Profile}
          profileName="Alessandro Juárez"
          profileEmail="ejuarezh5@miumg.edu.gt"
          menuItems={[
            { icon: <AccountBalanceIcon />, buttonStyle: buttonStyle, label: "Cuentas", route:'' },
            { icon: <AccountBalanceWalletIcon />, buttonStyle: buttonStyle, label: "Transacciones", route:'transactions' },
            { icon: <Equalizer />, buttonStyle: buttonStyle, label: "Estadisticas", route:'statistics' },
            { icon: <Receipt />, buttonStyle: buttonStyle, label: "Conciliaciones", route:'reconciliation' },
            { icon: <Article />, buttonStyle: buttonStyle, label: "Reportes", route:'reports' },
          ]}
          buttonStyle={buttonStyle}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
