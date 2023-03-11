import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useRef } from 'react';
import CircleIcon from '@mui/icons-material/Circle';


export default function ListaPostulantesDeOfertaAdmin({ postulantes }) {


    const pdf = useRef();
  
    var token = sessionStorage.getItem('token')
  
    function timeoutReload() {
      setTimeout(function () { window.location.reload() }, 1000);
    }
    const aceptarPostulacion = async (idPostulacion) => {
        
      var data = {
		estado: 1
      };
      Swal.fire({
        icon: 'warning',
        title: '¿Desea aceptar la postulación?',
        showCancelButton: true,
        confirmButtonText: `Aceptar`,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await fetch(`https://comunidad-backend-v3.herokuapp.com/postulaciones/${idPostulacion}?authorization=${token}`, {
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
            title: `El postulante fue aceptado correctamente`,
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

    const rechazarPostulacion = async (idPostulacion) => {
        var data = {
        estado: 3
        };
        Swal.fire({
        icon: 'warning',
        title: '¿Desea rechazar la postulación?',
        showCancelButton: true,
        confirmButtonText: `Aceptar`,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
        }).then(async (result) => {
        if (result.isConfirmed) {
            try {
            await fetch(`https://comunidad-backend-v3.herokuapp.com/postulaciones/${idPostulacion}?authorization=${token}`, {
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
            title: `El postulante fue rechazado correctamente`,
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
  
  
    function splitFileName(str) {
      return str.split("|")[1];
    }
  
  
    const traerPdf = async (cvPostulante) => {
      const fetchedData = await axios.get(
        `https://comunidad-backend-v3.herokuapp.com/files`,
        {
          headers: {
            "Content-Type": "application/json",
            "type": "application/pdf",
            "file": splitFileName(cvPostulante),
            "authorization": token
          },
          responseType: 'blob'
        }
      );
  
      console.log(fetchedData);
      const pdfBlob = new Blob([fetchedData.data], { type: "application/pdf" });
      console.log(pdfBlob);
      const virtualUrl = URL.createObjectURL(pdfBlob);
      console.log(virtualUrl);
      pdf.current = virtualUrl
      console.log(pdf)
    };
  
  
  
    async function abrirPdf(cvPostulante) {
      await traerPdf(cvPostulante);
      window.open(pdf.current);
    }
  
  
  
  
  
    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><Typography variant='h6'>Nombre</Typography></TableCell>
                <TableCell align="center"><Typography variant='h6'>DNI</Typography></TableCell>
                <TableCell align="center"><Typography variant='h6'>Telefono</Typography></TableCell>
                <TableCell align="center"><Typography variant='h6'>CV</Typography></TableCell>
                <TableCell align="center"><Typography variant='h6'>Estado</Typography></TableCell>
                <TableCell align="center"><Typography variant='h6'>Acciones</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {postulantes.map((postulantes) => (
                <TableRow
  
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {postulantes.Postulante.nombre} {postulantes.Postulante.apellido}
                  </TableCell>
                  <TableCell align="center"><Typography variant="body1">{postulantes.Postulante.id}</Typography></TableCell>
                  <TableCell align="center"><Typography variant="body1"></Typography>{postulantes.Postulante.telefono}</TableCell>
                  <TableCell align="center"><Button onClick={async () => abrirPdf(postulantes.Postulante.cv)}><PictureAsPdfIcon color="error" /></Button></TableCell>
                  <TableCell align="center">
                    <Box>{ 
                        postulantes.Estado.id == 1 ? <CircleIcon color="success"  /> : postulantes.Estado.id == 2 ? <CircleIcon color= "warning"  /> : <CircleIcon color="error" /> 
                    } <Typography variant="body1">{postulantes.Estado.nombre_estado}</Typography>
                    </Box>
                    </TableCell>
                  <TableCell align="center">
                    <Link to={`/postulantes/${postulantes.Postulante.id}`} style={{ textDecoration: 'none' }}>
                      <Button variant="contained" color='relaxed' sx={{ margin: "0.5rem" }}>
                        Ver
                      </Button>
                    </Link>
  
                    { postulantes.Estado.id === 2 ? <><Button variant='contained' color='secondary' onClick={() => aceptarPostulacion(postulantes.id)} sx={{ margin: "0.5rem" }}>Aceptar</Button>
                    <Button variant='contained' color='error' onClick={() => rechazarPostulacion(postulantes.id)} sx={{ margin: "0.5rem" }}>Rechazar</Button></> : 
                    <><Button disabled variant='contained' color='secondary' onClick={() => aceptarPostulacion(postulantes.id)} sx={{ margin: "0.5rem" }}>Aceptar</Button>
                    <Button disabled variant='contained' color='error' onClick={() => rechazarPostulacion(postulantes.id)} sx={{ margin: "0.5rem" }}>Rechazar</Button> </>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }