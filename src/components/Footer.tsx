import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Box, Divider, Hidden } from '@mui/material';
import IsotipoWhite from '../assets/Imagotipo B.png';
import EmailIcon from '@mui/icons-material/Email';
import { LocationOn, Phone, TransitEnterexit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { environment } from '../environments/environment';

function Footer() {
    return (
        <footer className="footer">
            <Hidden lgUp>
                <Divider style={{marginBottom:'2rem'}}></Divider>
            </Hidden>
            <Container>
                <Box>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img
                            src={IsotipoWhite}
                            alt="Isotipo"
                            height={30}
                        />
                    </div>
                </Box>
                <div className="links">
                    <Box mb={1}></Box>
                    <div className="links-column">
                        <IconButton href="#" color="inherit">
                            <TransitEnterexit />
                        </IconButton>
                        <Link style={{ color: 'white' }} to={environment.erpUri}>Ir al portal de aplicaciones empresariales</Link>
                    </div>
                    <div>
                        <Typography variant="h6">Contacto</Typography>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="column-flex">
                            <IconButton href="#" color="inherit">
                                <LocationOn />
                            </IconButton>
                            <Typography variant="h6">Ciudad de Guatemala, Guatemala</Typography>
                            <IconButton href="#" color="inherit">
                                <Phone />
                            </IconButton>
                            <Typography variant="h6">+502 1777-0000</Typography>
                            <IconButton href="#" color="inherit">
                                <EmailIcon />
                            </IconButton>
                            <Typography variant="h6">soporte@sbi.com.gt</Typography>
                        </div>
                    </div>
                </div>
            </Container>
            <Container>
                <Typography className="copyright">&copy; Copyright - Sistema Bancario Integrado 2023</Typography>
            </Container>
        </footer>
    );
};

export default Footer;
