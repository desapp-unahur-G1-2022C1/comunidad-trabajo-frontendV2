import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import { Avatar, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Header from '../Header';
import { Link } from "react-router-dom";
import DatosUsuarioContextProvider from '../../Context/DatosUsuarioContext';
import { useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useRef } from 'react';
import { AddAPhoto } from '@mui/icons-material';



export default function PerfilEmpresa() {
  const { cambiarDatosUsuario, cambiarToken, cambiarIdUsuario, cambiarEstadoLogeado, cambiarGrupo } = useContext(DatosUsuarioContextProvider)
  var datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario'))
  var token = sessionStorage.getItem('token')
  var idUsuario = sessionStorage.getItem('idUsuario')
  var grupo = sessionStorage.getItem('grupo')
  var estaLogeado = sessionStorage.getItem('estaLogeado')



  const [logo, setLogo] = useState();
  const uploadLogo = useRef()
  const [llamado, setLlamado] = useState(false)


  async function actualizarDatos() {
    if (llamado == false) {

      await axios.get(`https://comunidad-backend-v3.herokuapp.com/empresas/idUsuario/${idUsuario}?`)
        .then(({ data }) => {
          cambiarDatosUsuario(data)
        })
      setLlamado(true)
    }
  }
  actualizarDatos()

  function timeoutReload() {
    setTimeout(function () { window.location.reload() }, 2000);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('uploadLogo', uploadLogo.current);
    try {
      const res = await axios({
        method: "post",
        url: `https://comunidad-backend-v3.herokuapp.com/files/logo/?authorization=${token}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          "id": datosUsuario.id
        },
      })
      Swal.fire({
        icon: 'success',
        title: 'Su logo fue actualizado correctamente',
        confirmButtonText: 'Finalizar',
        text: 'Para continuar pulse finalizar',
        showCloseButton: true
      })
        .then(async function (result) {
          if (result.value) {
            await axios.get(`https://comunidad-backend-v3.herokuapp.com/empresas/cuit/${datosUsuario.id}?`)
              .then(({ data }) => {
                console.log(data)
                sessionStorage.setItem('datosUsuario', JSON.stringify(data));
                timeoutReload()
              })
          }
        });
    } catch (err) {
      console.log(err);
    }
  }




  const handleFileSelect = (e) => {
    uploadLogo.current = e.target.files[0];
    handleSubmit(e)
  }

  function splitFileName(str) {
    return str.split("|")[1];
  }

  useEffect(() => {
    const traerLogo = async () => {
      const fetchedData = await axios.get(
        `https://comunidad-backend-v3.herokuapp.com/files`,
        {
          headers: {
            "type": "image/png",
            "file": splitFileName(datosUsuario.logo),
            "authorization": token
          },
          responseType: 'blob'
        }
      );

      console.log(fetchedData)
      const imageBlob = new Blob([fetchedData.data], { type: "image/png" });
      console.log(imageBlob)
      const virtualUrl = URL.createObjectURL(imageBlob);
      console.log(virtualUrl)
      setLogo(virtualUrl)


    }
    traerLogo();
  }, []);


  return (
    <React.Fragment>
      <Header />
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-start", alignContent: "center" }}>
          <Box>
            <Stack direction="row" spacing={1} sx={{ padding: "1rem" }}>
              <Avatar
                src={logo}
                sx={{ height: "8rem", width: "8rem", border: "4px solid", borderColor: "primary.main" }}
              />

              <form >
                <label for="uploadLogo">
                  <AddAPhoto color="primary" className='botonCambioFoto' />
                </label>
                <input type="file" id="uploadLogo" onChange={handleFileSelect} style={{ display: "none" }} />


              </form>
            </Stack>
          </Box>
          <Box sx={{ padding: "1rem" }}>
            <h1 style={{ display: "flex" }}>{datosUsuario.nombre_empresa}</h1>
            <h3 style={{ display: "flex" }}>{datosUsuario.web}</h3>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
          <Link to="/empresaDatosPrivado" style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{ width: "25rem" }} >Datos</Button>
          </Link>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
          <Link to="/listadoOfertasEmpresa" style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{ width: "25rem" }} >Ver ofertas</Button>
          </Link>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
          <Link to="/RegistroOferta" style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{ width: "25rem" }} >Crear oferta</Button>
          </Link>
        </Box>
      </Box>
    </React.Fragment>
  );
}