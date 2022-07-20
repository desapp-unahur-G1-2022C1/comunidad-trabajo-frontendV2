import * as React from "react";
import Stack from "@mui/material/Stack";
import { Button, styled, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import ConfirmacionPostulacion from "./ConfirmacionPostulacion";
import Grid from "@mui/material/Grid";

import Header from "../Header";
import { useState } from "react";

import { useParams } from "react-router-dom";

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
  const [descripcion, setDescripcion] = useState();
  const [zona, setZona] = useState();
  const [salario, setSalario] = useState();
  const [horarioEnrada, setHorarioEntrada] = useState();
  const [horarioSalida, setHorarioSalida] = useState();
  const [idiomas, setIdiomas] = useState();
  const [jornada, setJornada] = useState();
  const [contrato, setContrato] = useState();
  const [edadDesde, setEdadDesde] = useState();
  const [edadHasta, setEdadHasta] = useState();
  const [beneficios, setBeneficios] = useState();
  const API_URL = `https://comunidad-de-trabajo.herokuapp.com/ofertas/${id}`;

  const descripcionAPI = async () => {
    try {
      const api = await fetch(API_URL);
      const datos = await api.json();
      setTituloOferta(datos.titulo_oferta);
      setNombreEmpresa(datos.Empresa.nombre_empresa);
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

  return (
    <React.Fragment>
      <Header />
      <Box sx={{ padding: "2rem" }}>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: "center", padding:"1rem" }}
        >
          <Box sx={{ display:"flex", flexDirection:"column", margin:"2rem" }}>
            <Box
              sx={{
                display: "flex",
                padding: "2rem",
                justifyContent: "center",
                
              }}
            >
              <Stack direction="row" spacing={2}>
              <img src="https://cdn.discordapp.com/attachments/955646153297395722/996230598853148792/unknown.png" style={{height:"15rem", width:"15rem"}}/>
              </Stack>
            </Box>
            <Box sx={{ display:"flex", justifyContent:"center", flexDirection:"column", maxWidth:"20rem"}}>
              <Typography variant="h4" sx={{ textAlign:"center"}}>{tituloOferta}</Typography><br />
              <Typography variant="h6" sx={{textAlign:"justify"}}>{nombreEmpresa}</Typography><br />
            </Box>
            <Box
              sx={{
                
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                size="large"
                variant="contained"
                color="relaxed"
                onClick={handleClickOpen}
                sx={{ width: "20rem" }}
              >
                Postularme
              </Button>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                <ConfirmacionPostulacion 
                tituloOferta={tituloOferta}
                nombreEmpresa={nombreEmpresa}/>
              </BootstrapDialog>
            </Box>
          </Box>

          <Box sx={{  maxWidth: "30rem" }}>
            <Box sx={{ borderBottom: "#009688 2px solid" }}>
              {" "}
              <h3>Descripcion:</h3>{" "}
              <Typography sx={{ fontSize: "20px", marginBottom:"1rem" }}> {descripcion}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems:"center", borderBottom: "#009688 2px solid" }}>
              {" "}
              <h3>Zona de trabajo: </h3>{" "}
              <Typography sx={{ fontSize: "20px", paddingLeft:"0.5rem"}} variant="body1">
                {zona}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems:"center", borderBottom: "#009688 2px solid" }}>
              {" "}
              <h3>Edad:</h3>{" "}
              <Typography sx={{ paddingLeft:"0.5rem", fontSize: "20px" }}>
                Desde {edadDesde} hasta {edadHasta} años
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems:"center", borderBottom: "#009688 2px solid" }}>
              {" "}
              <h3>Horario:</h3>{" "}
              <Typography sx={{ paddingLeft:"0.5rem", fontSize: "20px" }}>
                De {horarioEnrada} a {horarioSalida}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems:"center", borderBottom: "#009688 2px solid" }}>
              {" "}
              <h3>Idiomas:</h3>{" "}
              <Typography
                sx={{ paddingLeft:"0.5rem", fontSize: "20px" }}
              ></Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems:"center", borderBottom: "#009688 2px solid" }}>
              {" "}
              <h3>Jornada: </h3>{" "}
              <Typography sx={{ paddingLeft:"0.5rem", fontSize: "20px" }}>
                {jornada}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems:"center", borderBottom: "#009688 2px solid" }}>
              {" "}
              <h3>Contrato: </h3>{" "}
              <Typography sx={{ paddingLeft:"0.5rem", fontSize: "20px" }}>
                {contrato}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems:"center", borderBottom: "#009688 2px solid" }}>
              {" "}
              <h3>Beneficios: </h3>{" "}
              <Typography sx={{ paddingLeft:"0.5rem", fontSize: "20px" }}>
                {beneficios}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems:"center", borderBottom: "#009688 2px solid" }}>
              {" "}
              <h3>Salario:</h3>{" "}
              <Typography sx={{ paddingLeft:"0.5rem", fontSize: "20px" }}>
                ${salario}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Box>
    </React.Fragment>
  );
};
export default CustomizedDialogs;
