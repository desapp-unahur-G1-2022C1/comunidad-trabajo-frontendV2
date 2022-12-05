import React, { Fragment } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Header from "../Header";
import {
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  alertClasses,
} from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Swal from 'sweetalert2'
import FormFormHelperText from "@mui/material";
import { MenuList } from "@material-ui/core";
import DatosUsuarioContextProvider from '../../Context/DatosUsuarioContext';
import { useContext } from 'react';
import { useHistory, useParams } from "react-router-dom";

const validationSchema = yup.object({
  tituloOferta: yup
    .string("Ingrese su un titulo para la oferta")
    .min(1, "Este campo no puede estar vacio")
    .optional("El titulo de la oferta requerido"),
  descripcion: yup
    .string("Ingrese una descripcion a la descripcion")
    .min(1, "Este campo no puede estar vacio")
    .optional("Descripcion requerido"),
  fechaVigencia: yup
    .string("Ingrese su fecha de nacimiento")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  horarioLaboralDesde: yup
    .number("Ingrese su horario laboral desde")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  horarioLaboralDesde: yup
    .number("Ingrese su horario laboral hasta")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  edadDesde: yup
    .number("Ingrese su edad hasta")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  edadHasta: yup
    .number("Ingrese su edad desde de residencia")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  experienciaPreviaDesc: yup
    .string("Descripcion de experiencia previa")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  zonaTrabajo: yup
    .string("Ingrese altura")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  areasEstudio: yup
    .string("Ingrese su areasEstudio de contacto")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  otrosDetalles: yup
    .string("Ingrese otros detalles de la oferta")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  beneficios: yup
    .string("Ingrese otros detalles de la oferta")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  remuneracion: yup
    .number("Ingrese la remuneracion")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  idEstudio: yup
    .number("Ingrese la remuneracion")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  idCarrera: yup
    .number("Ingrese la remuneracion")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  idCarrera: yup
  .number("Ingrese la remuneracion")
  .min(1, "Este campo no puede estar vacio")
  .optional(),
  idContrato: yup
    .number("Ingrese la remuneracion")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  idJornada: yup
    .number("Ingrese la remuneracion")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
});



