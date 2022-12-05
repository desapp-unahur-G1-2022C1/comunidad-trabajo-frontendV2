import React, { Fragment } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from "@mui/material/Typography";
import Header from "../Header";
import { useContext } from 'react';
import IdFormContext from '../../Context/IdFormContext';
import { useHistory } from 'react-router-dom';

function guardarId(id){
sessionStorage.setItem("idGuardado", id);
}



const validationSchema = yup.object({
  email: yup
    .string('Ingrese su email')
    .email('Ingrese un email valido')
    .required('El email es requerido'),
  password: yup
    .string('Ingrese su contraseña')
    .min(8, 'La contraseña debe tener como minimo 8 caracteres')
    .required('La contraseña es requerida'),
});

export default function WithMaterialUI () {
  const history = useHistory()
  const {id, cambiarId} = useContext(IdFormContext)
  console.log(id)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
      var data = {'usuario': values.email, 'password': values.password};
      fetch('https://comunidad-backend-v3.herokuapp.com/usuarios/signup/', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response, cambiarId(response.id), history.push('/registroPregunta')));
    },
  });
  
  return (
    <Fragment>
      <Header />
      <Typography variant="h4" sx={{display: "flex", justifyContent:"center", margin:"2rem"}}>
        Registro de Usuario
      </Typography>
    <div 
    style={{
      textAlign:'center',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      flexDirection: "column",
      
      }}
    >
        <form onSubmit={formik.handleSubmit} style={{width:"50%", padding:'2rem'}}>
            <TextField style={{margin:"1rem"}}
                variant="outlined"
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
            variant="outlined"
                id="password"
                name="password"
                label="Password"
                type="password"
               
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
