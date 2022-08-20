import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import BotonInicioSesion from './home/BotonInicioSesion';
import DatosUsuarioContextProvider from '../Context/DatosUsuarioContext';
import { useContext } from 'react';
import AvatarUsuario from './AvatarUsuario';





const Header = () => {
  const {datosUsuario, cambiarDatosUsuario, token, cambiarToken, idUsuario, cambiarIdUsuario, estaLogeado, cambiarEstadoLogeado} = useContext(DatosUsuarioContextProvider)
  
 

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
          {estaLogeado ? <AvatarUsuario/> : <BotonInicioSesion/>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
