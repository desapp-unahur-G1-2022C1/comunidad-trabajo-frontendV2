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
  nombre: yup
    .string("Ingrese su nombre")
    .min(1, "Este campo no puede estar vacio")
    .required("Nombre requerido"),
  apellido: yup
    .string("Ingrese su apellido")
    .min(1, "Este campo no puede estar vacio")
    .required("Apellido requerido"),
  fechaNac: yup.string("Ingrese su fecha de nacimiento").min(""),
  tipoDocumento: yup
    .string("Ingrese su tipo de documento")
    .required("Tipo de documento es requerido"),
  dni: yup.string("Ingrese su DNI").required("DNI requerido"),
  ciudad: yup.string("Ingrese su ciudad").min(""),
  nacionalidad: yup.string("Ingrese su nacionalidad").min(""),
  provincia: yup.string("Ingrese su provincia de residencia").min(""),
  calle: yup.string("Ingrese el nombre de su calle").min(""),
  nro: yup.string("Ingrese altura"),
  telefono: yup.string("Ingrese su telefono de contacto").min(""),
  universidad: yup.string("Ingrese el nombre de su Universidad").min(""),
  carrera: yup.string("Ingrese su carrera").min(""),
  cantMateriasAprobadas: yup
    .string("Ingrese la cantidad de materias aprobadas")
    .min(""),
  estudios: yup.string("Ingrese sus estudios").min(""),
  idiomas: yup.string("Elija idiomas").min(""),
});


