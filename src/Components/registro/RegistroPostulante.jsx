import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Header from "../Header";
import { Box, Step, Stepper } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { TextFieldsOutlined } from '@material-ui/icons';
import registroUsuario from './RegistroUsuario'

const validationSchema = yup.object({
  nombre: yup
    .string('Ingrese su nombre')
    .min(1, 'Este campo no puede estar vacio')
    .required('Nombre requerido'),
  apellido: yup
    .string('Ingrese su apellido')
    .min(1, 'Este campo no puede estar vacio')
    .required('Apellido requerido'),
  dni: yup
    .number('Ingrese su DNI')
    .min(999999, 'Este campo debe ser de al menos 7 digitos')
    .required('DNI requerido'),
  localidad: yup
    .string('Ingrese su localidad')
    .min(1, 'Este campo no puede estar vacio'),
  nacionalidad: yup
    .string('Ingrese su nacionalidad')
    .min(1, 'Este campo no puede estar vacio'),
  fechaNac: yup
    .string('Ingrese su fecha de nacimiento')
    .min(1, 'Este campo no puede estar vacio'),
  universidad: yup
    .string('Ingrese su DNI')
    .min('Este campo debe ser de al menos 7 digitos'),
  carrera: yup
    .string('Ingrese su localidad')
    .min(1, 'Este campo no puede estar vacio'),
  cantMateriasAprobadas: yup
    .string('Ingrese su nacionalidad')
    .min(0, 'Este campo no puede estar vacio'),
  idiomas: yup
    .string('Ingrese su fecha de nacimiento')
    .min(1, 'Este campo no puede estar vacio'),
});

