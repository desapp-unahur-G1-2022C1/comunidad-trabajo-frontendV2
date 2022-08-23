import React from 'react';
import DatosUsuarioContextProvider from '../Context/DatosUsuarioContext';
import { Avatar, MenuItem, Menu } from '@mui/material';
import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';

const AvatarUsuario = () => {


  const {datosUsuario, grupo, cambiarToken, cambiarEstadoLogeado} = useContext(DatosUsuarioContextProvider)
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
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

    
    const handleClick = (event) => {
      
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
     
      setAnchorEl(null);
    };

    const cerrarSesion = () => {

      cambiarToken('')
      cambiarEstadoLogeado(false)
      setAnchorEl(null)
      history.push("/")
    }
  return (
    <Fragment>
    <Avatar onClick={handleClick} {...stringAvatar(`${datosUsuario.nombre}` + " " + `${datosUsuario.apellido}`)  }/>
    <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {grupo === 1 ? <Link to="/miPerfil"><MenuItem>Perfil</MenuItem></Link> : null}
        {grupo === 2 ? <Link to="/perfilEmpresa" ><MenuItem>Perfil Empresa</MenuItem></Link> : null}
        {grupo === 3 ? <Link to="/admin"> <MenuItem>Panel Administrador</MenuItem></Link> : null}
        <MenuItem onClick={cerrarSesion}>Cerrar Sesión</MenuItem>
      </Menu></Fragment>
    );
}
 
export default AvatarUsuario;