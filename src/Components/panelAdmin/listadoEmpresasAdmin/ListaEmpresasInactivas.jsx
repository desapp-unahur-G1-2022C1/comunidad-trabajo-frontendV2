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

export default function ListaEmpresas({ empresas }) {

  var token = sessionStorage.getItem('token')

  function activar(idEmpresa) {
    fetch(`https://comunidad-backend-v3.herokuapp.com/empresas/cuit/${idEmpresa}`,
      {
        method: 'PATCH', // or 'PUT'
        headers: {
          "Content-Type": "application/json"
        }
      })
    Swal.fire({
      icon: 'success',
      title: 'La empresa fue activada exitosamente',
      confirmButtonText: 'Finalizar',
      text: 'Para continuar pulse el boton',
      footer: '',
      showCloseButton: true,
    })
      .catch((err) => console.error("Error:", err,
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un error al activar la empresa',
          confirmButtonText: 'Volver',
          text: 'Verifique sus datos',
          footer: '',
          showCloseButton: true
        }))).then(
          window.location.reload()
        )
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><Typography variant='h6'>CUIT</Typography></TableCell>
            <TableCell align="center"><Typography variant='h6'>Nombre</Typography></TableCell>
            <TableCell align="center"><Typography variant='h6'>Representante</Typography></TableCell>
            <TableCell align="center"><Typography variant="h6">Email</Typography></TableCell>
            <TableCell align="center"><Typography variant='h6'>Acciones</Typography></TableCell>
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
              <TableCell align="center"><Typography variant="body1">{empresa.nombre_empresa}</Typography></TableCell>
              <TableCell align="center"><Typography variant="body1">{empresa.nombre_representante}</Typography></TableCell>
              <TableCell align="center"><Typography variant="body1">{empresa.email_representante}</Typography></TableCell>
              <TableCell align="center">
                <Button variant="contained" color='relaxed' sx={{ margin: "0.5rem" }} onClick={async () => activar(empresa.id)}>Activar</Button>
                <Link style={{ textDecoration: "none" }} to={`/empresa/${empresa.id}`}>
                  <Button variant="contained" color='relaxed' sx={{ margin: "0.5rem" }}>Ver empresa</Button>
                </Link>

              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}