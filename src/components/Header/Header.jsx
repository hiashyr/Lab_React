import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <Button 
          color="inherit" 
          component={Link} 
          to="/"
          className="nav-button"
        >
          Каталог машин
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/add"
          className="nav-button"
        >
          Добавить машину
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/about"
          className="nav-button"
        >
          О проекте
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/contacts"
          className="nav-button"
        >
          Контакты
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;