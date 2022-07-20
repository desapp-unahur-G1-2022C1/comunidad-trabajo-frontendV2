import React, { Fragment, useState} from 'react'
import { TextField } from '@mui/material/TextField';
import { Button } from '@mui/material/Button';
import { Box } from '@mui/system';
import Header from "../../Header"
import { Grid, Typography } from '@mui/material';
import BarraBusquedaPostulantes from './BarraBusquedaPostuluantes';
import ListaPostulantes from './ListaPostulantes';
import BusquedaNoEncontrada from './BusquedaNoEncontrada';

const ListadoPostulantes = () => {


    const [llamado, setLlamado] = useState(false);
    const [postulantes, setPostulantes] = useState([]);

    const API_URL = `https://comunidad-de-trabajo.herokuapp.com/usuariosPostulantes/`

    const primerLlamado = async () => {
        if(llamado === false){
            try{
            const api = await fetch(API_URL);
            const datos = await api.json();
            setLlamado(true)
            setPostulantes(datos.postulantes.rows)
            
            }
            catch(error){
                console.log(error)
            }
        }
    }

    const traerPostulantes = async (e) => {
        try{
            e.preventDefault()
            const {usuario} = e.target.elements;
            const usuarioValue = usuario.value;
            const api = await fetch(`https://comunidad-de-trabajo.herokuapp.com/usuariosPostulantes/?buscarApellido=${usuarioValue}`);
            const datos = await api.json();
            console.log(datos.postulantes.rows)
            setPostulantes(datos.postulantes.rows)
            
            
        }
        catch(err){
            console.log(err)
        }
    }

    primerLlamado()
    return (  
        <Fragment>
            <Header/>
            <BarraBusquedaPostulantes
            traerPostulantes={traerPostulantes}/>
            {postulantes.length === 0 && llamado === true ?
            <BusquedaNoEncontrada/> :
            <ListaPostulantes
            postulantes={postulantes}/>
            }
            
            
        </Fragment>
    );
}
 
export default ListadoPostulantes;