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

  const activar = async (idEmpresa, nombre) => {
    var data = {
      idEstado: 1
    };

    Swal.fire({
      icon: 'warning',
      title: `¿Deseas activar la empresa ${nombre}?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Activar',
      cancelButtonText: 'Cancelar'
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await fetch(`https://comunidad-backend-v3.herokuapp.com/empresas/cuit/${idEmpresa}?authorization=${token}`, {
              method: "PUT", // or 'PUT'
              body: JSON.stringify(data), // data can be `string` or {object}!
              headers: {
                "Content-Type": "application/json",
              },
            })
          } catch (error) {
            console.log(error)
          }
          Swal.fire({
            icon: 'success',
            title: `La empresa fue aceptada correctamente`,
            confirmButtonText: 'Aceptar'
            
          }
          ).then(
            () => {
              window.location.reload()
            }
          )
        }
      })
  }
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
                <Button variant="contained" color='relaxed' sx={{ margin: "0.5rem" }} onClick={async () => activar(empresa.id, empresa.nombre_empresa)}>Activar</Button>
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