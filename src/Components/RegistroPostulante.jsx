import { Box, TextField, Button } from '@mui/material'
import React, { Fragment } from 'react'
import Header from './Header'
import '../App.css';
import { width } from '@mui/system';


export default function RegistroPostulante() {
  return (
      <Fragment>
          <Header/>
          
          <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", margin:"1rem" , maxWidth:"400px"}}>
            <TextField className='campos'
                variant="outlined"
                label="Nombre"
                required 
                sx={{margin:"8px"}}
            />
            <TextField
            className='campo'
                variant='outlined'
                label="Apellido"
                required
                sx={{margin:"8px"}}
                />
            <TextField
            className='campo'
                variant='outlined'
                label="email"
                required
                sx={{margin:"8px"}}/>
            <TextField
            className='campo'
                variant='outlined'
                label="DNI"
                required
                sx={{margin:"8px"}}/>
            <TextField
            className='campo'
                variant='outlined'
                label="Fecha Nacimiento"
                required
                sx={{margin:"8px"}}
                />
            <TextField
            className='campo'
                variant='outlined'
                label="Nacionalidad"
                required
                sx={{margin:"8px"}}/>    
            <TextField
            className='campo'
                variant='outlined'
                label="Provincia"
                required
                sx={{margin:"8px"}}
                />
            <TextField
            className='campo'
                variant='outlined'
                label="Localidad"
                required
                sx={{margin:"8px"}}/>
            <Button variant='contained' sx={{margin:"8px"}}>Siguiente paso</Button>
          </Box>
              
      </Fragment>
  )
}
