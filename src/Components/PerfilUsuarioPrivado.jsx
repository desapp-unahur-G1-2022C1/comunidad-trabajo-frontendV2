import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { Avatar, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Header from './Header'

export default function PerfilUsuario() {

  return (
    <React.Fragment>
      <Header/>
      <Box>
        <Box sx={{display:"flex", justifyContent:"flex-start", alignContent:"center"}}>
            <Box>
                <Stack direction="row" spacing={2} sx={{padding:"1rem"}}>
                    <Avatar src="/broken-image.jpg" sx={{height:"8rem", width:"8rem"}}/>
                </Stack>
            </Box>
            <Box sx={{padding:"1rem"}}>
                <h1 style={{display:"flex"}}>Nombre y Apellido</h1>
                <h3 style={{display:"flex"}}>Desarrollador Junior</h3>
            </Box>
        </Box>
        <Box sx={{display:"flex", justifyContent:"center", padding:"1rem"}}>
          <Button variant="contained" sx={{width:"25rem"}}>Datos personales</Button>
        </Box>
        <Box sx={{display:"flex", justifyContent:"center", padding:"1rem"}}>
          <Button variant="contained" sx={{width:"25rem"}}>Datos academicos</Button>
        </Box>
        <Box sx={{display:"flex", justifyContent:"center" , padding:"1rem"}}>
          <Button variant="contained" sx={{width:"25rem"}}>CV</Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}