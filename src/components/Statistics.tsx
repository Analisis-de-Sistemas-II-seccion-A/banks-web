import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const banks = [
  { id: 1, image: 'bi', name: 'Banco Industrial' },
  { id: 2, image: 'banrural', name: 'Banrural' },
  { id: 3, image: 'bam', name: 'Banco Agromercantil' },
];

const accounts = [
  { id: 1, name: 'Cuenta 1' },
  { id: 2, name: 'Cuenta 2' },
  { id: 3, name: 'Cuenta 3' },
];

const Title = styled(Typography)({
  textAlign: 'left',
});

const ButtonsContainer = styled('div')({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  margin: '8px 0',
});

const ButtonSpacing = styled('div')({
  margin: '0 1%',
});

const StyledSelect = styled(Select)({
  minWidth: '200px',
  margin: '8px 0px 8px 8px',
  alignSelf: 'center',
});

const CardContentWrapper = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const IconWrapper = styled('div')({
  fontSize: '2rem',
  margin: '8px 0',
});

const GridContainer = styled(Grid)({
  flexGrow: 1,
});

const GridItem = styled(Grid)({
  minWidth: '200px',
});

function Statistics({ theme }: any) {
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery('(min-width: 900px)');
  const isDarkMode: boolean = theme.palette.mode === "dark";
  const [selectedBank, setSelectedBank] = React.useState('');
  const [selectedAccount, setSelectedAccount] = React.useState('');
  const sample = [1, 10, 30, 50, 70, 90, 100];

  const StyledCard = styled(Card)({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '&.MuiGrid-item': {
      margin: '16px',
    },
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ebebeb'
  });

  const handleRedirect = (route: string) => {
    navigate(`/banks-web/${route}`);
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
      <Card sx={{backgroundColor: isDarkMode ? '#1a1a1a' : '#ebebeb', marginBottom: '2rem', marginTop: '2rem'}}>
        <CardContent>
          <ButtonsContainer style={{ marginTop: '2rem' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AttachMoneyIcon />}
            >
              Descargar Informe
            </Button>
            <ButtonSpacing />
            <Button
              variant="contained"
              color="primary"
              startIcon={<DoubleArrowIcon />}
              onClick={() => handleRedirect('reports')}
            >
              Generar Reportes
            </Button>
          </ButtonsContainer>
          <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '1rem' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DeleteIcon />}
            >
              Limpiar Filtros
            </Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
            <TextField
              label="Fecha Inicial"
              type="date"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginRight: '16px' }}
            />
            <TextField
              label="Fecha Final"
              type="date"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div style={{ display: isLargeScreen ? 'flex' : 'grid', justifyContent: 'end', marginBottom: '1rem' }}>
            <StyledSelect
              value={selectedBank}
              onChange={handleBankChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Seleccione un banco' }}
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
                onChange={handleAccountChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Seleccione una cuenta' }}
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
      </Card>
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
      <div style={{ display: isLargeScreen ? 'flex' : 'grid', alignItems: 'center', justifyContent: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
        <LineChart
          sx={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#ebebeb' }}
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          width={isLargeScreen ? 500 : 400}
          height={400}
        />
        <PieChart
          sx={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#ebebeb' }}
          series={[
            {
              data: [
                { id: 0, value: 10, label: 'series A' },
                { id: 1, value: 15, label: 'series B' },
                { id: 2, value: 20, label: 'series C' },
              ],
            },
          ]}
          width={isLargeScreen ? 500 : 400}
          height={400}
        />
      </div>
      <div style={{ display: isLargeScreen ? 'flex' : 'grid', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', marginTop: 'wrem' }}>
        <BarChart
          sx={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#ebebeb' }}
          yAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
          series={[{ data: [4, 3, 5] }]}
          layout='horizontal'
          width={isLargeScreen ? 500 : 400}
          height={400}
        />
        <LineChart
          sx={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#ebebeb' }}
          xAxis={[{ data: sample }]}
          yAxis={[
            { id: 'linearAxis', scaleType: 'linear' },
            { id: 'logAxis', scaleType: 'log' },
          ]}
          series={[
            { yAxisKey: 'linearAxis', data: sample, label: 'linear' },
            { yAxisKey: 'logAxis', data: sample, label: 'log' },
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
