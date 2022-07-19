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
import { Navigation, TextFieldsOutlined } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function guardarId(id){
localStorage.setItem("idGuardado", id);
}

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export default function WithMaterialUI () {


  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
      var data = {'usuario': values.email, 'password': values.password};
      fetch('https://comunidad-de-trabajo.herokuapp.com/usuarios/signup/', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response, guardarId(response.id), window.location.replace('/registroPregunta')));
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
      }}
    >
        <form onSubmit={formik.handleSubmit} style={{width:"50%", padding:'2rem'}}>
            <TextField style={{margin:"1rem"}}
                id="email"
                name="email"
                label="Email"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)  && true}
                helperText={formik.touched.email && formik.errors.email}
            />
            <TextField  style={{margin:"1rem"}}
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="standard"
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)  && true}
                helperText={formik.touched.password && formik.errors.password}
            />
            
            <Button id='confirmar' variant="contained" type='submit'>
                Siguiente
            </Button>
        </form>
    </div>
    </Fragment>
  );
};
