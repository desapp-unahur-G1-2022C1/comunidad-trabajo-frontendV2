import { FormControl, TextField } from '@mui/material';
import React, { Fragment } from 'react';
import { useState } from 'react';
import Header from "../Header"
import Button from '@mui/material/Button';
import axios from "axios"
const Login = () => {

    const [body, setBody] = useState({usuario:'', password:''})

    const inputChange = ({target}) => {
    
        const {name, value} = target
        setBody({
            ...body,
            [name]: value
        })
    }
    
    const handleSubmit= () => {
        axios.post('https://comunidad-de-trabajo.herokuapp.com/usuarios/signin', body)
        .then(({data}) => {
            console.log(data)
        })
        .catch(({response})=> console.log(response.data))
    }
 
    
    return ( 
        <Fragment>
            <Header/>
            <form onSubmit="#">
                <TextField
                type="text"
                value={body.usuario}
                name="usuario"
                placeholder='Usuario'
                onChange={inputChange}
                >
                </TextField>
                
                <TextField
                type="password"
                value={body.password}
                name="password"
                placeholder='Contraseña'
                onChange={inputChange}
                >
                </TextField>
                <Button onClick={handleSubmit}>
                    Ingresar
                </Button>
            </form>
            
        </Fragment>
     );
}
 
export default Login;