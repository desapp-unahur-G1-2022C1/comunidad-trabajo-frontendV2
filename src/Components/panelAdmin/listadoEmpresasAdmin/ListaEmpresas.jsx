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

export default function ListaEmpresas({empresas}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><Typography variant='h6'>CUIT</Typography></TableCell>
            <TableCell align="left"><Typography variant='h6'>Nombre</Typography></TableCell>
            <TableCell align="left"><Typography variant='h6'>Representante</Typography></TableCell>
            <TableCell align="left"><Typography variant ="h6">Email</Typography></TableCell>
            <TableCell align="left"><Typography variant='h6'>Acciones</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {empresas.map((empresa) => (
            <TableRow
              
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {empresa.id}
              </TableCell>
              <TableCell align="left"><Typography variant="body1">{empresa.nombre_empresa}</Typography></TableCell>
              <TableCell align="left"><Typography variant="body1">{empresa.nombre_representante}</Typography></TableCell>
              <TableCell align="left"><Typography variant="body1">{empresa.email_representante}</Typography></TableCell>
              <TableCell align="left">
                <Link style={{textDecoration:"none"}} to={`/empresa/${empresa.id}`}>
                  <Button variant="contained" color='relaxed'sx={{margin:"0.5rem"}}>Ver empresa</Button>
                </Link>
                <Button variant="outlined" color='error'sx={{margin:"0.5rem"}}>Accion2</Button>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}