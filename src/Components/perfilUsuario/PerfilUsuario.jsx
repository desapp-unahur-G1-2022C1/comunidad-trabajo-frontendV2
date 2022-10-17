import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Avatar, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Header from '../Header'
import DatosUsuarioContextProvider from '../../Context/DatosUsuarioContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function PerfilUsuario() {
  const {cambiarDatosUsuario, cambiarToken, cambiarIdUsuario, cambiarEstadoLogeado, cambiarGrupo} = useContext(DatosUsuarioContextProvider)
  var datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario'))
  var token = sessionStorage.getItem('token')
  var idUsuario = sessionStorage.getItem('idUsuario')
  var grupo =  sessionStorage.getItem('grupo')
  var estaLogeado = sessionStorage.getItem('estaLogeado')
  

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
                <h1 style={{display:"flex"}}>{datosUsuario.nombre} {datosUsuario.apellido}</h1>
                <h3 style={{display:"flex"}}>Desarrollador Junior</h3>
            </Box>
        </Box>
        <Box sx={{display:"flex", justifyContent:"center", padding:"1rem"}}>
          <Link to='/miPerfil/misDatos' style={{ textDecoration: 'none'}}>
            <Button variant="contained" sx={{width:"25rem"}}>Datos personales</Button>
          </Link>
        </Box>
        <Box sx={{display:"flex", justifyContent:"center", padding:"1rem"}}>
          <Button variant="contained" sx={{width:"25rem"}}>Datos academicos</Button>
        </Box>
        <Box sx={{display:"flex", justifyContent:"center" , padding:"1rem"}}>
          <Button variant="contained" sx={{width:"25rem"}}>CV</Button>
        </Box>
        <Box sx={{display:"flex", justifyContent:"center" , padding:"1rem"}}>
          <Link to="/ofertasPostulante"style={{ textDecoration: 'none'}}>
            <Button variant="contained" sx={{width:"25rem"}}>Postulaciones</Button>
          </Link>
        </Box>
      </Box>
    </React.Fragment>
  );
}