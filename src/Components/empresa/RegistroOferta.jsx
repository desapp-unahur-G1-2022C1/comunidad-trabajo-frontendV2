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

const validationSchema = yup.object({
  titulo_oferta: yup
    .string("Ingrese su un titulo para la oferta")
    .min(1, "Este campo no puede estar vacio")
    .required("El titulo de la oferta requerido"),
  descripcion: yup
    .string("Ingrese una descripcion a la descripcion")
    .min(1, "Este campo no puede estar vacio")
    .required("Descripcion requerido"),
  fecha_vigencia: yup
    .string("Ingrese su fecha de nacimiento")
    .optional(),
  horario_laboral_desde: yup
    .number("Ingrese su horario_laboral_desde")
    .optional(),
  horario_laboral_hasta: yup
    .number("Ingrese su horario_laboral_hasta")
    .optional(),
  edad_hasta: yup
    .number("Ingrese su edad_hasta")
    .optional(),
  edad_desde: yup
    .number("Ingrese su edad_desde de residencia")
    .optional(),
  experiencia_previa_desc: yup
    .string("Ingrese el titulo_oferta de su experiencia_previa_desc")
    .optional(),
  zona_trabajo: yup
    .string("Ingrese altura")
    .optional(),
  areas_estudio: yup
    .string("Ingrese su areas_estudio de contacto")
    .optional(),
});


