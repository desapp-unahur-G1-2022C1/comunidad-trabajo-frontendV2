import React, { Fragment } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Header from "../Header";
import { Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useState } from 'react';


const validationSchema = yup.object({
  nombre: yup
    .string('Ingrese su nombre')
    .min(1, 'Este campo no puede estar vacio')
    .required('Nombre requerido'),
  apellido: yup
    .string('Ingrese su apellido')
    .min(1, 'Este campo no puede estar vacio')
    .required('Apellido requerido'),
  fechaNac: yup
    .string('Ingrese su fecha de nacimiento')
    .min(''),
  tipoDocumento:yup
    .string('Ingrese su tipo de documento')
    .required('Tipo de documento es requerido'),
  dni: yup
    .string('Ingrese su DNI')
    .required('DNI requerido'),
  ciudad: yup
    .string('Ingrese su ciudad')
    .min(''),
  nacionalidad: yup
    .string('Ingrese su nacionalidad')
    .min(''),
  provincia: yup
    .string('Ingrese su provincia de residencia')
    .min(''),
  calle: yup
    .string('Ingrese el nombre de su calle')
    .min(''),
  nro: yup
    .string('Ingrese altura'),
  telefono: yup
    .string('Ingrese su telefono de contacto')
    .min(''),
  universidad: yup
    .string('Ingrese el nombre de su Universidad')
    .min(''),
  carrera: yup
    .string('Ingrese su carrera')
    .min(''),
  cantMateriasAprobadas: yup
    .string('Ingrese la cantidad de materias aprobadas')
    .min(''),
  estudios: yup
    .string('Ingrese sus estudios')
    .min(''),
  idiomas: yup
    .string('Elija idiomas')
    .min('')
});

