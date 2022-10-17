import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Header from '../Header';
import { Box, Typography, Button } from '@mui/material';
import { useState } from 'react';
import DatosUsuarioContextProvider from '../../Context/DatosUsuarioContext';
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}));
  
  export default function DividerText() {
    const { id } = useParams();
    const [nombreEmpresa, setNombreEmpresa] = useState()
    const [descripcionEmpresa, setDescripcionEmpresa] = useState()
    const [emailRepresentanteEmpresa, setEmailRepresentanteEmpresa] = useState()
    const [numContactoEmpresa, setNumContactoEmpresa] = useState()
    const [webEmpresa, setWebEmpresa] = useState()
    const [paisEmpresa, setPaisEmpresa] = useState()
    const [provinciaEmpresa, seProvinciaEmpresa] = useState()
    const [ciudadEmpresa, setCiudadEmpresa] = useState()
    axios.get(`https://comunidad-backend-v3.herokuapp.com/empresas/cuit/${id}`)
              .then(({data}) => {
                setNombreEmpresa(data.nombre_empresa)
                setDescripcionEmpresa(data.descripcion)
                setEmailRepresentanteEmpresa(data.email_representante)
                setNumContactoEmpresa(data.telefono)
                setWebEmpresa(data.web)
                setPaisEmpresa(data.pais)
                seProvinciaEmpresa(data.Provincia.nombre)
                setCiudadEmpresa(data.Ciudad.nombre)
              })
  return (
    <React.Fragment>
    <Header/>
    <Typography style={{margin:"2rem"}}>
    <Root>
      <Divider>
        <Chip sx={{backgroundColor:'#009688', color:'#ffffff'}} label="SOBRE LA EMPRESA" />
      </Divider>
      <Box>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Nombre:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{nombreEmpresa}</Typography>
        </Typography>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Descripcion:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{descripcionEmpresa}</Typography>
        </Typography>
      </Box>
      <Divider>
        <Chip sx={{backgroundColor:'#009688', color:'#ffffff'}} label="CONTACTO" />
      </Divider>
      <Box>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Email del representante:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{emailRepresentanteEmpresa}</Typography>
        </Typography>
        <Typography sx={{display:'flex', justifyContent:'center'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Numero de contecto:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">+54 9 {numContactoEmpresa}</Typography>
        </Typography>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Pagina web:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{webEmpresa}</Typography>
        </Typography>
      </Box>
      <Divider>
        <Chip sx={{backgroundColor:'#009688', color:'#ffffff'}} label="UBICACION" />
      </Divider>
      <Box>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Pais:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{paisEmpresa}</Typography>
        </Typography>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Provincia:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{provinciaEmpresa}</Typography>
        </Typography>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Ciudad:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{ciudadEmpresa}</Typography>
        </Typography>
      </Box>
    </Root>
    </Typography>
    </React.Fragment>
  );
  
}