import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Header from '../Header';
import { Box, Typography, Button } from '@mui/material';
import { useState } from 'react';

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

export default function DividerText() {
  const content = (
    <div>
      {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
   Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
   Sed malesuada lobortis pretium.`}
    </div>
  );

  const [nombre, setNombreEmpresa] = useState();
  const [descripcion, setDescripcion] = useState();
  const [email, setEmail] = useState();
  const [telefono, setTelefono] = useState();
  const [web, setWeb] = useState();
  const [pais, setPais] = useState();
  const [provincia, setProvincia] = useState();
  const [ciudad, setCiudad] = useState();
  const API_URL = `https://comunidad-de-trabajo.herokuapp.com/empresas/`;

  const descripcionAPI = async () => {
    try {
      const api = await fetch(API_URL);
      const datos = await api.json();
      setNombreEmpresa(datos.empresas[0].nombre_empresa);
      setDescripcion(datos.empresas[0].descripcion);
      setEmail(datos.empresas[0].email_representante);
      setTelefono(datos.empresas[0].telefono);
      setWeb(datos.empresas[0].web);
      setPais(datos.empresas[0].pais);
      setProvincia(datos.empresas[0].provincia);
      setCiudad(datos.empresas[0].ciudad);
    } catch (error) {
      console.log(error);
    }
  };
  descripcionAPI();
  return (
    <React.Fragment>
    <Header/>
    <Box sx={{display:'flex', justifyContent:'center', marginTop:'1rem'}}>
    <Button variant="contained">Editar</Button>
    </Box>
    <Typography style={{margin:"2rem"}}>
    <Root>
      <Divider>
        <Chip sx={{backgroundColor:'#009688', color:'#ffffff'}} label="SOBRE LA EMPRESA" />
      </Divider>
      <Box>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Nombre:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{nombre}</Typography>
        </Typography>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Descripcion:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{descripcion}</Typography>
        </Typography>
      </Box>
      <Divider>
        <Chip sx={{backgroundColor:'#009688', color:'#ffffff'}} label="CONTACTO" />
      </Divider>
      <Box>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Email del representante:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{email}</Typography>
        </Typography>
        <Typography sx={{display:'flex', justifyContent:'center'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Numero de contecto:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{telefono}</Typography>
        </Typography>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Pagina web:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{web}</Typography>
        </Typography>
      </Box>
      <Divider>
        <Chip sx={{backgroundColor:'#009688', color:'#ffffff'}} label="UBICACION" />
      </Divider>
      <Box>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Pais:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{pais}</Typography>
        </Typography>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Provincia:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{provincia}</Typography>
        </Typography>
        <Typography sx={{display:'flex', justifyContent:'center', margin:'2rem'}}>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">Ciudad:</Typography>
            <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">{ciudad}</Typography>
        </Typography>
      </Box>
    </Root>
    </Typography>
    </React.Fragment>
  );
  
}