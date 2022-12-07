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
import axios from 'axios';
import Swal from 'sweetalert2';

export default function ListaOfertas({ Ofertas }) {

  var token = sessionStorage.getItem('token')

  const eliminarPostulacion = (id) => {


    Swal.fire({
      icon: 'warning',
      title: `¿Desea eliminar su postulacion a la oferta?`,
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((res) => {
      if (res.isConfirmed) {
        axios.delete(`https://comunidad-backend-v3.herokuapp.com/postulaciones/${id}?authorization=${token}`)
          .then(res => {
            console.log(res);
            console.log(res.data);
            Swal.fire('Eliminado!', '', 'success')
              .then((res) => {
                if (res.isConfirmed) {
                  window.location.reload();
                }
              }
              )
          })
      }
    })
  }











  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><Typography variant='h6'>ID Oferta</Typography></TableCell>
            <TableCell align="center"><Typography variant='h6'>Nombre</Typography></TableCell>
            <TableCell align="center"><Typography variant='h6'>Empresa</Typography></TableCell>
            <TableCell align="center"><Typography variant='h6'>Acciones</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Ofertas.map((oferta) => (
            <TableRow

              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {oferta.Oferta.id}
              </TableCell>
              <TableCell align="center"><Typography variant="body1">{oferta.Oferta.titulo_oferta}</Typography></TableCell>
              <TableCell align="center"><Typography variant="body1">{oferta.Empresa.nombre_empresa}</Typography></TableCell>
              <TableCell align="center">
                <Link to={`/oferta/${oferta.Oferta.id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color='relaxed' sx={{ margin: "0.5rem" }}>
                    Ver
                  </Button>
                </Link>
                <Button variant="outlined" color='error' sx={{ margin: "0.5rem" }} onClick={() => eliminarPostulacion(oferta.id)}> Eliminar </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}