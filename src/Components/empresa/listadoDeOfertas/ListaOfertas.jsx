import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';

export default function ListaOfertas({Ofertas}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><Typography variant='h6'>Titulo</Typography></TableCell>
            <TableCell align="left"><Typography variant='h6'>Empresa</Typography></TableCell>
            <TableCell align="left"><Typography variant='h6'>Email</Typography></TableCell>
            <TableCell align="left"><Typography variant='h6'>Acciones</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Ofertas.map((oferta) => (
            <TableRow
              
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {oferta.id}
              </TableCell>
              <TableCell align="left"><Typography variant="body1">{oferta.nombre} {oferta.apellido}</Typography></TableCell>
              <TableCell align="left"><Typography variant="body1">{oferta.Usuario.usuario}</Typography></TableCell>
              <TableCell align="left"><Button variant="contained" color='relaxed'sx={{margin:"0.5rem"}}>Ver</Button><Button variant="outlined" color='error'sx={{margin:"0.5rem"}}>Borrar</Button></TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}