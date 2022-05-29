import '../App.css';
import React from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Header = () => {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  return ( 
    <div>
      <Box className='header' sx= {{display:"flex", backgroundColor:"#ADC98F", paddingTop:"1rem", paddingBottom:"1rem", width:"100%"}}>
        <img className='logo' style={{width: "300px" ,display:"flex" , maxWidth:"300px", margin:"1rem", padding:"1rem"}} src="http://comunidad-de-trabajo.unahur.edu.ar/static/media/logoComunidadDeTrabajo.b8bf300b.svg"></img>
        <h1 style={{display:"flex"}}>Ofertas</h1>
      </Box>

    </div>
   );
}
 
export default Header;
