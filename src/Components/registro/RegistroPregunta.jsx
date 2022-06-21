import { Typography, Box, Button } from '@mui/material';

import React, { Fragment } from 'react'
import { Redirect, Link } from 'react-router-dom';
import Header from '../Header'

const RegistroPregunta = () => {
    return ( 
        <Fragment>
            <Header/>
            <Box sx={{display:"flex", justifyContent:"center", margin:"1rem"}}>

                <Typography variant="h5">
                    Seleccione tipo de cuenta
                </Typography>
            </Box>
            <Box sx={{display:"flex", justifyContent:"center", margin:"1rem"}}>
                <Link to="/registroEmpresa" style={{ textDecoration: 'none'}}><Button variant="contained" size="medium" color="relaxed" sx={{margin:"1rem"}}>
                    Empresa
                </Button></Link>
                    
                <Link to="/registroPostulante" style={{ textDecoration: 'none'}}><Button variant="contained" size="medium" color="relaxed" sx={{margin:"1rem"}}>
                    Postulante
                </Button></Link>
                
            </Box>

            
        </Fragment>
     );
}
 
export default RegistroPregunta;