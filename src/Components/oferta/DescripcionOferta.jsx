import * as React from "react";
import Stack from "@mui/material/Stack";
import { Button, styled, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Fragment } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import ConfirmacionPostulacion from "./ConfirmacionPostulacion";
import Grid from "@mui/material/Grid";
import Header from "../Header";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import DatosUsuarioContextProvider from '../../Context/DatosUsuarioContext';
import { useContext } from 'react';
import Swal from "sweetalert2";
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import NotFound from "../NotFound";
import '../../App.css'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const CustomizedDialogs = () => {
  const { id } = useParams();
  const [tituloOferta, setTituloOferta] = useState();
  const [nombreEmpresa, setNombreEmpresa] = useState();
  const [descripcionEmpresa, setDescripcionEmpresa] = useState();
  const [descripcion, setDescripcion] = useState();
  const [zona, setZona] = useState();
  const [salario, setSalario] = useState();
  const [horarioEntrada, setHorarioEntrada] = useState();
  const [horarioSalida, setHorarioSalida] = useState();
  const [idiomas, setIdiomas] = useState();
  const [jornada, setJornada] = useState();
  const [contrato, setContrato] = useState();
  const [edadDesde, setEdadDesde] = useState();
  const [edadHasta, setEdadHasta] = useState();
  const [beneficios, setBeneficios] = useState();
  const [idEmpresa, setIdEmpresa] = useState();
  const [estado, setEstado] = useState();
  const [fechaPublicacion, setFechaPublicacion] = useState();
  const API_URL = `https://comunidad-backend-v3.herokuapp.com/ofertas/idOferta/${id}?`;

  const descripcionAPI = async () => {

    try {
      const api = await fetch(API_URL);
      const datos = await api.json();
      sessionStorage.setItem('datosOferta', JSON.stringify(datos));
      setTituloOferta(datos.titulo_oferta);
      setNombreEmpresa(datos.Empresa.nombre_empresa);
      setDescripcionEmpresa(datos.Empresa.descripcion)
      setIdEmpresa(datos.Empresa.id);
      setDescripcion(datos.descripcion);
      setZona(datos.zona_trabajo);
      setSalario(datos.remuneracion);
      setHorarioEntrada(datos.horario_laboral_desde);
      setHorarioSalida(datos.horario_laboral_hasta);
      setJornada(datos.Jornada.nombre_jornada);
      setContrato(datos.Contrato.nombre_contrato);
      setEdadDesde(datos.edad_desde);
      setEdadHasta(datos.edad_hasta);
      setBeneficios(datos.beneficios);
      setEstado(datos.Estado.id);
      setFechaPublicacion(datos.createdAt)
    } catch (error) {
      console.log(error);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  descripcionAPI();


  const { cambiarDatosUsuario, cambiarToken, cambiarIdUsuario, cambiarEstadoLogeado, cambiarGrupo } = useContext(DatosUsuarioContextProvider)
  var datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario'))
  var token = sessionStorage.getItem('token')
  var idUsuario = sessionStorage.getItem('idUsuario')
  var grupo = sessionStorage.getItem('grupo')
  var estaLogeado = sessionStorage.getItem('estaLogeado')

  const [llamado, setLlamado] = useState(false)
  const [encontrado, setEcontrado] = useState(false)

  const estaPostulado = async () => {
    let idsOfertas
    if (estaLogeado && datosUsuario.id != null) {
      try {
        const api = await fetch(`https://comunidad-backend-v3.herokuapp.com/postulacionesId/postulante/?&id=${datosUsuario.id}&`);
        const datos = await api.json();
        console.log(datos)
        idsOfertas = datos.postulaciones.rows.map(postulacion => postulacion.fk_id_oferta)
        console.log(idsOfertas)
      } catch (error) {
        console.log(error)
      }
      setLlamado(true)
      console.log(id)
      for (let i = 0; i <= idsOfertas.length; i++) {
        if (idsOfertas[i] == id) {
          setEcontrado(true)
        }
      }

      console.log(encontrado)
    }
  }

  function timeoutReload() {
    setTimeout(function () { window.location.reload() }, 1000);
  }

  estaPostulado()
  const postularse = async (e) => {
    e.preventDefault()
    Swal.fire({
      title: `¿Deseas postularte a ${tituloOferta}?`,

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, postularme!',
      cancelButtonText: 'No, cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const api = await fetch(`https://comunidad-backend-v3.herokuapp.com/postulaciones/?authorization=${token}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              postulante: datosUsuario.id,
              oferta: id,
              empresa: idEmpresa
            })
          })
          const datos = await api.json();
          console.log(datos);
        }
        catch (error) {
          console.log(error)
        }
        Swal.fire(
          `Te has postulado a ${tituloOferta}`,
          '¡Buena suerte!',
          'success'
        ).then(() => {
          timeoutReload()
        }
        )


      }
    })
  }



  const activar = async (idOferta) => {
    var data = {
      idEstado: 1
    };
    await fetch(`https://comunidad-backend-v3.herokuapp.com/ofertas/idOferta/${idOferta}?authorization=${token}`, {
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

  function publicadoHace(fechaPublicacion) {
    var fechaPublicacion = new Date(fechaPublicacion);
    var fechaActual = new Date();
    var diferencia = fechaActual - fechaPublicacion;
    var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    var horas = Math.floor(diferencia / (1000 * 60 * 60));
    var minutos = Math.floor(diferencia / (1000 * 60));

    if (dias > 0) {
      return dias + " dias";
    } else if (horas > 0) {
      return horas + " horas";
    } else {
      return minutos + " minutos";
    }
  }
  return (
    <Fragment>

      {
        estado != 1 && (grupo == 1 || !estaLogeado)
          ?
          <NotFound></NotFound>
          :
          <>
            <Header />
            <Box></Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Grid containter spacing={2} sx={{ display: "flex", justifyContent: "center", maxWidth: "50rem" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Box sx={{ margin: "1rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Grid item xs={12} sm={8} md={8}>
                      <Box  >
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                            <Typography variant="h4">
                              {tituloOferta}
                            </Typography>
                            <Typography variant="h6">
                              {nombreEmpresa}
                            </Typography>
                            <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
                              <PlaceIcon />{zona}
                            </Typography>
                            <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
                              <CalendarMonthIcon />Publicado hace: {publicadoHace(fechaPublicacion)}
                            </Typography>
                          </Box>
                          <img src="https://graffica.info/wp-content/uploads/2022/05/Telefonica-rebranding-2021-800x445-3.jpeg" alt="" style={{ width: "80px", height: "80px" }} />
                        </Box>
                      </Box>
                    </Grid>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Grid item xs={12} sm={8} md={8}>  <Typography variant="h5" sx={{ marginBottom: "0.5rem" }} >
                        Sobre la empresa
                      </Typography>
                      <Typography variant="body1" sx={{ marginBottom: "0.5rem" }}>
                        {descripcionEmpresa}
                      </Typography>
                      </Grid>
                      <Grid item xs={8} sm={8} md={8}> <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
                        Descripcion
                      </Typography>
                        <Typography variant="body1" sx={{ marginBottom: "0.5rem", whiteSpace: "pre-line" }}  >
                          {descripcion}
                        </Typography>
                      </Grid>
                      <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
                        Horario
                      </Typography>
                      <Typography variant="body1" sx={{ marginBottom: "0.5rem", display: "flex", alignItems: "center" }}>
                        <ScheduleIcon /> De {horarioEntrada}hs a {horarioSalida}hs
                      </Typography>
                      <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
                        Contrato
                      </Typography>
                      <Typography variant="body1" sx={{ marginBottom: "0.5rem" }}>
                        {contrato}
                      </Typography>
                      <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
                        Salario
                      </Typography>
                      <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
                        ${salario}
                      </Typography>
                      <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
                        Beneficios
                      </Typography>
                      <Typography variant="body1" sx={{ marginBottom: "0.5rem" }}>
                        {beneficios}
                      </Typography>



                      <Box sx={{ display: "flex", justifyContent: "space-around" }}>{
                        grupo == 3 && estado == 2 ? <> <Box sx={{ display: "flex" }}>
                          <Button sx={{ margin: "0.5rem" }} color="relaxed" variant="contained" onClick={async () => activar(id)}> Aceptar </Button>
                          <Button sx={{ margin: "0.5rem" }} color="error" variant="contained">Rechazar</Button>
                        </Box>
                        </>
                          : grupo == 3 && (estado == 1 || estado == 3) ? null :
                            grupo == 2
                              ?
                              nombreEmpresa == datosUsuario.nombre_empresa
                                ?
                                <Box sx={{ width: "20rem" }}>
                                  <Link style={{ textDecoration: "none" }} to={`/edicionOferta/${id}`}>
                                    <Button
                                      size="large"
                                      variant="contained"
                                      color="relaxed"
                                      sx={{ width: "20rem", marginBottom: '1rem' }}
                                    >
                                      Editar oferta
                                    </Button>
                                  </Link>
                                  <Link style={{ textDecoration: "none" }} to={`/ListadoDePostulantes/${id}`}>
                                    <Button
                                      size="large"
                                      variant="outlined"
                                      color="relaxed"
                                      sx={{ width: "20rem" }}
                                    >
                                      Ver postulantes
                                    </Button>
                                  </Link>
                                </Box>
                                :
                                <Box></Box>
                              :
                              estaLogeado == 'true' && encontrado
                                ?
                                <Button
                                  size="large"
                                  variant="contained"
                                  color="relaxed"
                                  onClick={postularse}
                                  sx={{ width: "20rem" }}
                                  disabled
                                >
                                  Ya estas postulado
                                </Button> :
                                estaLogeado == 'true' && !encontrado
                                  ?
                                  <Button
                                    size="large"
                                    variant="contained"
                                    color="relaxed"
                                    onClick={postularse}
                                    sx={{ width: "20rem" }}
                                  >
                                    Postularme
                                  </Button>
                                  :
                                  <Link to='/login' style={{ textDecoration: 'none' }}>
                                    <Button
                                      size="large"
                                      variant="contained"
                                      color="relaxed"
                                      sx={{ width: "20rem" }}
                                    >
                                      Postularme
                                    </Button>
                                  </Link>
                      }</Box>

                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Box>
          </>
      }
    </Fragment>
  );
};
export default CustomizedDialogs;
