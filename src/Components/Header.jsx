import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Login from './home/BotonInicioSesion'
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import BotonInicioSesion from './home/BotonInicioSesion';
import logoComunidad from '../logo.svg';
import DatosUsuarioContextProvider from '../Context/DatosUsuarioContext';
import { useContext } from 'react';
import { Avatar } from '@mui/material';





const Header = () => {
  const {datosUsuario, cambiarDatosUsuario, token, cambiarToken, idUsuario, cambiarIdUsuario, estaLogeado, cambiarEstadoLogeado} = useContext(DatosUsuarioContextProvider)
  
  function stringToColor(string) {
    let hash = 0;
    let i;
  
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
   
  
    return color;
  }

  function stringAvatar(nombre) {
    
    return {
      sx: {
        bgcolor: stringToColor(nombre),
      },
      children: `${nombre.split(' ')[0][0]}${nombre.split(' ')[1][0]}`,
    };
  }

  return (
    <Box sx={{ flexGrow: 1, display:"flex"}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          

          <Box sx={{ flexGrow: 1,   display: { xs: 'none', lg: 'flex', xl: 'flex' }, justifyContent:"center"}} />
            <img src="https://cdn.discordapp.com/attachments/956988369693454466/989600731369709669/Logoblanco.png" style={{height:"4rem", padding:"0.5rem"}}></img> 
          <Box sx={{ flexGrow: 1 }} />
          {estaLogeado ? <Avatar {...stringAvatar(`${datosUsuario.nombre}` + " " + `${datosUsuario.apellido}`) }/> : <BotonInicioSesion/>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
