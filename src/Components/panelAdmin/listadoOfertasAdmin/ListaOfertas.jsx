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
import Swal from 'sweetalert2';
import CircleIcon from '@mui/icons-material/Circle';
import { Box } from '@mui/system';



export default function ListaOfertas({ ofertas }) {



  var token = sessionStorage.getItem('token')
  const mandarARevision = async (idOferta, titulo) => {
    var data = {
      idEstado: 5
    };

    Swal.fire({
      icon: 'warning',
      title: `¿Deseas finalizar la oferta ${titulo}?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await fetch(`https://comunidad-backend-v3.herokuapp.com/ofertas/idOferta/${idOferta}?authorization=${token}`, {
              method: "PUT", // or 'PUT'
              body: JSON.stringify(data), // data can be `string` or {object}!
              headers: {
                "Content-Type": "application/json",
              },
            })
          } catch (error) {
            console.log(error)
          }
          Swal.fire(
            {
              icon: 'success',
              title: `La oferta fue finalizada correctamente`,
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
            <TableCell><Typography variant='h6'>ID Oferta</Typography></TableCell>
            <TableCell align="center"><Typography variant='h6'>Titulo</Typography></TableCell>
            <TableCell align="center"><Typography variant='h6'>Empresa</Typography></TableCell>
            <TableCell align="center"><Typography variant="h6">Estado</Typography></TableCell>
            <TableCell align="center"><Typography variant='h6'>Acciones</Typography></TableCell>
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
              <TableCell align="center"><Typography variant="body1">{oferta.titulo_oferta}</Typography></TableCell>
              <TableCell align="center"><Typography variant="body1"></Typography>{oferta.Empresa.nombre_empresa}</TableCell>
              <TableCell align="center">
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CircleIcon color='success' />
                  <Typography variant="body1">{oferta.Estado.nombre_estado}</Typography>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Link style={{ textDecoration: "none" }} to={`/oferta/${oferta.id}`}>
                  <Button variant="contained" color='relaxed' sx={{ margin: "0.5rem" }}>
                    VER OFERTA
                  </Button>
                </Link>
                <Link style={{ textDecoration: "none" }} to={`/admin/listadoPostulaciones/${oferta.id}`}>
                  <Button variant="contained" color='relaxed' sx={{ margin: "0.5rem" }}>
                    VER POSTULANTES
                  </Button>
                </Link>
                <Button variant="outlined" color='error' sx={{ margin: "0.5rem" }} onClick={async () => mandarARevision(oferta.id, oferta.titulo_oferta)} >
                  Finalizar
                </Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}