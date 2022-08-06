import React, { Fragment, useState} from 'react'
import { TextField } from '@mui/material/TextField';
import { Button } from '@mui/material/Button';
import { Box } from '@mui/system';
import Header from "../../Header"
import { Grid, Typography } from '@mui/material';
import BarraBusquedaOfertas from './BarraBusquedaOfertas';
import ListaOfertas from './ListaOfertas';
import BusquedaNoEncontrada from './BusquedaNoEncontrada';

const ListadoOfertas = () => {


    const [llamado, setLlamado] = useState(false);
    const [Ofertas, setOfertas] = useState([]);

    const API_URL = `https://comunidad-de-trabajo.herokuapp.com/ofertasPorEmpresa/30100552408/`

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
    console.log(Ofertas)
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