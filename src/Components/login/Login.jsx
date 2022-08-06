import { FormControl, TextField, Box, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { useState } from 'react';
import Header from "../Header"
import Button from '@mui/material/Button';
import axios from "axios"
import { Link} from "react-router-dom"

const Login = () => {

    const [body, setBody] = useState({usuario:'', password:''})

    const inputChange = ({target}) => {
    
        const {name, value} = target
        setBody({
            ...body,
            [name]: value
        })
    }

    async function traerDatosLogeado(id){
        await axios.get(`https://comunidad-de-trabajo.herokuapp.com/usuariosPostulantes/${id}`)
        .then(({data}) => {
            setIdUsuario(id)
            console.log(data)
            setDatosUsuario(data)
        })
    }
    
    const [idUsuario, setIdUsuario] = useState();
    const [token, setToken] = useState("");
    const [estaLogeado, setEstaLogeado] = useState(false);
    const [datosUsuario, setDatosUsuario] = useState([]);


    const handleSubmit= () => {
        axios.post('https://comunidad-de-trabajo.herokuapp.com/usuarios/signin', body)
        .then(({data}) => {
            console.log(data)
            setToken(data.token)
            setEstaLogeado(true)
            traerDatosLogeado(data.id)
        })
        .catch(({response}) => console.log(response.data))
    }

    return ( 
        <Fragment>
            <Header/>
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
                <Typography> {datosUsuario.nombre}, {datosUsuario.apellido} logeado </Typography>
            </form></Box>
            <Box sx={{display:"flex", justifyContent:"center"}}>
          <Link to="/recuperarContrasena"style={{ textDecoration: 'none'}}><Typography sx={{display:"flex", margin:"0.5rem", justifyContent:"flex-start", color:"#3f50b5"}}>¿Olvidaste tu contraseña?</Typography></Link>
          <Link to="/registroUsuario"style={{ textDecoration: 'none'}}><Typography sx={{display:"flex", margin:"0.5rem", justifyContent:"flex-end", color:"#3f50b5"}}>Registrate</Typography></Link>
        </Box>
            
        </Fragment>
     );
}
 
export default Login;