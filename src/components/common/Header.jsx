import React from 'react';
import { Typography, Button, Grid, Switch} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const Header = ({theme, toggleTheme }) => {
  const navigate = useNavigate()
  const location = useLocation();

  const label = { inputProps: { 'aria-label': 'Switch demo' } };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{display:'flex', justifyContent:'space-between', alignItems:'inherit'}}>

          <Button onClick={() => navigate(location.pathname === '/'? '/converter' : '/')} color='inherit'>
           {location.pathname !== '/' ? 'Home' : 'Converter'} Page 
         </Button>

         <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
            {theme === 'dark' ? 'Light' : 'Dark'} Mode
            <Switch
              color="default"
              checked={theme === 'dark'}
              onChange={toggleTheme}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Typography>

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;


