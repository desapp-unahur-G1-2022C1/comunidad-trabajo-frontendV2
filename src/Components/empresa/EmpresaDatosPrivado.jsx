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
  let datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario'))
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
    <Box sx={{display:'flex', justifyContent:'center', marginTop:'1rem'}}>
    <Link to='/edicionEmpresa' style={{ textDecoration: 'none'}}>
    <Button variant="contained">Editar</Button>
    </Link>
    </Box>
    <Typography style={{margin:"2rem"}}>
    <Root>
      <Divider>
        <Chip sx={{backgroundColor:'#009688', color:'#ffffff'}} label="SOBRE LA EMPRESA" />
      </Divider>
      <Box>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Nombre:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{datosUsuario.nombre_empresa}</Typography>
        </Typography>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Descripcion:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{datosUsuario.descripcion}</Typography>
        </Typography>
      </Box>
      <Divider>
        <Chip sx={{backgroundColor:'#009688', color:'#ffffff'}} label="CONTACTO" />
      </Divider>
      <Box>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Email del representante:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{datosUsuario.email_representante}</Typography>
        </Typography>
        <Typography sx={{display:'flex', justifyContent:'center'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Numero de contecto:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">+54 9 {datosUsuario.telefono}</Typography>
        </Typography>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Pagina web:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{datosUsuario.web}</Typography>
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
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{datosUsuario.Provincia.nombre}</Typography>
        </Typography>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Ciudad:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{datosUsuario.Ciudad.nombre}</Typography>
        </Typography>
      </Box>
    </Root>
    </Typography>
    </React.Fragment>
  );
  
}