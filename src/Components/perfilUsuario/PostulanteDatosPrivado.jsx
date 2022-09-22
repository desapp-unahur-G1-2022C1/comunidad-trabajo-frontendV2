import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Header from '../Header';
import { Box, Typography, Button } from '@mui/material';
import { useState } from 'react';
import DatosUsuarioContextProvider from '../../Context/DatosUsuarioContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

export default function DividerText() {
  const {cambiarDatosUsuario, cambiarToken, cambiarIdUsuario, cambiarEstadoLogeado, cambiarGrupo} = useContext(DatosUsuarioContextProvider)
  var datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario'))
  var token = sessionStorage.getItem('token')
  var idUsuario = sessionStorage.getItem('idUsuario')
  var grupo =  sessionStorage.getItem('grupo')
  var estaLogeado = sessionStorage.getItem('estaLogeado')

  axios.get(`https://comunidad-backend-v3.herokuapp.com/postulantes/idUsuario/${datosUsuario.Usuario.id}`)
            .then(({data}) => {
                    cambiarDatosUsuario(data)
                    console.log(data)
  })

  const content = (
    <div>
      {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
   Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
   Sed malesuada lobortis pretium.`}
    </div>
  );
  
  return (
    <React.Fragment>
    <Header/>
    <Box sx={{display:'flex', justifyContent:'center', marginTop:'1rem'}}>
    <Link to='/miPerfil/misDatos/editar' style={{ textDecoration: 'none'}}>
    <Button variant="contained">Editar</Button>
    </Link>
    </Box>
    <Typography style={{margin:"2rem"}}>
    <Root>
      <Divider>
        <Chip sx={{backgroundColor:'#009688', color:'#ffffff'}} label="SOBRE EL POSTULANTE" />
      </Divider>
      <Box>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Nombre:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{datosUsuario.nombre} {datosUsuario.apellido}</Typography>
        </Typography>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Fecha de nacimiento:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{datosUsuario.fecha_nac}</Typography>
        </Typography>
      </Box>
      <Divider>
        <Chip sx={{backgroundColor:'#009688', color:'#ffffff'}} label="CONTACTO" />
      </Divider>
      <Box>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">email:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{datosUsuario.Usuario.usuario}</Typography>
        </Typography>
        <Typography sx={{display:'flex', justifyContent:'center'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Numero de contecto:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{datosUsuario.telefono}</Typography>
        </Typography>
      </Box>
      <Divider>
        <Chip sx={{backgroundColor:'#009688', color:'#ffffff'}} label="UBICACION" />
      </Divider>
      <Box>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Pais:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{datosUsuario.pais}</Typography>
        </Typography>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Provincia:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{datosUsuario.provincia}</Typography>
        </Typography>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Ciudad:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{datosUsuario.ciudad}</Typography>
        </Typography>
      </Box>
    </Root>
    </Typography>
    </React.Fragment>
  );
  
}