export default function WithMaterialUI () {
  const listaIDs = ['datosPersonales', 'datosAcademicos']

  const [IdActual, setIdActual] = useState(0)
  const [estadoSiguiente, setEstadoSiguiente] = useState(false)
  
  function mostrarSiguiente(){
    document.getElementById(listaIDs[IdActual + 1]).style.display = 'block';
  }

  function mostrarAnterior(){
    document.getElementById(listaIDs[IdActual - 1]).style.display = 'block';
  }

  function ocultarActual(){
    document.getElementById(listaIDs[IdActual]).style.display = 'none'; 
  }

  function siguiente(){
    if (IdActual != listaIDs.length - 1){
      ocultarActual()
      mostrarSiguiente()
      setIdActual(IdActual + 1)
    }
  }


  function anterior(){
    if (IdActual != 0){
      ocultarActual()
      mostrarAnterior()
      setIdActual(IdActual - 1)
    }
  }


  const formik = useFormik({
    initialValues: {
      nombre:'',
      apellido:'',
      dni:'',
      nacionalidad:'',
      localidad:'',
      fechaNac:'',
      universidad:'',
      carrera:'',
      cantMateriasAprobadas:'',
      idiomas:'',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
      var data ={
        documento: values.dni,
        tipoDocumento: 1, 
        //idUsuario: ,
        //estudios: ,
        carrera: values.carrera, 
        estado: 1,
        nombre: values.nombre,
        apellido: values.apellido,
        nacionalidad: values.nacionalidad,
        fecha_nac: values.fechaNac,
        pais: "",
        provincia: "",
        ciudad: values.localidad,
        calle: "",
        nro: 0,
        piso: 0,
        depto:  0, 
        cp:  0,
        telefono: 0,
        cantMaterias: values.cantMateriasAprobadas, 
        alumnoUnahur: true,
        presentacion: ""
      };
      fetch('https://comunidad-de-trabajo.herokuapp.com/postulantes/', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response))
    },
  });

  console.log("Id: " + registroUsuario.idGuardado)
  return (
    <Fragment>
      <Header />
    <div 
    style={{
      textAlign:'center',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      flexDirection: "column",
      height: '100vh',
      }}
    >
      <form onSubmit={formik.handleSubmit} style={{width:"50%", padding:'2rem'}}>
        <div id='datosPersonales' style={{display:'block'}}>
          <TextField style={{margin:"1rem"}}
            id="nombre"
            name="nombre"
            label="Nombre"
            fullWidth
            value={formik.values.nombre}
            onChange={formik.handleChange}
            error={formik.touched.nombre && Boolean(formik.errors.nombre) && true}
            helperText={formik.touched.nombre && formik.errors.nombre}
          />
          <TextField style={{margin:"1rem"}}
            id="apellido"
            name="apellido"
            label="Apellido"
            fullWidth
            value={formik.values.apellido}
            onChange={formik.handleChange}
            error={formik.touched.apellido && Boolean(formik.errors.apellido)  && true}
            helperText={formik.touched.apellido && formik.errors.apellido}
          />
          <TextField style={{margin:"1rem"}}
            id="dni"
            name="dni"
            label="DNI"
            fullWidth
            value={formik.values.dni}
            onChange={formik.handleChange}
            error={formik.touched.dni && Boolean(formik.errors.dni)  && true}
            helperText={formik.touched.dni && formik.errors.dni}
          />
          <TextField style={{margin:"1rem"}}
            id="nacionalidad"
            name="nacionalidad"
            label="Nacionalidad"
            fullWidth
            value={formik.values.nacionalidad}
            onChange={formik.handleChange}
            error={formik.touched.nacionalidad && Boolean(formik.errors.nacionalidad)}
            helperText={formik.touched.nacionalidad && formik.errors.nacionalidad}
          />
          <TextField style={{margin:"1rem"}}
            id="localidad"
            name="localidad"
            label="Localidad"
            fullWidth
            value={formik.values.localidad}
            onChange={formik.handleChange}
            error={formik.touched.localidad && Boolean(formik.errors.localidad)}
            helperText={formik.touched.localidad && formik.errors.localidad}
          />
          <TextField style={{margin:"1rem"}}
            id="fechaNac"
            name="fechaNac"
            label="Fecha de nacimiento"
            type="date"
            fullWidth
            value={formik.values.fechaNac}
            onChange={formik.handleChange}
            error={formik.touched.fechaNac && Boolean(formik.errors.fechaNac)}
            helperText={formik.touched.fechaNac && formik.errors.fechaNac}
          />
        </div>

        <div id='datosAcademicos' style={{display:'none'}}>
          <TextField style={{margin:"1rem"}}
            id="universidad"
            name="universidad"
            label="Universidad"
            fullWidth
            value={formik.values.universidad}
            onChange={formik.handleChange}
            error={formik.touched.universidad && Boolean(formik.errors.universidad) && true}
            helperText={formik.touched.universidad && formik.errors.universidad}
          />
          <TextField style={{margin:"1rem"}}
            id="carrera"
            name="carrera"
            label="carrera"
            fullWidth
            value={formik.values.carrera}
            onChange={formik.handleChange}
            error={formik.touched.carrera && Boolean(formik.errors.carrera)  && true}
            helperText={formik.touched.carrera && formik.errors.carrera}
          />
          <TextField style={{margin:"1rem"}}
            id="cantMateriasAprobadas"
            name="cantMateriasAprobadas"
            label="Cantidad de materias aprobadas"
            fullWidth
            value={formik.values.cantMateriasAprobadas}
            onChange={formik.handleChange}
            error={formik.touched.cantMateriasAprobadas && Boolean(formik.errors.cantMateriasAprobadas)  && true}
            helperText={formik.touched.cantMateriasAprobadas && formik.errors.cantMateriasAprobadas}
          />
          <TextField style={{margin:"1rem"}}
            id="idiomas"
            name="idiomas"
            label="Idiomas"
            fullWidth
            value={formik.values.idiomas}
            onChange={formik.handleChange}
            error={formik.touched.idiomas && Boolean(formik.errors.idiomas)}
            helperText={formik.touched.idiomas && formik.errors.idiomas}
          />
        </div>
        {
          IdActual == listaIDs.length - 1
          ?
          <Box sx={{justifyContent:'center'}}>
          <Button color="primary" variant="contained" onClick={anterior}>
            Anterior
          </Button>
          <Button color="secondary" variant="contained" type='submit'>
            Confirmar
          </Button>
          </Box>
          :
          <div></div>
        }
      </form>
      {
          IdActual != listaIDs.length - 1
          ?
          <Box sx={{justifyContent:'center'}}>
          <Button color="primary" variant="contained" onClick={anterior}>
            Anterior
          </Button>
          <Button color="primary" variant="contained" onClick={siguiente} disabled={estadoSiguiente}>
            Siguiente
          </Button>
         </Box>
         :
         <div></div>
        }
    </div>
    </Fragment>
  );
};