export default function WithMaterialUI () {
  const listaIDs = ['datosPersonales', 'datosAcademicos']
  const [estadoBoton, setEstadoBoton] = useState(true)

  /*Llama a los TIPOS DE DOCUMENTOS para seleccionar en el formulario*/
  const [tiposDocumentos, setTiposDocumentos] = useState([])
  const [llamadoTipoDocumento, setLlamadoTipoDocumento] = useState(false)

  const llamarTipoDocumento = async () => {
    if (llamadoTipoDocumento === false){
      try{
        const api = await fetch(`https://comunidad-de-trabajo.herokuapp.com/tiposDocumentos`);
        const datos = await api.json();
        setTiposDocumentos(datos.tipos_documentos)
        setLlamadoTipoDocumento(true)
        console.log(datos.tipos_documentos)
      } catch (error) {
        console.log(error)
      }
    }
  }
  llamarTipoDocumento()

  /*Llama a las CARRERAS para seleccionar en el formulario*/
  const [listaCarreras, setListaCarreras] = useState([])
  const [llamadoListaCarreras, setLlamadoListaCarreras] = useState(false)
  const llamarCarreras = async () => {
    if (llamadoTipoDocumento === false){
      try{
        const api = await fetch(`https://comunidad-de-trabajo.herokuapp.com/carreras/`);
        const datos = await api.json();
        setListaCarreras(datos.carreras)
        setLlamadoListaCarreras(true)
        console.log(datos.carreras)
      } catch (error) {
        console.log(error)
      }
    }
  }
  llamarCarreras()

  /*Llama a los ESTUDIOS para seleccionar en el formulario*/
  const [listaEstudios, setListaEstudios] = useState([])
  const [llamadoEstudios, setLlamadoEstudios] = useState(false)
  const llamarEstudios = async () => {
    if (llamadoTipoDocumento === false){
      try{
        const api = await fetch(`https://comunidad-de-trabajo.herokuapp.com/estudios/`);
        const datos = await api.json();
        setListaEstudios(datos.estudios)
        setLlamadoEstudios(true)
        console.log(datos.estudios)
      } catch (error) {
        console.log(error)
      }
    }
  }
  llamarEstudios()

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
      setEstadoBoton(false)
    }
  }


  function anterior(){
    if (IdActual != 0){
      ocultarActual()
      mostrarAnterior()
      setIdActual(IdActual - 1)
      setEstadoBoton(true)
    }
  }

  var getLocal = localStorage.getItem("idGuardado")


  const formik = useFormik({
    initialValues: {
      nombre:'',
      apellido:'',
      fechaNac:'',
      tipoDocumento: '',
      dni:'',
      nacionalidad:'',
      provincia: '',
      ciudad:'',
      calle: '',
      nro: '',
      telefono: '',
      carrera: '',
      cantMateriasAprobadas:'',
      idiomas:'',
      estudios:''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      var data ={
        'documento': values.dni,
        'tipoDocumento': values.tipoDocumento, 
        'idUsuario': getLocal,
        'estado': 1,
        'nombre': values.nombre,
        'apellido': values.apellido,
        'nacionalidad': values.nacionalidad,
        'fecha_nac': values.fechaNac,
        'pais':'Argentina',
        'provincia': values.provincia,
        'ciudad': values.ciudad,
        'calle': values.calle,
        'nro': values.nro,
        'telefono': values.telefono,
        'piso': 0,
        'depto':  0, 
        'cp':  '',
        'estudios': 3 /*values.estudios*/,
        'carrera': values.carrera, 
        'cantMaterias': values.cantMateriasAprobadas, 
        'alumnoUnahur': 'false',
        'presentacion': ''
      };
      console.log(values)
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
      padding: '2rem',
      }}
    >
      <form onSubmit={formik.handleSubmit} style={{display:"flex"}}>
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
            id="fechaNac"
            name="fechaNac"
            label="Fecha de nacimiento"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={formik.values.fechaNac}
            onChange={formik.handleChange}
            error={formik.touched.fechaNac && Boolean(formik.errors.fechaNac)}
            helperText={formik.touched.fechaNac && formik.errors.fechaNac}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label-tipoDocumento" style={{margin:'0.7rem'}}>Tipo de documento</InputLabel>
            <Select sx={{margin:'1rem', height:'3rem'}}
              labelId="demo-simple-select-label-tipoDocumento"
              id="tipoDocumento"
              name="tipoDocumento"
              label="Tipo de documento"
              type= "number"
              fullWidth
              value={formik.values.tipoDocumento}
              onChange={formik.handleChange}>
              {
                  tiposDocumentos.map(documento => (
                    <MenuItem value={documento.id}> {documento.id}: {documento.tipo_documento} </MenuItem>
                  ))
              }
            </Select>
          </FormControl>
          <TextField style={{margin:"1rem"}}
            id="dni"
            name="dni"
            label="Numero de documento"
            type= "number"
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
            id="provincia"
            name="provincia"
            label="Provincia"
            fullWidth
            value={formik.values.provincia}
            onChange={formik.handleChange}
            error={formik.touched.provincia && Boolean(formik.errors.provincia)}
            helperText={formik.touched.provincia && formik.errors.provincia}
          />
          <TextField style={{margin:"1rem"}}
            id="ciudad"
            name="ciudad"
            label="Ciudad"
            fullWidth
            value={formik.values.ciudad}
            onChange={formik.handleChange}
            error={formik.touched.ciudad && Boolean(formik.errors.ciudad)}
            helperText={formik.touched.ciudad && formik.errors.ciudad}
          />
          <TextField style={{margin:"1rem"}}
            id="calle"
            name="calle"
            label="Nombre de calle"
            fullWidth
            value={formik.values.calle}
            onChange={formik.handleChange}
            error={formik.touched.calle && Boolean(formik.errors.calle)}
            helperText={formik.touched.calle && formik.errors.calle}
          />
          <TextField style={{margin:"1rem"}}
            id="nro"
            name="nro"
            label="Altura de calle"
            type= "number"
            fullWidth
            value={formik.values.nro}
            onChange={formik.handleChange}
            error={formik.touched.nro && Boolean(formik.errors.nro)}
            helperText={formik.touched.nro && formik.errors.nro}
          />
          <TextField style={{margin:"1rem"}}
            id="telefono"
            name="telefono"
            label="Telefono de contacto"
            type= "number"
            fullWidth
            value={formik.values.telefono}
            onChange={formik.handleChange}
            error={formik.touched.telefono && Boolean(formik.errors.telefono)}
            helperText={formik.touched.telefono && formik.errors.telefono}
          />
        </div>

        <div id='datosAcademicos' style={{display:'none'}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label-estudio" style={{margin:'0.7rem'}}>Estudios</InputLabel>
            <Select sx={{margin:'1rem', height:'3rem'}}
                labelId="demo-simple-select-label-estudio"
                id="estudios"
                name="estudios"
                label="Nivel de estudios"
                type= "number"
                fullWidth
                value={formik.values.estudios}
                onChange={formik.handleChange}>
                {
                    listaEstudios.map(estudios => (
                      <MenuItem value={estudios.id}> {estudios.id}: {estudios.nombre_estudio} {estudios.estado_estudio}</MenuItem>
                    ))
                }
              </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label-carrera" style={{margin:'0.7rem'}}>Carrera</InputLabel>
            <Select sx={{margin:'1rem', height:'3rem'}}
              labelId="demo-simple-select-label-carrera"
              id="carrera"
              name="carrera"
              label="Carrera"
              type= "number"
              fullWidth
              value={formik.values.carrera}
              onChange={formik.handleChange}>
              {
                  listaCarreras.map(cerrera => (
                    <MenuItem value={cerrera.id}> {cerrera.id}: {cerrera.nombre_carrera} </MenuItem>
                  ))
              }
            </Select>
          </FormControl>
          <TextField style={{margin:"1rem"}}
            id="cantMateriasAprobadas"
            name="cantMateriasAprobadas"
            label="Cantidad de materias aprobadas"
            type= "number"
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
            type= "number"
            fullWidth
            value={formik.values.idiomas}
            onChange={formik.handleChange}
            error={formik.touched.idiomas && Boolean(formik.errors.idiomas)}
            helperText={formik.touched.idiomas && formik.errors.idiomas}
          />
          <FormControlLabel control={<Checkbox defaultChecked />}
            label="Alumno UnaHur"
            id="alumnoUnahur"
            name="alumnoUnahur"
            type= "checkbox"
            value={formik.values.alumnoUnahur}
            onChange={formik.handleChange}
            error={formik.touched.alumnoUnahur && Boolean(formik.errors.alumnoUnahur)}
            helperText={formik.touched.alumnoUnahur && formik.errors.alumnoUnahur}
          />
        </div>
        {
          IdActual == listaIDs.length - 1
          ?
          <Box sx={{display:"flex", justifyContent:'center', flexDirection:"row"}}>
          <Button style={{display:'flex', margin:"1rem"}} color="primary" variant="contained" onClick={anterior}>
            Anterior
          </Button>
          <Button style={{display:'flex', margin:"1rem"}} id='confirmar' variant="contained" type='submit'>
            Confirmar
          </Button>
          </Box>
          :
          <div></div>
        }
      </form>
    </div>
      {
          IdActual != listaIDs.length - 1
          ?
          <Box sx={{display:'flex', justifyContent:"center", flexDirection:"row" }}>
            <Button style={{display:'flex', margin:"1rem"}} color="primary" variant="contained" disabled={estadoBoton} onClick={anterior}>
              Anterior
            </Button>
            <Button style={{display:'flex', margin:"1rem"}} color="primary" variant="contained" onClick={siguiente} disabled={estadoSiguiente}>
              Siguiente
            </Button>
         </Box>
         :
         <Box></Box>
      }
    </Fragment>
  );
};