export default function WithMaterialUI()  {
  const history = useHistory()
  const {cambiarDatosUsuario, cambiarToken, cambiarIdUsuario, cambiarEstadoLogeado, cambiarGrupo} = useContext(DatosUsuarioContextProvider)
  var datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario'))
  var token = sessionStorage.getItem('token')
  var idUsuario = sessionStorage.getItem('idUsuario')
  var grupo =  sessionStorage.getItem('grupo')
  var estaLogeado = sessionStorage.getItem('estaLogeado')

  const { id } = useParams();
  const API_URL = `https://comunidad-backend-v3.herokuapp.com/ofertas/idOferta/${id}`;

  const [llamadoOferta, setLlamadoOferta] = useState(false);
  const  descripcionAPI = async () => {
    if (llamadoOferta === false)
      try {
      setLlamadoOferta(true)
      const api = await fetch(API_URL);
      const datos = await api.json();
      console.log(datos);
      sessionStorage.setItem('datosOferta', JSON.stringify(datos))
      } catch (error) {
        console.log(error);
      }
  }
descripcionAPI();
let datosOferta = JSON.parse(sessionStorage.getItem('datosOferta'))

  /*Llama a los idEstudio para seleccionar en el formulario*/
  const [listaEstudio, setlistaEstudio] = useState([]);
  const [llamadolistaEstudio, setLlamadolistaEstudio] = useState(false);
  const llamarEstudios = async () => {
    if (llamadolistaEstudio === false) {
      try {
        const api = await fetch(
          `https://comunidad-backend-v3.herokuapp.com/estudios/`
        );
        const datos = await api.json();
        setlistaEstudio(datos.estudios);
        setLlamadolistaEstudio(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  llamarEstudios();

  /*Llama a las idCarrera para seleccionar en el formulario*/
  const [listaCarrera, setlistaCarrera] = useState([]);
  const [llamadolistaCarrera, setLlamadolistaCarrera] = useState(false);
  const llamarCarreras = async () => {
    if (llamadolistaCarrera === false) {
      try {
        const api = await fetch(
          `https://comunidad-backend-v3.herokuapp.com/carreras/`
        );
        const datos = await api.json();
        setlistaCarrera(datos.carreras);
        setLlamadolistaCarrera(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  llamarCarreras();

  /*Llama a las idCarrera para seleccionar en el formulario*/
  const [listaJornada, setlistaJornada] = useState([]);
  const [llamadolistaJornada, setLlamadolistaJornada] = useState(false);
  const llamarJornada = async () => {
    if (llamadolistaJornada === false) {
      try {
        const api = await fetch(
          ` https://comunidad-backend-v3.herokuapp.com/jornadas/`
        );
        const datos = await api.json();
        setlistaJornada(datos.jornadas);
        setLlamadolistaJornada(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  llamarJornada();

  /*Llama a las idContrato para seleccionar en el formulario*/
  const [listaContrato, setlistaContrato] = useState([]);
  const [llamadolistaContrato, setLlamadolistaContrato] = useState(false);
  const llamarContrato = async () => {
    if (llamadolistaContrato === false) {
      try {
        const api = await fetch(
          ` https://comunidad-backend-v3.herokuapp.com/contratos/`
        );
        const datos = await api.json();
        setlistaContrato(datos.contratos);
        setLlamadolistaContrato(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  llamarContrato();

  const formik = useFormik({
    initialValues: {
      tituloOferta: datosOferta.titulo_oferta,
      descripcion: datosOferta.descripcion,
      fechaVigencia: undefined,
      horarioLaboralDesde: datosOferta.horario_laboral_desde,
      horarioLaboralHasta: datosOferta.horario_laboral_hasta,
      edadHasta: datosOferta.edad_hasta,
      edadDesde: datosOferta.edad_desde,
      experienciaPreviaDesc: datosOferta.experiencia_previa_desc,
      zonaTrabajo: datosOferta.zona_trabajo,
      areasEstudio: datosOferta.areas_estudio,
      otrosDetalles: datosOferta.otros_detalles,
      beneficios: datosOferta.beneficios,
      idEmpresa: datosUsuario.fk_id_empresa,
      remuneracion: datosOferta.remuneracion,
      idEstudio: datosOferta.fk_id_estudio,
      idCarrera: datosOferta.fk_id_carrera,
      idContrato: datosOferta.fk_id_contrato,
      idJornada:datosOferta.fk_id_jornada,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      var data = {
        idEmpresa: datosUsuario.id,
        idCarrera: values.idCarrera,
        idContrato: values.idContrato,
        idEstudio: values.idEstudio,
        idCarrera: values.idCarrera,
        idJornada: values.idJornada,
        fechaVigencia: values.fechaVigencia,
        tituloOferta: values.tituloOferta,
        descripcion: values.descripcion,
        horarioLaboralDesde: values.horarioLaboralDesde,
        horarioLaboralHasta: values.horarioLaboralHasta,
        edadHasta: values.edadHasta,
        edadDesde: values.edadDesde,
        experienciaPreviaDesc: values.experienciaPreviaDesc,
        zonaTrabajo: values.zonaTrabajo,
        areasEstudio: values.areasEstudio,
        otrosDetalles: values.otrosDetalles,
        beneficios: values.beneficios,
        remuneracion: values.remuneracion,
        idEstado: 2
      };
      console.log(values);
        await fetch(`https://comunidad-backend-v3.herokuapp.com/ofertas/idOferta/${datosOferta.id}`, {
        method: "PUT", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
        
        })
        Swal.fire({
          icon: 'success',
          title: 'La oferta fue editada exitosamente',
          confirmButtonText: 'Finalizar',
          text: 'Para continuar pulse el boton',
          footer: '',
          showCloseButton: true
        })
        .then(function (result) {
          if (result.value) {
              history.push(`/oferta/${id}`)
          }
        })
        .catch((error) => console.error("Error:", error,
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un error al editar la oferta',
          confirmButtonText: 'Volver',
          text: 'Verifique sus datos',
          footer: '',
          showCloseButton: true
        })))
    },
  });
  
  return (
    
    <Fragment>
      <Header />
      <Typography
        variant="h4"
        sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}
      >
        Datos de oferta
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  variant="outlined"
                  id="tituloOferta"
                  name="tituloOferta"
                  label="Nombre de la oferta"
                  fullWidth
                  value={formik.values.tituloOferta}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.tituloOferta &&
                    Boolean(formik.errors.tituloOferta) &&
                    true
                  }
                  helperText={formik.touched.tituloOferta && formik.errors.tituloOferta}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  variant="outlined"
                  id="descripcion"
                  name="descripcion"
                  label="Descripcion"
                  fullWidth
                  value={formik.values.descripcion}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.descripcion &&
                    Boolean(formik.errors.descripcion) &&
                    true
                  }
                  helperText={formik.touched.descripcion && formik.errors.descripcion}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  variant="outlined"
                  id="fechaVigencia"
                  name="fechaVigencia"
                  label="Fecha de vigencia"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={formik.values.fechaVigencia}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fechaVigencia && Boolean(formik.errors.fechaVigencia)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="horarioLaboralDesde"
                  name="horarioLaboralDesde"
                  label="Horario laboral desde:"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.horarioLaboralDesde}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.horarioLaboralDesde && Boolean(formik.errors.horarioLaboralDesde) && true
                  }
                  helperText={formik.touched.horarioLaboralDesde && formik.errors.horarioLaboralDesde}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="horarioLaboralHasta"
                  name="horarioLaboralHasta"
                  label="Horario laboral hasta:"
                  variant="outlined"
                  type= "number"
                  fullWidth
                  value={formik.values.horarioLaboralHasta}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.horarioLaboralHasta &&
                    Boolean(formik.errors.horarioLaboralHasta)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="edadDesde"
                  name="edadDesde"
                  label="Edad desde: "
                  variant="outlined"
                  type= "number"
                  fullWidth
                  value={formik.values.edadDesde}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.edadDesde && Boolean(formik.errors.edadDesde)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="edadHasta"
                  name="edadHasta"
                  variant="outlined"
                  label="Edad hasta:"
                  type="number"
                  fullWidth
                  value={formik.values.edadHasta}
                  onChange={formik.handleChange}
                  error={formik.touched.edadHasta && Boolean(formik.errors.edadHasta)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="experienciaPreviaDesc"
                  name="experienciaPreviaDesc"
                  variant="outlined"
                  label="Experiencia previa descripcion"
                  fullWidth
                  value={formik.values.experienciaPreviaDesc}
                  onChange={formik.handleChange}
                  error={formik.touched.experienciaPreviaDesc && Boolean(formik.errors.experienciaPreviaDesc)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="zonaTrabajo"
                  name="zonaTrabajo"
                  variant="outlined"
                  label="Zona de trabajo"
                  fullWidth
                  value={formik.values.zonaTrabajo}
                  onChange={formik.handleChange}
                  error={formik.touched.zonaTrabajo && Boolean(formik.errors.zonaTrabajo)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="areasEstudio"
                  name="areasEstudio"
                  variant="outlined"
                  label="Areas de estudio"
                  fullWidth
                  value={formik.values.areasEstudio}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.areasEstudio && Boolean(formik.errors.areasEstudio)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="otrosDetalles"
                  name="otrosDetalles"
                  variant="outlined"
                  label="Otros detalles"
                  fullWidth
                  value={formik.values.otrosDetalles}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.otrosDetalles && Boolean(formik.errors.otrosDetalles)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="beneficios"
                  name="beneficios"
                  variant="outlined"
                  label="Beneficios"
                  fullWidth
                  value={formik.values.beneficios}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.beneficios && Boolean(formik.errors.beneficios)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="remuneracion"
                  name="remuneracion"
                  variant="outlined"
                  label="Remuneracion"
                  fullWidth
                  type="number"
                  value={formik.values.remuneracion}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.remuneracion && Boolean(formik.errors.remuneracion)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
              <InputLabel>Estudio</InputLabel>
              <Select
                id="idEstudio"
                name="idEstudio"
                label="Nivel de estudio"
                variant="outlined"
                type="number"
                value={formik.values.idEstudio}
                onChange={formik.handleChange}
                error={
                  formik.touched.estudio && Boolean(formik.errors.estudio)
                }
              >
                {listaEstudio.map((estudio) => (
                  <MenuList className="selectCss" value={estudio.id} key={estudio.id}>
                    <Box sx={{display:'flex', justifyContent:'center'}}>{estudio.id}: {estudio.nombre_estudio} - {estudio.estado_estudio}</Box> 
                  </MenuList>
                ))}
              </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Carrera</InputLabel>
                <Select
                  id="idCarrera"
                  name="idCarrera"
                  variant="outlined"
                  label="Carrera"
                  type="number"
                  value={formik.values.idCarrera}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.carrera && Boolean(formik.errors.carrera)
                  }
                >
                  {listaCarrera.map((carrera) => (
                    <MenuList className="selectCss" value={carrera.id} key={carrera.id}>
                      <Box sx={{display:'flex', justifyContent:'center'}}> {carrera.id}: {carrera.nombre_carrera}</Box>
                    </MenuList>
                  ))}
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
              <InputLabel>Jornada</InputLabel>
              <Select
                id="idJornada"
                name="idJornada"
                label="Ingrese la jornada"
                variant="outlined"
                type="number"
                value={formik.values.idJornada}
                onChange={formik.handleChange}
                error={
                  formik.touched.jornada && Boolean(formik.errors.jornada)
                }
              >
                {listaJornada.map((jornada) => (
                  <MenuList className="selectCss" value={jornada.id} key={jornada.id}>
                    <Box sx={{display:'flex', justifyContent:'center'}}>{jornada.id} : {jornada.nombre_jornada}</Box> 
                  </MenuList>
                ))}
              </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Contrato</InputLabel>
                <Select
                  id="idContrato"
                  name="idContrato"
                  variant="outlined"
                  label="Tipo de contrato"
                  type="number"
                  value={formik.values.idContrato}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.contrato && Boolean(formik.errors.contrato)
                  }
                >
                  {listaContrato.map((contrato) => (
                    <MenuList className="selectCss" value={contrato.id} key={contrato.id}>
                      <Box sx={{display:'flex', justifyContent:'center'}}> {contrato.id} : {contrato.nombre_contrato}</Box>
                    </MenuList>
                  ))}
                </Select>
              </FormControl>
              </Grid>
            </Grid>
          </div>
           <Box>
              <Button
                style={{ display: "flex", margin: "1rem" }}
                id="confirmar"
                variant="contained"
                type="submit"
              >
                Confirmar
              </Button>
            </Box>
        </form>
      </Box>
    </Fragment>
  );
}