export default function WithMaterialUI() {
  

  const listaIDs = ["datosPersonales", "datosAcademicos"];
  const [estadoBoton, setEstadoBoton] = useState(true);

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

  const [IdActual, setIdActual] = useState(0);
  const [estadoSiguiente, setEstadoSiguiente] = useState(false);

  function mostrarSiguiente() {
    document.getElementById(listaIDs[IdActual + 1]).style.display = "block";
  }

  function mostrarAnterior() {
    document.getElementById(listaIDs[IdActual - 1]).style.display = "block";
  }

  function ocultarActual() {
    document.getElementById(listaIDs[IdActual]).style.display = "none";
  }
  
  function siguiente() {
      ocultarActual();
      mostrarSiguiente();
      setIdActual(IdActual + 1);
      setEstadoBoton(false);
  }

  function anterior() {
    if (IdActual != 0) {
      ocultarActual();
      mostrarAnterior();
      setIdActual(IdActual - 1);
      setEstadoBoton(true);
    }
  }

  var getLocal = localStorage.getItem("idGuardado");

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      fechaNac: "",
      tipoDocumento: "",
      dni: "",
      nacionalidad: "",
      provincia: "",
      ciudad: "",
      calle: "",
      nro: "",
      telefono: "",
      carrera: "",
      cantMateriasAprobadas: "",
      idiomas: "",
      estudios: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      var data = {
        documento: values.dni,
        tipoDocumento: values.tipoDocumento,
        idUsuario: getLocal,
        estado: 1,
        nombre: values.nombre,
        apellido: values.apellido,
        nacionalidad: values.nacionalidad,
        fecha_nac: values.fechaNac,
        pais: "Argentina",
        provincia: values.provincia,
        ciudad: values.ciudad,
        calle: values.calle,
        nro: values.nro,
        telefono: values.telefono,
        piso: 0,
        depto: 0,
        cp: "",
        estudios: values.estudios,
        carrera: values.carrera,
        cantMaterias: values.cantMateriasAprobadas,
        alumnoUnahur: "false",
        presentacion: "",
      };
      console.log(values);
      console.log(IdActual);
      if (IdActual == listaIDs.length - 1){
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
      }else{
        siguiente()
      }
    },
  });
  return (
    
    <Fragment>
      <Header />
      <Typography
        variant="h4"
        sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}
      >
        Datos personales
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
        <form onSubmit={formik.handleSubmit}>
          <div id="datosPersonales">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  variant="outlined"
                  id="nombre"
                  name="nombre"
                  label="Nombre"
                  fullWidth
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.nombre &&
                    Boolean(formik.errors.nombre) &&
                    true
                  }
                  helperText={formik.touched.nombre && formik.errors.nombre}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  variant="outlined"
                  id="apellido"
                  name="apellido"
                  label="Apellido"
                  fullWidth
                  value={formik.values.apellido}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.apellido &&
                    Boolean(formik.errors.apellido) &&
                    true
                  }
                  helperText={formik.touched.apellido && formik.errors.apellido}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  variant="outlined"
                  id="fechaNac"
                  name="fechaNac"
                  label="Fecha de nacimiento"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={formik.values.fechaNac}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fechaNac && Boolean(formik.errors.fechaNac)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel>
                    Tipo de documento
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-error-label"
                    id="tipoDocumento"
                    variant="outlined"
                    name="tipoDocumento"
                    label="Tipo de documento"
                    type='number'
                    fullWidth
                    value={formik.values.tipoDocumento}
                    onChange={formik.handleChange}
                    error={formik.touched.tipoDocumento && Boolean(formik.errors.tipoDocumento)}
                    
                  >
                    {tiposDocumentos.map((documento) => ( 
                      <MenuList sx={{display:'flex', justifyContent:'center'}} value={documento.id} key={documento.id}>
                        {documento.tipo_documento}
                      </MenuList>
                    ))}
                  helperText={formik.touched.tipoDocumento && formik.errors.tipoDocumento}
                  </Select>
                  
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="dni"
                  name="dni"
                  label="Numero de documento"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.dni}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.dni && Boolean(formik.errors.dni) && true
                  }
                  helperText={formik.touched.dni && formik.errors.dni}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="nacionalidad"
                  name="nacionalidad"
                  label="Nacionalidad"
                  variant="outlined"
                  fullWidth
                  value={formik.values.nacionalidad}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.nacionalidad &&
                    Boolean(formik.errors.nacionalidad)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="provincia"
                  name="provincia"
                  label="Provincia"
                  variant="outlined"
                  fullWidth
                  value={formik.values.provincia}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.provincia && Boolean(formik.errors.provincia)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="ciudad"
                  name="ciudad"
                  variant="outlined"
                  label="Ciudad"
                  fullWidth
                  value={formik.values.ciudad}
                  onChange={formik.handleChange}
                  error={formik.touched.ciudad && Boolean(formik.errors.ciudad)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="calle"
                  name="calle"
                  variant="outlined"
                  label="Nombre de calle"
                  fullWidth
                  value={formik.values.calle}
                  onChange={formik.handleChange}
                  error={formik.touched.calle && Boolean(formik.errors.calle)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="nro"
                  name="nro"
                  variant="outlined"
                  label="Altura de calle"
                  type="number"
                  fullWidth
                  value={formik.values.nro}
                  onChange={formik.handleChange}
                  error={formik.touched.nro && Boolean(formik.errors.nro)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="telefono"
                  name="telefono"
                  variant="outlined"
                  label="Telefono de contacto"
                  type="number"
                  fullWidth
                  value={formik.values.telefono}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.telefono && Boolean(formik.errors.telefono)
                  }
                />
              </Grid>
            </Grid>
          </div>



          <div id="datosAcademicos" style={{ display: "none" }}>
            <Box item xs={12} sm={6} md={4}
              sx={{
                display: "flex",
                justifyContent: "left",
                flexDirection: "column",
                width: '300px'
              }}
            >
              <Box sx={{margin:'16px', display:'flex', justifyContent:'center'}}>
              <FormControl fullWidth>
              <InputLabel>Estudios</InputLabel>
              <Select
                id="estudios"
                name="estudios"
                label="Nivel de estudios"
                variant="outlined"
                type="number"
                value={formik.values.estudios}
                onChange={formik.handleChange}
                error={
                  formik.touched.estudios && Boolean(formik.errors.estudios)
                }
              >
                {listaEstudios.map((estudios) => (
                  <MenuItem value={estudios.id} key={estudios.id}>
                    {" "}
                    {estudios.id}: {estudios.nombre_estudio}{" "}
                    {estudios.estado_estudio}
                  </MenuItem>
                ))}
              </Select>
              </FormControl>
              </Box>
              <Box sx={{margin:'16px', display:'flex', justifyContent:'center'}}>
              <FormControl fullWidth>
                <InputLabel>Carrera</InputLabel>
                <Select
                  id="carrera"
                  name="carrera"
                  variant="outlined"
                  label="Carrera"
                  type="number"
                  value={formik.values.carrera}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.carrera && Boolean(formik.errors.carrera)
                  }
                >
                  {listaCarreras.map((carrera) => (
                    <MenuItem value={carrera.id} key={carrera.id}>
                      {" "}
                      {carrera.id}: {carrera.nombre_carrera}{" "}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Box>
              <Box sx={{margin:'16px', display:'flex', justifyContent:'center'}}>
              <TextField fullWidth 
                id="cantMateriasAprobadas"
                name="cantMateriasAprobadas"
                label="Cantidad de materias aprobadas"
                type="number"
                variant="outlined"
                
                value={formik.values.cantMateriasAprobadas}
                onChange={formik.handleChange}
                error={
                  formik.touched.cantMateriasAprobadas &&
                  Boolean(formik.errors.cantMateriasAprobadas) &&
                  true
                }
              />
              </Box>
              <Box sx={{margin:'16px', display:'flex', justifyContent:'center'}}>
              <TextField
                fullWidth
                id="idiomas"
                name="idiomas"
                label="Idiomas"
                type="number"
                variant="outlined"
                value={formik.values.idiomas}
                onChange={formik.handleChange}
                error={formik.touched.idiomas && Boolean(formik.errors.idiomas)}
              />
              </Box>
              <FormControlLabel
                sx={{margin:"0.5rem"}}
                control={<Checkbox defaultChecked />}
                label="¿Es alumno UNAHUR?"
                id="alumnoUnahur"
                name="alumnoUnahur"
                type="checkbox"
                value={formik.values.alumnoUnahur}
                onChange={formik.handleChange}
                error={
                  formik.touched.alumnoUnahur &&
                  Boolean(formik.errors.alumnoUnahur)
                }
              />
            </Box>
          </div>
          {IdActual == listaIDs.length - 1 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Button
                style={{ display: "flex", margin: "1rem" }}
                color="primary"
                variant="contained"
                onClick={anterior}
              >
                Anterior
              </Button>
              <Button
                style={{ display: "flex", margin: "1rem" }}
                id="confirmar"
                variant="contained"
                type="submit"
              >
                Confirmar
              </Button>
            </Box>
          ) 
          : 
          (
            <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Button
              style={{ display: "flex", margin: "1rem" }}
              color="primary"
              variant="contained"
              disabled={estadoBoton}
              onClick={anterior}
            >
              Anterior
            </Button>
            <Button
              style={{ display: "flex", margin: "1rem" }}
              color="primary"
              variant="contained"
              type="submit"
              //onClick= {}
              disabled={estadoSiguiente}
            >
              Siguiente
            </Button>
          </Box>
          )
          }
        </form>
      </Box>
    </Fragment>
  );
}
