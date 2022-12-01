import React from 'react';
import DatosUsuarioContextProvider from '../Context/DatosUsuarioContext';
import { Avatar, MenuItem, Menu } from '@mui/material';
import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';


const AvatarUsuario = () => {


  const {cambiarDatosUsuario, cambiarToken, cambiarIdUsuario, cambiarEstadoLogeado, cambiarGrupo} = useContext(DatosUsuarioContextProvider)
  var datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario'))
  var token = sessionStorage.getItem('token')
  var idUsuario = sessionStorage.getItem('idUsuario')
  var grupo =  sessionStorage.getItem('grupo')
  var estaLogeado = sessionStorage.getItem('estaLogeado')

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
      if (grupo == 2) {
        return {
          sx: {
            bgcolor: stringToColor(nombre),
          },
         
          children: `${nombre.split(' ')[0][0]}`,
        };
      } else {
        return {
          sx: {
            bgcolor: stringToColor(nombre),
          },
         
          children: `${nombre.split(' ')[0][0]}${nombre.split(' ')[1][0]}`,
        };
      }
      
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
      cambiarDatosUsuario([])
      cambiarIdUsuario(0)
      cambiarGrupo(0)
      window.location.reload()
    }


    const [foto, setFoto] = useState();

    function splitFileName(str) {
      return str.split("|")[1];
    }
  
  
    useEffect(() => {
      const traerFoto = async () => {
        const fetchedData = await axios.get(
          `https://comunidad-backend-v3.herokuapp.com/files`,
          {
            headers: {
              "type": "image/jpeg",
              "file": grupo == 2 ? splitFileName(datosUsuario.logo) : splitFileName(datosUsuario.foto),
            },
            responseType: 'blob'
          }
        );
  
        console.log(fetchedData)
        const imageBlob = new Blob([fetchedData.data], { type: "image/jpeg" });
        console.log(imageBlob)
        const virtualUrl = URL.createObjectURL(imageBlob);
        console.log(virtualUrl)
        setFoto(virtualUrl)
  
  
      }
      traerFoto();
    }, []);


  return (
    <Fragment>
    {
      grupo == 3
      ?
      <Avatar onClick={handleClick} src="https://cdn.discordapp.com/attachments/955646153297395722/1046571441262432257/hurlingham.png"/>
      
      :
      datosUsuario.foto != "path de la foto" ? <Avatar onClick={handleClick} src={foto} sx={{backgroundColor:"white"}}/>:<Avatar onClick={handleClick} {...stringAvatar(`${datosUsuario.nombre}` + " " + `${datosUsuario.apellido}`)  }/>
    }
    <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {grupo == 1 ? <Link to="/miPerfil" style={{textDecoration:'none', color:'black'}}><MenuItem>Perfil</MenuItem></Link> : null}
        {grupo == 2 ? <Link to="/perfilEmpresa" style={{textDecoration:'none', color:'black'}}><MenuItem>Perfil Empresa</MenuItem></Link> : null}
        {grupo == 3 ? <Link to="/admin" style={{textDecoration:'none', color:'black'}}> <MenuItem>Panel Administrador</MenuItem></Link> : null}
        <MenuItem onClick={cerrarSesion}>Cerrar Sesión</MenuItem>
      </Menu></Fragment>
    );
}
 
export default AvatarUsuario;