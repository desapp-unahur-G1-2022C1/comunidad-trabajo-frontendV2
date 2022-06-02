import { Typography, Box, Button } from '@mui/material';

import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

const RegistroPregunta = () => {
    return ( 
        <Fragment>
            <Box sx={{display:"flex", justifyContent:"center", margin:"1rem"}}>

                <Typography variant="h5">
                    Seleccione tipo de cuenta
                </Typography>
            </Box>
            <Box sx={{display:"flex", justifyContent:"center", margin:"1rem"}}>
                <Link exact to='/miperfil'><Button variant="contained" size="medium" color="secondary"sx={{margin:"1rem"}}>
                    Empresa
                </Button>
                </Link>
                <Button variant="contained" size="medium" color="secondary" sx={{margin:"1rem"}}>
                    Postulante
                </Button>
                
            </Box>

            
        </Fragment>
     );
}
 
export default RegistroPregunta;