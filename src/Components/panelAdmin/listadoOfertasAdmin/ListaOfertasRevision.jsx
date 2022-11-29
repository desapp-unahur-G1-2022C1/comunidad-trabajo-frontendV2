import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ListaOfertas({ofertas}) {
 
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><Typography variant='h6'>ID Oferta</Typography></TableCell>
            <TableCell align="left"><Typography variant='h6'>Titulo</Typography></TableCell>
            <TableCell align="left"><Typography variant='h6'>Empresa</Typography></TableCell>
            <TableCell align="left"><Typography variant ="h6">Estado</Typography></TableCell>
            <TableCell align="left"><Typography variant='h6'>Acciones</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ofertas.map((oferta) => (
            <TableRow
              
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {oferta.id}
              </TableCell>
              <TableCell align="left"><Typography variant="body1">{oferta.titulo_oferta}</Typography></TableCell>
              <TableCell align="left"><Typography variant="body1"></Typography>{oferta.Empresa.nombre_empresa}</TableCell>
              <TableCell align="left"><Typography variant="body1">{oferta.Estado.nombre_estado}</Typography></TableCell>
              <TableCell align="left">
                <Link style={{textDecoration:"none"}} to={`/oferta/${oferta.id}`}><Button variant="contained" color="relaxed" sx={{margin:"0.5rem"}}>VER OFERTA</Button></Link>
              </TableCell>
              
            </TableRow>
          ))} 
        </TableBody>
      </Table>
    </TableContainer>
  );
}