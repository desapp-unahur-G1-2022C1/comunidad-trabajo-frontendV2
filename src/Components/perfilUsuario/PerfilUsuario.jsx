import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Avatar, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Header from '../Header'
import DatosUsuarioContextProvider from '../../Context/DatosUsuarioContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { BorderAll } from '@mui/icons-material';


export default function PerfilUsuario() {
  const { cambiarDatosUsuario, cambiarToken, cambiarIdUsuario, cambiarEstadoLogeado, cambiarGrupo } = useContext(DatosUsuarioContextProvider)
  var datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario'))
  var token = sessionStorage.getItem('token')
  var idUsuario = sessionStorage.getItem('idUsuario')
  var grupo = sessionStorage.getItem('grupo')
  var estaLogeado = sessionStorage.getItem('estaLogeado')

  const [foto, setFoto] = useState();

  function splitFileName(str) {
    return str.split("|")[1];
  }


  useEffect(() => {
    const traerFoto = async () => {
      const fetchedData = await axios.get(
        `https://comunidad-backend-v3.herokuapp.com/files`,
        {
          headers: {
            "type": "image/jpeg",
            "file": splitFileName(datosUsuario.foto)
          },
          responseType: 'blob'
        }
      );

      console.log(fetchedData)
      const imageBlob = new Blob([fetchedData.data], { type: "image/jpeg" });
      console.log(imageBlob)
      const virtualUrl = URL.createObjectURL(imageBlob);
      console.log(virtualUrl)
      setFoto(virtualUrl)


    }
    traerFoto();
  }, []);
  return (

    <React.Fragment>
      <Header />
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
          <Box>
          <Stack direction="row" spacing={2} sx={{ padding: "1rem"}}>
              <Avatar
                src={foto}
                sx={{ height: "8rem", width: "8rem", border: "4px solid", borderColor: "primary.main" }}
              />
            </Stack>
          </Box>
          <Box sx={{ padding: "1rem" }}>
            <h1 style={{ display: "flex" }}>{datosUsuario.nombre} {datosUsuario.apellido}</h1>
            <h2 style={{ display: "flex" }}>{datosUsuario.Usuario.usuario}</h2>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
          <Link to='/miPerfil/misDatos' style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{ width: "25rem" }}>Datos personales</Button>
          </Link>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
          <Button variant="contained" sx={{ width: "25rem" }}>Datos academicos</Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
          <Link to='/miPerfil/MiCV' style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{ width: "25rem" }}>MI CV</Button>
          </Link>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
          <Link to="/ofertasPostulante" style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{ width: "25rem" }}>Postulaciones</Button>
          </Link>
        </Box>
      </Box>
    </React.Fragment>
  );
}