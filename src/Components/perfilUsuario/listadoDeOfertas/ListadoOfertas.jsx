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
    var datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'))
    var token = localStorage.getItem('token')
    var idUsuario = localStorage.getItem('idUsuario')
    var grupo =  localStorage.getItem('grupo')
    var estaLogeado = localStorage.getItem('estaLogeado')

    const [llamado, setLlamado] = useState(false);
    const [Ofertas, setOfertas] = useState([]);

    const API_URL = `https://comunidad-backend-v3.herokuapp.com/ofertas/cuit/30712116608/`

    const primerLlamado = async () => {
        if(llamado === false){
            try{
            const api = await fetch(API_URL);
            const datos = await api.json();
            setLlamado(true)
            setOfertas(datos)
            console.log(datos)
            
            }
            catch(error){
                console.log(error)
            }
        }
    }

    const traerOfertas = async (e) => {
        try{
            e.preventDefault()
            const {usuario} = e.target.elements;
            const usuarioValue = usuario.value;
            const api = await fetch(`https://comunidad-de-trabajo.herokuapp.com/usuariosOfertas/?buscarApellido=${usuarioValue}`);
            const datos = await api.json();
            console.log(datos.Ofertas.rows)
            setOfertas(datos.Ofertas.rows)
            
            
        }
        catch(err){
            console.log(err)
        }
    }

    primerLlamado()
    return (  
        <Fragment>
            <Header/>
            <BarraBusquedaOfertas
            traerOfertas={traerOfertas}/>
            {Ofertas.length === 0 && llamado === true ?
            <BusquedaNoEncontrada/> :
            <ListaOfertas
            Ofertas={Ofertas}/>
            }
        </Fragment>
    );
}
 
export default ListadoOfertas;