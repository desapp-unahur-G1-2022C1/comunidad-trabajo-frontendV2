import * as React from 'react';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box"
import {Link} from "react-router-dom"

const BotonInicioSesion = () => {
  return (    
  <Box>
    <Link to="/login" style={{ textDecoration: "none"}}><Button variant="contained" color="relaxed" size='small'>
      Iniciar Sesion
    </Button></Link>

  </Box> 
  );
}
 
export default BotonInicioSesion;

