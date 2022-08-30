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
import IdFormContext from '../../Context/IdFormContext';
import { useContext } from 'react';
import { useHistory } from "react-router-dom";

const validationSchema = yup.object({
  nombreEmpresa: yup
    .string("Ingrese su un titulo para la oferta")
    .min(1, "Este campo no puede estar vacio")
    .optional("El titulo de la oferta requerido"),
  cuit: yup
    .string("Ingrese una cuit a la cuit")
    .min(1, "Este campo no puede estar vacio")
    .optional("cuit requerido"),
  descripcion: yup
    .string("Ingrese su horario laboral desde")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  descripcion: yup
    .string("Ingrese su horario laboral hasta")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  ciudad: yup
    .string("Ingrese su edad hasta")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  provincia: yup
    .string("Ingrese su edad desde de residencia")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  calle: yup
    .string("cuit de experiencia previa")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  nro: yup
    .number("Ingrese altura")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  piso: yup
    .string("Ingrese su piso de contacto")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  depto: yup
    .string("Ingrese otros detalles de la oferta")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  cp: yup
    .string("Ingrese otros detalles de la oferta")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  telefono: yup
    .number("Ingrese la telefono")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  web: yup
    .string("Ingrese la web")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  nombreRepresentante: yup
    .string("Ingrese la nombreRepresentante")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  emailRepresentante: yup
    .string("Ingrese la emailRepresentante")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
});


export default function WithMaterialUI() {
  const history = useHistory()
  const {id} = useContext(IdFormContext)

  const formik = useFormik({
    initialValues: {
      nombreEmpresa: "",
      cuit: "",
      descripcion: "",
      pais: "",
      provincia: "",
      ciudad: "",
      calle: "",
      nro: "",
      piso: "",
      depto: "",
      cp: "",
      telefono: undefined,
      web: "",
      nombreRepresentante: "",
      emailRepresentante: "",
      idUsuario: id,
      idRubro: 1,
      idEstado: 1,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      var data = {
        idUsuario: id,
        idRubro: 1,
        idEstado: 2,
        nombreEmpresa: values.nombreEmpresa,
        cuit: values.cuit,
        descripcion: values.descripcion,
        pais: values.pais,
        provincia: values.provincia,
        ciudad: values.ciudad,
        calle: values.calle,
        nro: values.nro,
        piso: values.piso,
        depto: values.depto,
        cp: values.cp,
        telefono: values.telefono,
        web: values.web,
        nombreRepresentante: values.nombreRepresentante,
        emailRepresentante: values.emailRepresentante,
      };
      console.log(values);
        fetch("https://comunidad-backend-v3.herokuapp.com/empresas/", {
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
          title: 'La empresa fue creada exitosamente',
          confirmButtonText: 'Finalizar',
          text: 'Para continuar pulse el boton',
          footer: '',
          showCloseButton: true
        })
        .then(function (result) {
          if (result.value) {
              history.push('/')
          }
        })))
        .catch((error) => console.error("Error:", error,
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un error al crear la empresa',
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
                  id="nombreEmpresa"
                  name="nombreEmpresa"
                  label="Nombre de la empresa"
                  fullWidth
                  value={formik.values.nombreEmpresa}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.nombreEmpresa &&
                    Boolean(formik.errors.nombreEmpresa) &&
                    true
                  }
                  helperText={formik.touched.nombreEmpresa && formik.errors.nombreEmpresa}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  variant="outlined"
                  id="cuit"
                  name="cuit"
                  label="Cuit"
                  fullWidth
                  type='number'
                  value={formik.values.cuit}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.cuit &&
                    Boolean(formik.errors.cuit) &&
                    true
                  }
                  helperText={formik.touched.cuit && formik.errors.cuit}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="descripcion"
                  name="descripcion"
                  label="Descripcion"
                  fullWidth
                  variant="outlined"
                  value={formik.values.descripcion}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.descripcion && Boolean(formik.errors.descripcion) && true
                  }
                  helperText={formik.touched.descripcion && formik.errors.descripcion}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="pais"
                  name="pais"
                  label="Pais"
                  variant="outlined"
                  fullWidth
                  value={formik.values.pais}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.pais &&
                    Boolean(formik.errors.pais)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="ciudad"
                  name="ciudad"
                  label="Ciudad"
                  variant="outlined"
                  fullWidth
                  value={formik.values.ciudad}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.ciudad && Boolean(formik.errors.ciudad)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="provincia"
                  name="provincia"
                  variant="outlined"
                  label="Provincia"
                  fullWidth
                  value={formik.values.provincia}
                  onChange={formik.handleChange}
                  error={formik.touched.provincia && Boolean(formik.errors.provincia)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="calle"
                  name="calle"
                  variant="outlined"
                  label="Calle"
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
                  label="Numero"
                  fullWidth
                  type='number'
                  value={formik.values.nro}
                  onChange={formik.handleChange}
                  error={formik.touched.nro && Boolean(formik.errors.nro)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="piso"
                  name="piso"
                  variant="outlined"
                  label="Piso"
                  fullWidth
                  type='number'
                  value={formik.values.piso}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.piso && Boolean(formik.errors.piso)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="depto"
                  name="depto"
                  variant="outlined"
                  label="Depto"
                  fullWidth
                  value={formik.values.depto}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.depto && Boolean(formik.errors.depto)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="cp"
                  name="cp"
                  variant="outlined"
                  label="Codigo postal"
                  fullWidth
                  type='number'
                  value={formik.values.cp}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.cp && Boolean(formik.errors.cp)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="telefono"
                  name="telefono"
                  variant="outlined"
                  label="Telefono"
                  fullWidth
                  type="number"
                  value={formik.values.telefono}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.telefono && Boolean(formik.errors.telefono)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="web"
                  name="web"
                  variant="outlined"
                  label="Web"
                  fullWidth
                  value={formik.values.web}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.web && Boolean(formik.errors.web)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="nombreRepresentante"
                  name="nombreRepresentante"
                  variant="outlined"
                  label="Nombre representante"
                  fullWidth
                  value={formik.values.nombreRepresentante}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.nombreRepresentante && Boolean(formik.errors.nombreRepresentante)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="emailRepresentante"
                  name="emailRepresentante"
                  variant="outlined"
                  label="Email del representante"
                  fullWidth
                  value={formik.values.emailRepresentante}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.emailRepresentante && Boolean(formik.errors.emailRepresentante)
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
