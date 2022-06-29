import * as React from "react";
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
    if (IdActual != listaIDs.length - 1){
      ocultarActual()
      mostrarSiguiente()
      IdActual = IdActual + 1
    }
  }


  function anterior(){
    
    if (IdActual != 0){
      ocultarActual()
      mostrarAnterior()
      IdActual = IdActual - 1
    }
  }


  const [nombreCampo, setNombreCampo] = React.useState("");
  const [nombreLeyenda, setNombreLeyenda] = React.useState("");
  const [errorNombre, setErrorNombre] = React.useState(false);

  const [apellidoCampo, setApellidoCampo] = React.useState("");
  const [apellidoLeyenda, setApellidoLeyenda] = React.useState("");
  const [errorApellido, setErrorApellido] = React.useState(false);

  const [dniCampo, setDniCampo] = React.useState("");
  const [dniLeyenda, setDniLeyenda] = React.useState("");
  const [errorDni, setErrorDni] = React.useState(false);

  return (
    <React.Fragment>
      <Header />

      <div id='datosLogin'>
        <TextField
              id="Email"
              name="Email"
              label="Email"
              fullWidth
              variant="standard"
        />
        <TextField
              id="Contra"
              name="Contra"
              label="Contra"
              fullWidth
              variant="standard"
        />
      </div>

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
            fullWidth
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
            fullWidth
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
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="fechaNacimiento"
            name="fechaNacimiento"
            label="Fecha de nacimiento"
            fullWidth
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
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="provincia"
            name="provincia"
            label="Provincia"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="localidad"
            name="localidad"
            label="Localidad"
            fullWidth
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
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="universidad"
            name="universidad"
            label="Universidad"
            fullWidth
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
            fullWidth
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
            fullWidth
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
            fullWidth
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
        <Button variant="contained" color="relaxed" onClick={siguiente}>
          Siguiente
        </Button>
      </Box>
    </React.Fragment>
  );
}