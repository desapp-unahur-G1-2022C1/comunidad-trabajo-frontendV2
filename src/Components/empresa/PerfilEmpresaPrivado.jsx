import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { Avatar, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Header from '../Header';
import { Link } from "react-router-dom";

export default function PerfilEmpresa() {

  return (
    <React.Fragment>
      
      <Box>
        <Box sx={{display:"flex", justifyContent:"flex-start", alignContent:"center"}}>
            <Box>
                <Stack direction="row" spacing={2} sx={{padding:"1rem"}}>
                    <Avatar src="/broken-image.jpg" sx={{height:"8rem", width:"8rem"}}/>
                </Stack>
            </Box>
            <Box sx={{padding:"1rem"}}>
                <h1 style={{display:"flex"}}>Nombre de la empresa</h1>
                <h3 style={{display:"flex"}}>....</h3>
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