import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IconButton, Avatar, MenuItem, Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Logotipo from '../assets/Logotipo B.png';
import profile from '../assets/profile.png';
import dataService from '../services/Bank.service';
import { Bank } from '../interfaces/Bank.interface';
import { Logout, TransitEnterexit } from '@mui/icons-material';
import { environment } from '../environments/environment';
import AuthService from '../services/Auth.service';
import { Link } from 'react-router-dom';
import bi from '../assets/bi.jpg';
import banrural from '../assets/banrural.png';
import bam from '../assets/bam.jpg';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': {
      background: '#3e5cb2',
      ...(open && {
        ...openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
      }),
    },
  }),
);

const Content = styled('div')({
  flexGrow: 1,
  padding: '16px',
  transition: 'margin-left 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
});

export default function AccountsDrawer() {
  const [open, setOpen] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  const user = { name: 'Alessandro Juárez', email: 'ejuarezh5@miumg.edu.gt' };
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const [banks, setBanks] = React.useState<Bank[]>([]);

  React.useEffect(() => {
    dataService.getBanks()
      .then((result) => {
        setBanks(result);
        if (result.length > 0) {
          dataService.selectBank(result[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
    setShowProfile(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setShowProfile(false);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleLogout = () => {
    AuthService.logout();
  }

  const obtenerImagen = (nombreImagen: string) => {
    if (nombreImagen === 'bi') return bi;
    if (nombreImagen === 'banrural') return banrural;
    if (nombreImagen === 'bam') return bam;
  }

  return (
    <div style={{ display: 'flex' }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <div style={{ display: 'grid', marginTop: '1rem' }}>
            {open ? (
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon sx={{ color: 'white' }} />
              </IconButton>
            ) : (
              <IconButton onClick={handleDrawerOpen}>
                <ChevronRightIcon sx={{ color: 'white' }} />
              </IconButton>
            )}
            <img style={{ marginTop: '2rem', marginBottom: '2rem' }} src={Logotipo} alt="Logo" height={open ? 40 : 20} />
          </div>
        </DrawerHeader>
        <Divider />
        <List>
          {banks.map((bank) => (
            <ListItem
              key={bank.BNC_BANCO}
              disablePadding
              sx={{ display: 'block' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => dataService.selectBank(bank)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={obtenerImagen(bank.BNC_IMAGEN)} alt={bank.BNC_NOMBRE} width={24} height={24} />
                </ListItemIcon>
                <ListItemText primary={bank.BNC_NOMBRE} sx={{ opacity: open ? 1 : 0, color: 'white' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <div style={{ position: 'absolute', bottom: '16px', left: '16px', display: 'grid', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Avatar alt="User Avatar" src={profile} />
          </div>
          {showProfile && (
            <div style={{ display: 'grid' }}>
              <span style={{ color: 'white' }}>{user.name}</span>
              <span style={{ color: 'white' }}>{user.email}</span>
              <MenuItem onClick={toggleProfileMenu}>
                <ListItemIcon>
                  <TransitEnterexit sx={{ color: 'white' }} />
                </ListItemIcon>
                <Link to={environment.erpUri} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Button sx={{ color: 'white' }}>Salir al portal</Button>
                </Link>
              </MenuItem>
              <MenuItem onClick={toggleProfileMenu}>
                <ListItemIcon>
                  <Logout sx={{ color: 'white' }} />
                </ListItemIcon>
                <Button onClick={handleLogout} sx={{ color: 'white' }}>Cerrar sesión</Button>
              </MenuItem>
            </div>
          )}
        </div>
      </Drawer>
      <Content style={{ marginLeft: open ? drawerWidth : 0 }}>
        {/* Contenido */}
      </Content>
    </div>
  );
}
