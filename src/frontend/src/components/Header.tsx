import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="sm">
        <Toolbar sx={{ justifyContent: 'center' }}>
          <CurrencyExchangeIcon sx={{ mr: 2 }} />
          <Typography variant="h4" component="h1">
            Exchange rates
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
