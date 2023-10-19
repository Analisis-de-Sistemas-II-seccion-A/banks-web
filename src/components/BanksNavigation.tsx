import React from 'react';
import { BottomNavigation, BottomNavigationAction, Avatar, Box } from '@mui/material';
import { Bank } from '../interfaces/Bank.interface';
import dataService from '../services/Bank.service';
import bi from '../assets/bi.jpg';
import banrural from '../assets/banrural.png';
import bam from '../assets/bam.jpg';

function AccountNavigation() {
  const [value, setValue] = React.useState(0);
  const [banks, setBanks] = React.useState<Bank[]>([]);

  React.useEffect(() => {
    dataService.getBanks()
      .then((result) => {
        setBanks(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const obtenerImagen = (nombreImagen: string) => {
    if (nombreImagen === 'bi') return bi;
    if (nombreImagen === 'banrural') return banrural;
    if (nombreImagen === 'bam') return bam;
  }

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        console.log(event)
        setValue(newValue);
        if (banks[newValue]) {
          dataService.selectBank(banks[newValue]);
        }
      }}
      sx={{
        background: '#3e5cb2',
        position: 'sticky',
        bottom: 0,
        zIndex: 1000,
      }}
    >
      {banks.map((bank, index) => (
        <BottomNavigationAction
          key={index}
          label={(
            <Box>
              <Avatar src={obtenerImagen(bank.BNC_IMAGEN)} alt={bank.BNC_NOMBRE} />
            </Box>
          )}
        />
      ))}
    </BottomNavigation>
  );
}

export default AccountNavigation;
