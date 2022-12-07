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
import CircleIcon from '@mui/icons-material/Circle';
import { Box } from '@mui/system';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function ListaOfertas({ Ofertas }) {


  var token = sessionStorage.getItem('token')
  const finalizar = async (idOferta) => {
    var data = {
      idEstado: 5
    };

    Swal.fire({
      icon: 'warning',
      title: `¿Deseas finalizar la oferta?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, finalizar!',
      cancelButtonText: 'No, cancelar'
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
            `La oferta fue finalizada correctamente`,
            'success'
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
            <TableCell><Typography variant='h6'>Titulo</Typography></TableCell>
            <TableCell align="center"><Typography variant='h6'>Empresa</Typography></TableCell>
            <TableCell align="center"><Typography variant='h6'>Estado</Typography></TableCell>
            <TableCell align="center"><Typography variant='h6'>Acciones</Typography></TableCell>
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
              <TableCell align="center"><Typography variant="body1">{oferta.Empresa.nombre_empresa}</Typography></TableCell>
              <TableCell align="center">
                <Box sx={{}}>
                  {oferta.Estado.id == 1 ?
                    <CircleIcon color="success" /> : oferta.Estado.id == 2 ? <CircleIcon color="warning" /> : oferta.Estado.id == 5 ? <CircleIcon /> : <CircleIcon color="error" />}
                  <Typography variant="body1" >{oferta.Estado.nombre_estado}</Typography>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Link to={`/oferta/${oferta.id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color='relaxed' sx={{ margin: "0.5rem" }}>
                    Ver
                  </Button>
                </Link>
                <Link to={`/ListadoDePostulantes/${oferta.id}`} style={{ textDecoration: 'none' }}>
                  <Button

                    variant="outlined"
                    color="relaxed"
                  >
                    Ver postulantes
                  </Button>
                </Link>
                {oferta.Estado.id != 5 ? <Button variant="outlined" color='error' sx={{ margin: "0.5rem" }} onClick={async () => finalizar(oferta.id)}>
                  Finalizar
                </Button> :
                  <Button disabled variant="contained" color='relaxed' sx={{ margin: "0.5rem" }}>
                    Finalizar
                  </Button>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}