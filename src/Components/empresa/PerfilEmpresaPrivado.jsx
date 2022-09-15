import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { Avatar, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Header from '../Header';
import { Link } from "react-router-dom";
import DatosUsuarioContextProvider from '../../Context/DatosUsuarioContext';
import { useContext } from 'react';
import axios from 'axios';

export default function PerfilEmpresa() {
  const {cambiarDatosUsuario, cambiarToken, cambiarIdUsuario, cambiarEstadoLogeado, cambiarGrupo} = useContext(DatosUsuarioContextProvider)
  var datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario'))
  var token = sessionStorage.getItem('token')
  var idUsuario = sessionStorage.getItem('idUsuario')
  var grupo =  sessionStorage.getItem('grupo')
  var estaLogeado = sessionStorage.getItem('estaLogeado')
  axios.get(`https://comunidad-backend-v3.herokuapp.com/empresas/idUsuario/${idUsuario}`)
            .then(({data}) => {
                    cambiarDatosUsuario(data)})
  return (
    <React.Fragment>
      <Header/>
      <Box>
        <Box sx={{display:"flex", justifyContent:"flex-start", alignContent:"center"}}>
            <Box>
                <Stack direction="row" spacing={2} sx={{padding:"1rem"}}>
                    <Avatar src="/broken-image.jpg" sx={{height:"8rem", width:"8rem"}}/>
                </Stack>
            </Box>
            <Box sx={{padding:"1rem"}}>
                <h1 style={{display:"flex"}}>{datosUsuario.nombre_empresa}</h1>
                <h3 style={{display:"flex"}}>{datosUsuario.web}</h3>
            </Box>
        </Box>
        <Box sx={{display:"flex", justifyContent:"center", padding:"1rem"}}>
        <Link to="/empresaDatosPrivado" style={{ textDecoration: 'none'}}>
          <Button variant="contained" sx={{width:"25rem"}} >Datos</Button>
        </Link>
        </Box>
        <Box sx={{display:"flex", justifyContent:"center", padding:"1rem"}}>
        <Link to="/listadoOfertasEmpresa" style={{ textDecoration: 'none'}}>
          <Button variant="contained" sx={{width:"25rem"}} >Ver ofertas</Button>
        </Link>
        </Box>
        <Box sx={{display:"flex", justifyContent:"center" , padding:"1rem"}}>
        <Link to="/RegistroOferta" style={{ textDecoration: 'none'}}>
          <Button variant="contained" sx={{width:"25rem"}} >Crear oferta</Button>
        </Link>
        </Box>
      </Box>
    </React.Fragment>
  );
}