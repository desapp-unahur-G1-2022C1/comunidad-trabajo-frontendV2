import * as React from 'react';
import Box from '@mui/material/Box';
import CargaCV from './CargaCV'
import Header from './Header'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function AccountMenu() {

  return (
    <Box>
        <Header></Header>
        <Box sx={{padding:"3rem", justifyContent:'center'}}>
          <CargaCV ></CargaCV>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center"}}>
            <Link style={{textDecoration:'none'}} to="/">
              <Button variant="contained" color="relaxed">
                Finalizar
              </Button>
            </Link>
          </Box>
    </Box>
  );
}