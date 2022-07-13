import { Typography } from '@mui/material';
import React from 'react'
import { Fragment } from 'react';
import BarraBusqueda from './BarraBusqueda';
import Box from '@mui/material/Box';
import { useState } from 'react';


const BusquedaNoEncontrada = () => {

    

    return ( 
        <Fragment >
            <Box sx={{ display: "flex", justifyContent:"center", flexDirection:"column", padding:"2rem"}}>
                
                <Typography variant="h4" sx={{display:"flex", justifyContent:"center"}} >
                    Ups, no encontramos lo que estabas buscando.
                </Typography>
                <Typography variant="h5" sx={{display:"flex", justifyContent:"center"}}>
                    Probá usando otras palabras en el cuadro de búsqueda
                </Typography>
            </Box>

        </Fragment>
     );
}
 
export default BusquedaNoEncontrada;