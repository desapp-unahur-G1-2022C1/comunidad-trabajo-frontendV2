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
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useState, useEffect } from 'react';
import { useRef } from 'react';



export default function ListaPostulantes({ postulantes }) {


  const pdf = useRef();

  var token = sessionStorage.getItem('token')

  function timeoutReload() {
    setTimeout(function () { window.location.reload() }, 1000);
  }
  const contactar = async (idPostulacion) => {

    var data = {
      contactado: true
    };
    Swal.fire({
      icon: 'warning',
      title: '¿Desea contactar al postulante?',
      showCancelButton: true,
      confirmButtonText: `Contactar`,
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
          title: `El postulante fue contactado correctamente`,
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
      `https://comunidad-backend-v3.herokuapp.com/files/?authorization=${token}`,
      {
        headers: {
          "Content-Type": "application/json",
          "type": "application/pdf",
          "file": splitFileName(cvPostulante)
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
              <TableCell align="center"><Typography variant='h6'>Contactado</Typography></TableCell>
              <TableCell align="center"><Typography variant='h6'>Acciones</Typography></TableCell>
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
                <TableCell align="center"><Typography variant="body1">{postulante.Postulante.id}</Typography></TableCell>
                <TableCell align="center"><Typography variant="body1"></Typography>{postulante.Postulante.telefono}</TableCell>
                <TableCell align="center"><Button onClick={async () => abrirPdf(postulante.Postulante.cv)}><PictureAsPdfIcon color="error" /></Button></TableCell>
                <TableCell align="center">
                  {postulante.contactado ? <CheckIcon color="success" /> : <CloseIcon color="error" />}</TableCell>
                <TableCell align="center">
                  <Link to={`/postulante/${postulante.Postulante.id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color='relaxed' sx={{ margin: "0.5rem" }}>
                      Ver
                    </Button>
                  </Link>

                  {postulante.contactado ? <Button variant="contained" color='info' sx={{ margin: "0.5rem" }} disabled >Contactar</Button> : <Button variant="contained" color='info' sx={{ margin: "0.5rem" }} onClick={async () => contactar(postulante.id)}  >Contactar</Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}