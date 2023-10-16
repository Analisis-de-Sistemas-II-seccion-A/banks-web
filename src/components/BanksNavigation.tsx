import React from 'react';
import { BottomNavigation, BottomNavigationAction, Avatar, Box } from '@mui/material';
import bi from '../assets/bi.jpg';
import banrural from '../assets/banrural.png';
import bam from '../assets/bam.jpg';
import { Bank } from '../interfaces/Bank.interface';
import dataService from '../services/Bank.service';

function AccountNavigation() {
  const [value, setValue] = React.useState(0);
  const banks: Bank[] = [{ id: 1, image: bi, name: 'Banco Industrial' }, { id: 2, image: banrural, name: 'Banrural' }, { id: 3, image: bam, name: 'Banco Agromercantil' }];
  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        console.log(event)
        setValue(newValue);
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
          onClick={() => dataService.selectBank(bank)}
          key={index}
          label={(
            <Box>
              <Avatar src={bank.image} alt={bank.name} />
            </Box>
          )}
        />
      ))}
    </BottomNavigation>
  );
}

export default AccountNavigation;