/* import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Header from "../Header";
import Button from "@mui/material/Button";
import { Box, Step, Stepper } from "@mui/material";
import { Link } from "react-router-dom";

export default function AddressForm() {

  const listaIDs = ['datosLogin','datosPersonales', 'datosAcademicos']

  const [nombreCampo, setNombreCampo] = React.useState("");
  const [nombreLeyenda, setNombreLeyenda] = React.useState("");
  const [errorNombre, setErrorNombre] = React.useState(false);

  const [apellidoCampo, setApellidoCampo] = React.useState("");
  const [apellidoLeyenda, setApellidoLeyenda] = React.useState("");
  const [errorApellido, setErrorApellido] = React.useState(false);

  const [dniCampo, setDniCampo] = React.useState("");
  const [dniLeyenda, setDniLeyenda] = React.useState("");
  const [errorDni, setErrorDni] = React.useState(false);

  const [emailCampo, setEmailCampo] = React.useState("");
  const [emailLeyenda, setEmailLeyenda] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState(false);

  const [contraCampo, setContraCampo] = React.useState("");
  const [contraLeyenda, setContraLeyenda] = React.useState("");
  const [errorContra, setErrorContra] = React.useState(false);

  const [estadoBotonSiguiente, setEstadoBotonSiguiente] = React.useState(false)

  var IdActual = 0
  
  function mostrarSiguiente(){
    document.getElementById(listaIDs[IdActual + 1]).style.display = 'block';
  }

  function mostrarAnterior(){
    document.getElementById(listaIDs[IdActual - 1]).style.display = 'block';
  }

  function ocultarActual(){
    document.getElementById(listaIDs[IdActual]).style.display = 'none'; 
  }

  function siguiente(){ 
    if (validar == true){
      setEstadoBotonSiguiente(true)
    } else{
      if (IdActual != listaIDs.length - 1){
        ocultarActual()
        mostrarSiguiente()
        IdActual = IdActual + 1
      }
    }
  }


  function anterior(){
    
    if (IdActual != 0){
      ocultarActual()
      mostrarAnterior()
      IdActual = IdActual - 1
    }
  }

  function validar(){
    let incorrecto = false 
    if (errorEmail == true){
      incorrecto = true
    }
    return incorrecto
  }
  
  return (
    <React.Fragment>
      <Header />
      <Grid container spacing={3} sx={{ padding: "2rem", paddingTop: "6rem", justifyContent:'center'}}>
        <Grid item xs={6} sm={12}></Grid>
      <div id='datosLogin'>
      <TextField
            onChange = {(e) => {
              setEmailCampo(e.target.value);
              if(emailCampo.length==0){
                setErrorEmail(true);
                setEmailLeyenda("Este campo no puede estar vacio");
              }else{
                setErrorEmail(false);
                setEmailLeyenda('');
              }
            }}
            error = {errorEmail}
            helperText = {emailLeyenda}
            id="email"
            name="Email"
            label="Email"
            
            autoComplete="given-name"
            variant="standard"
          />
        <TextField
            onChange = {(e) => {
              setContraCampo(e.target.value);
              if(contraCampo.length==0){
                setErrorContra(true);
                setErrorContra("Este campo no puede estar vacio");
              }else{
                setErrorContra(false);
                setContraLeyenda('');
              }
            }}
            error = {errorContra}
            helperText = {contraLeyenda}
            id="Contra"
            name="Contrasena"
            label="Contrasena"
            
            autoComplete="given-name"
            variant="standard"
          />
      </div>
      </Grid>

      <div id='datosPersonales' style={{display:'none'}}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}
      >
        Datos personales
      </Typography>
      <Grid container spacing={3} sx={{ padding: "2rem", paddingTop: "0" }}>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange = {(e) => {
              setNombreCampo(e.target.value);
              if(nombreCampo.length==0){
                setErrorNombre(true);
                setNombreLeyenda("Este campo no puede estar vacio");
              }else{
                setErrorNombre(false);
                setNombreLeyenda('');
              }
            }}
            error = {errorNombre}
            helperText = {nombreLeyenda}
            id="nombre"
            name="Nombre"
            label="Nombre"
            
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange = {(e) => {
              setApellidoCampo(e.target.value);
              if(apellidoCampo.length==0){
                setErrorApellido(true);
                setApellidoLeyenda("Este campo no puede estar vacio");
              }else{
                setErrorApellido(false);
                setApellidoLeyenda('');
              }
            }}
            error = {errorApellido}
            helperText = {apellidoLeyenda}
            id="apellido"
            name="Apellido"
            label="Apellido"
            
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange = {(e) => {
              setDniCampo(e.target.value);
              if(dniCampo.length==0){
                setErrorDni(true);
                setDniLeyenda("Este campo no puede estar vacio");
              }else{
                setErrorDni(false);
                setDniLeyenda('');
              }
            }}
            error = {errorDni}
            helperText = {dniLeyenda}
            id="dni"
            name="dni"
            label="DNI"
            
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="fechaNacimiento"
            name="fechaNacimiento"
            label="Fecha de nacimiento"
            
            autoComplete="shipping address-line2"
            variant="standard"
            type="date"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="nacionalidad"
            name="nacionalidad"
            label="Nacionalidad"
            
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="provincia"
            name="provincia"
            label="Provincia"
            
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="localidad"
            name="localidad"
            label="Localidad"
            
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        </Grid>
      </Grid>
      </div>


      <div id='datosAcademicos' style={{display:'none'}}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}
      >
        Datos Académicos
      </Typography>
      <Grid container spacing={3} sx={{ padding: "2rem", paddingTop: "0" }}>
      <Grid item xs={12} sm={6}>
          <TextField
            id="estudios"
            name="estudios"
            label="Estudios"
            
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="universidad"
            name="universidad"
            label="Universidad"
            
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="carrera"
            name="carrera"
            label="Carrera"
            
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="cantAprobadas"
            name="cantAprobadas"
            label="Cantidad de Materias Aprobadas"
            
            autoComplete="shipping address-line1"
            variant="standard"
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="idioma"
            name="idioma"
            label="Idioma"
            
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
       
      </Grid>
      <FormControlLabel control={<Checkbox sx={{display:"flex", justifyContent:"center", marginLeft:"2rem"}}/>} label="¿Es alumno UNAHUR?" />
      </div>


      <Box sx={{ display: "flex", justifyContent: "center", }}>
        <Button variant="contained" color="relaxed" onClick={anterior}>
          Anterior
        </Button>
        <Button disabled={estadoBotonSiguiente} variant="contained" color="relaxed" onClick={siguiente} >
          Siguiente
        </Button>
      </Box>
    </React.Fragment>
  );
} */