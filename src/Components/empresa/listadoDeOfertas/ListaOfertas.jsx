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
import { useState } from 'react';

export default function ListaOfertas({Ofertas}) {

  





  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><Typography variant='h6'>Titulo</Typography></TableCell>
            <TableCell align="left"><Typography variant='h6'>Empresa</Typography></TableCell>
            <TableCell align="left"><Typography variant='h6'>Estado</Typography></TableCell>
            <TableCell align="left"><Typography variant='h6'>Cantidad de Postulantes</Typography></TableCell>
            <TableCell align="left"><Typography variant='h6'>Acciones</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Ofertas.map((oferta) => (
            <TableRow
              
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {oferta.titulo_oferta}
              </TableCell>
              <TableCell align="left"><Typography variant="body1">{oferta.Empresa.nombre_empresa}</Typography></TableCell>
              <TableCell align="left"><Typography variant="body1"></Typography>{oferta.Estado.nombre_estado}</TableCell>
              <TableCell align="left"><Typography variant="body1"></Typography></TableCell>
              <TableCell align="left">
                <Link to={`/oferta/${oferta.id}`} style={{textDecoration:'none'}}>
                  <Button variant="contained" color='relaxed'sx={{margin:"0.5rem"}}>
                    Ver
                  </Button>
                </Link>
                <Link to={`/ListadoDePostulantes/${oferta.id}`} style={{ textDecoration: 'none'}}>
                    <Button
                      size="large"
                      variant="contained"
                      color="relaxed"
                    >
                      Ver postulantes
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