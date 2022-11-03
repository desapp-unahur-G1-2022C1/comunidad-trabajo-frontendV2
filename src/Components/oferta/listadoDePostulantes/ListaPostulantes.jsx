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

export default function ListaPostulantes({postulantes}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><Typography variant='h6'>Nombre</Typography></TableCell>
            <TableCell align="left"><Typography variant='h6'>DNI</Typography></TableCell>
            <TableCell align="left"><Typography variant='h6'>Telefono</Typography></TableCell>
            <TableCell align="left"><Typography variant='h6'>Acciones</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {postulantes.map((postulante) => (
            <TableRow
              
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {postulante.Postulante.nombre} {postulante.Postulante.apellido}
              </TableCell>
              <TableCell align="left"><Typography variant="body1">{postulante.Postulante.id}</Typography></TableCell>
              <TableCell align="left"><Typography variant="body1"></Typography>{postulante.Postulante.telefono}</TableCell>
              <TableCell align="left">
                <Link to={`/postulante/${postulante.Postulante.id}`} style={{textDecoration:'none'}}>
                  <Button variant="contained" color='relaxed'sx={{margin:"0.5rem"}}>
                    Ver
                  </Button>
                </Link>
                <Button variant="outlined" color='error'sx={{margin:"0.5rem"}}>Borrar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}