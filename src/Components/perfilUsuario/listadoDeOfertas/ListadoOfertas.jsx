import React, { Fragment, useState} from 'react'
import { TextField } from '@mui/material/TextField';
import { Button } from '@mui/material/Button';
import { Box } from '@mui/system';
import Header from "../../Header"
import { Grid, Typography } from '@mui/material';
import BarraBusquedaOfertas from './BarraBusquedaOfertas';
import ListaOfertas from './ListaOfertas';
import BusquedaNoEncontrada from './BusquedaNoEncontrada';
import DatosUsuarioContextProvider from '../../../Context/DatosUsuarioContext';
import { useContext } from 'react';

const ListadoOfertas = () => {

    const {cambiarDatosUsuario, cambiarToken, cambiarIdUsuario, cambiarEstadoLogeado, cambiarGrupo} = useContext(DatosUsuarioContextProvider)
    var datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario'))
    var token = sessionStorage.getItem('token')
    var idUsuario = sessionStorage.getItem('idUsuario')
    var grupo =  sessionStorage.getItem('grupo')
    var estaLogeado = sessionStorage.getItem('estaLogeado')

    const [llamado, setLlamado] = useState(false);
    const [Ofertas, setOfertas] = useState([]);

    const API_URL = `https://comunidad-backend-v3.herokuapp.com/postulacionesId/postulante/?pagina=0&limite=10&id=${datosUsuario.id}`

    const primerLlamado = async () => {
        if(llamado === false){
            try{
            const api = await fetch(API_URL);
            const datos = await api.json();
            setLlamado(true)
            setOfertas(datos.postulaciones.rows)
            console.log(datos.postulaciones.rows)
            
            }
            catch(error){
                console.log(error)
            }
        }
    }

    primerLlamado()
    return (  
        <Fragment>
            <Header/>
            <BarraBusquedaOfertas/>
            <ListaOfertas
            Ofertas={Ofertas}/>
        </Fragment>
    );
}
 
export default ListadoOfertas;