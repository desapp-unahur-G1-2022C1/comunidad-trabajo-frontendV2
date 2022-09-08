import { FormControl, TextField, Box, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { useState } from 'react';
import Header from "../Header"
import Button from '@mui/material/Button';
import axios from "axios"
import { Link, useHistory} from "react-router-dom"
import DatosUsuarioContextProvider from '../../Context/DatosUsuarioContext';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { CopyAll } from '@mui/icons-material';

const Login = () => {

    const {cambiarDatosUsuario, cambiarToken, cambiarIdUsuario, cambiarEstadoLogeado, cambiarGrupo} = useContext(DatosUsuarioContextProvider)
    var datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario'))
    var token = sessionStorage.getItem('token')
    var idUsuario = sessionStorage.getItem('idUsuario')
    var grupo =  sessionStorage.getItem('grupo')
    var estaLogeado = sessionStorage.getItem('estaLogeado')

    const [body, setBody] = useState({usuario:'', password:''})

    const inputChange = ({target}) => {
    
        const {name, value} = target
        setBody({
            ...body,
            [name]: value
        })
    }
    const history = useHistory()
    const handleSubmit = async () => {
        await axios.post('https://comunidad-backend-v3.herokuapp.com/usuarios/signin', body)
        .then(({data}) => {
            console.log(data)
            cambiarToken(data.token)
            cambiarGrupo(data.grupo)
        if (data.estado == false){
            Swal.fire({
                icon: 'error',
                title: 'Su cuenta aun no se encuentra activa',
                confirmButtonText: 'Volver',
                text: 'Verifique sus datos',
                footer: '',
                showCloseButton: true
              })
        }
        else if (data.grupo == 1){
            axios.get(`https://comunidad-backend-v3.herokuapp.com/postulantes/idUsuario/${data.id}`)
            .then(({data}) => {
                cambiarEstadoLogeado(true)
                cambiarIdUsuario(data.id)
                cambiarDatosUsuario(data)
                console.log(data)
                history.push("/")
            })
        }
        else if (data.grupo == 2){
            axios.get(`https://comunidad-backend-v3.herokuapp.com/empresas/idUsuario/${data.id}`)
            .then(({data}) => {
                    cambiarEstadoLogeado(true)
                    cambiarIdUsuario(data.id)
                    cambiarDatosUsuario(data)
                    console.log(data)
                    history.push("/")
            })
        }
        else if(data.grupo == 3){
            cambiarEstadoLogeado(true)
            cambiarIdUsuario(data.id)
            history.push("/")
        } else{
            Swal.fire({
                icon: 'error',
                title: 'Su grupo de usuario no es valido',
                confirmButtonText: 'Volver',
                text: 'Verifique sus datos',
                footer: '',
                showCloseButton: true
              })
        }
        })
        .catch(({response}) => {
            Swal.fire({
                icon: 'error',
                title: 'Los datos ingresados no son incorrectos!',
                confirmButtonText: 'Volver',
                text: 'Verifique sus datos',
                footer: '',
                showCloseButton: true
              })
        })
    }
    return ( 
        <Fragment>
            <Header datosUsuario={datosUsuario}
            estaLogeado={estaLogeado}/>
            <Typography sx={{display:"flex", justifyContent:"center", margin:"2rem"}} variant='h4'> Iniciar sesión </Typography>
            <Box sx={{display:"flex", justifyContent:"center", margin:"2rem", }}>
                <form onSubmit="#">
                <Box sx={{display:"flex", flexDirection:"column", margin:"1.5rem", width:"20rem" }}><TextField 
                type="text"
                value={body.usuario}
                name="usuario"
                placeholder='Usuario'
                onChange={inputChange}
                >
                </TextField></Box>
                <Box sx={{display:"flex", flexDirection:"column", margin:"1.5rem"}}><TextField
                type="password"
                value={body.password}
                name="password"
                placeholder='Contraseña'
                onChange={inputChange}
                >
                </TextField></Box>
                <Box sx={{display:"flex", justifyContent:"center", margin:"1.5rem"}}><Button fullWidth color='relaxed' onClick={handleSubmit}  variant="contained">
                    Ingresar
                </Button></Box>
            </form></Box>
            <Box sx={{display:"flex", justifyContent:"center"}}>
          <Link to="/recuperarContrasena"style={{ textDecoration: 'none'}}><Typography sx={{display:"flex", margin:"0.5rem", justifyContent:"flex-start", color:"#3f50b5"}}>¿Olvidaste tu contraseña?</Typography></Link>
          <Link to="/registroUsuario"style={{ textDecoration: 'none'}}><Typography sx={{display:"flex", margin:"0.5rem", justifyContent:"flex-end", color:"#3f50b5"}}>Registrate</Typography></Link>
        </Box>
            
        </Fragment>
     );
}
 
export default Login;