export default function WithMaterialUI() {

  /*Llama a los TIPOS DE DOCUMENTOS para seleccionar en el formulario*/
  const [tiposDocumentos, setTiposDocumentos] = useState([]);
  const [llamadoTipoDocumento, setLlamadoTipoDocumento] = useState(false);

  const llamarTipoDocumento = async () => {
    if (llamadoTipoDocumento === false) {
      try {
        const api = await fetch(
          `https://comunidad-de-trabajo.herokuapp.com/tiposDocumentos`
        );
        const datos = await api.json();
        setTiposDocumentos(datos.tipos_documentos);
        setLlamadoTipoDocumento(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  llamarTipoDocumento();

  /*Llama a las CARRERAS para seleccionar en el formulario*/
  const [listaCarreras, setListaCarreras] = useState([]);
  const [llamadoListaCarreras, setLlamadoListaCarreras] = useState(false);
  const llamarCarreras = async () => {
    if (llamadoTipoDocumento === false) {
      try {
        const api = await fetch(
          `https://comunidad-de-trabajo.herokuapp.com/carreras/`
        );
        const datos = await api.json();
        setListaCarreras(datos.carreras);
        setLlamadoListaCarreras(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  llamarCarreras();

  /*Llama a los ESTUDIOS para seleccionar en el formulario*/
  const [listaEstudios, setListaEstudios] = useState([]);
  const [llamadoEstudios, setLlamadoEstudios] = useState(false);
  const llamarEstudios = async () => {
    if (llamadoTipoDocumento === false) {
      try {
        const api = await fetch(
          `https://comunidad-de-trabajo.herokuapp.com/estudios/`
        );
        const datos = await api.json();
        setListaEstudios(datos.estudios);
        setLlamadoEstudios(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  llamarEstudios();

  var getLocal = localStorage.getItem("idGuardado");

  const formik = useFormik({
    initialValues: {
      titulo_oferta: "",
      descripcion: "",
      fecha_vigencia: undefined,
      horario_laboral_desde: "",
      horario_laboral_hasta: '',
      edad_desde: '',
      edad_hasta: '',
      experiencia_previa_desc: '',
      zona_trabajo: '',
      areas_estudio: '',
      otros_detalles: '',
      beneficios: '',
      remuneracion: undefined,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      var data = {
        titulo_oferta: values.titulo_oferta,
        descripcion: values.descripcion,
        horario_laboral_desde: values.horario_laboral_desde,
        horario_laboral_hasta: values.horario_laboral_hasta,
        edad_desde: values.edad_desde,
        edad_hasta: values.edad_hasta,
        experiencia_previa_desc: values.experiencia_previa_desc,
        zona_trabajo: values.zona_trabajo,
        areas_estudio: values.areas_estudio,
        otros_detalles: values.otros_detalles,
        beneficios: values.beneficios,
        remuneracion: values.remuneracion,
        fecha_vigencia: values.fecha_vigencia,
      };
      console.log(values);
        fetch("https://comunidad-de-trabajo.herokuapp.com/postulantes/", {
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
        
        })
        .then((res) => res.json())
        .then((response) => console.log("Success:", response,
        Swal.fire({
          icon: 'success',
          title: 'Su registro fue realizado correctamente',
          confirmButtonText: 'Finalizar',
          text: 'Para continuar pulse el boton',
          footer: '',
          showCloseButton: true
        })
        .then(function (result) {
          if (result.value) {
              window.location = "/";
          }
        })))
        .catch((error) => console.error("Error:", error,
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un error al registrarse',
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
                  id="titulo_oferta"
                  name="titulo_oferta"
                  label="Nombre de la oferta"
                  fullWidth
                  value={formik.values.titulo_oferta}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.titulo_oferta &&
                    Boolean(formik.errors.titulo_oferta) &&
                    true
                  }
                  helperText={formik.touched.titulo_oferta && formik.errors.titulo_oferta}
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
                  id="fecha_vigencia"
                  name="fecha_vigencia"
                  label="Fecha de vigencia"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={formik.values.fecha_vigencia}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fecha_vigencia && Boolean(formik.errors.fecha_vigencia)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="horario_laboral_desde"
                  name="horario_laboral_desde"
                  label="Horario laboral desde:"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.horario_laboral_desde}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.horario_laboral_desde && Boolean(formik.errors.horario_laboral_desde) && true
                  }
                  helperText={formik.touched.horario_laboral_desde && formik.errors.horario_laboral_desde}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="horario_laboral_hasta"
                  name="horario_laboral_hasta"
                  label="Horario laboral hasta:"
                  variant="outlined"
                  type= "number"
                  fullWidth
                  value={formik.values.horario_laboral_hasta}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.horario_laboral_hasta &&
                    Boolean(formik.errors.horario_laboral_hasta)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="edad_desde"
                  name="edad_desde"
                  label="Edad desde: "
                  variant="outlined"
                  type= "number"
                  fullWidth
                  value={formik.values.edad_desde}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.edad_desde && Boolean(formik.errors.edad_desde)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="edad_hasta"
                  name="edad_hasta"
                  variant="outlined"
                  label="Edad hasta:"
                  type="number"
                  fullWidth
                  value={formik.values.edad_hasta}
                  onChange={formik.handleChange}
                  error={formik.touched.edad_hasta && Boolean(formik.errors.edad_hasta)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="experiencia_previa_desc"
                  name="experiencia_previa_desc"
                  variant="outlined"
                  label="Experiencia previa descripcion"
                  fullWidth
                  value={formik.values.experiencia_previa_desc}
                  onChange={formik.handleChange}
                  error={formik.touched.experiencia_previa_desc && Boolean(formik.errors.experiencia_previa_desc)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="zona_trabajo"
                  name="zona_trabajo"
                  variant="outlined"
                  label="Zona de trabajo"
                  fullWidth
                  value={formik.values.zona_trabajo}
                  onChange={formik.handleChange}
                  error={formik.touched.zona_trabajo && Boolean(formik.errors.zona_trabajo)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="areas_estudio"
                  name="areas_estudio"
                  variant="outlined"
                  label="Areas de estudio"
                  fullWidth
                  value={formik.values.areas_estudio}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.areas_estudio && Boolean(formik.errors.areas_estudio)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="otros_detalles"
                  name="otros_detalles"
                  variant="outlined"
                  label="Otros detalles"
                  fullWidth
                  value={formik.values.otros_detalles}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.otros_detalles && Boolean(formik.errors.otros_detalles)
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
