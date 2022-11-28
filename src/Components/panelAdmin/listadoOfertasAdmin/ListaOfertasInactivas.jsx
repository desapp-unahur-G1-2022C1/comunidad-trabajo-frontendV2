import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function ListaOfertas({ofertas}) {
  const activar = async (idOferta) => {
    var data = {
      idEstado: 1
    };
      await fetch(`https://comunidad-backend-v3.herokuapp.com/ofertas/idOferta/${idOferta}`, {
      method: "PUT", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
      
      })
      Swal.fire({
        icon: 'success',
        title: 'La oferta fue aceptada exitosamente',
        confirmButtonText: 'Finalizar',
        text: 'Para continuar pulse el boton',
        footer: '',
        showCloseButton: true
      })
      .then(
        window.location.reload()
      )
      .catch((error) => console.error("Error:", error,
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error al aceptar la oferta',
        confirmButtonText: 'Volver',
        text: 'Verifique sus datos',
        footer: '',
        showCloseButton: true
      })),)
  }
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
                <Button variant="contained" color='relaxed'sx={{margin:"0.5rem"}} onClick={async ()=> activar(oferta.id)}>Aceptar</Button>
              <Button variant="outlined" color='error'sx={{margin:"0.5rem"}}>Suspender</Button></TableCell>
              
            </TableRow>
          ))} 
        </TableBody>
      </Table>
    </TableContainer>
  );
}