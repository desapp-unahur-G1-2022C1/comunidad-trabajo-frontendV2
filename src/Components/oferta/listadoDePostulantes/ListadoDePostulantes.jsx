import React, { Fragment, useState} from 'react'
import { TextField } from '@mui/material/TextField';
import { Button } from '@mui/material/Button';
import { Box } from '@mui/system';
import Header from "../../Header"
import { Grid, Typography } from '@mui/material';
import BarraBusquedaPostulantes from './BarraBusquedaPostulantes';
import ListaPostulantes from './ListaPostulantes';
import BusquedaNoEncontrada from './BusquedaNoEncontrada';
import DatosUsuarioContextProvider from '../../../Context/DatosUsuarioContext';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../../NotFound';

const ListadoPostulantes = () => {

    const {datosUsuario, cambiarDatosUsuario, token, cambiarToken, idUsuario, cambiarIdUsuario, estaLogeado, cambiarEstadoLogeado, grupo, cambiarGrupo} = useContext(DatosUsuarioContextProvider)

    const [llamado, setLlamado] = useState(false);
    const [postulantes, setPostulantes] = useState([]);
    const { id } = useParams();
    const API_URL = `https://comunidad-backend-v3.herokuapp.com/postulacionesId/oferta/?pagina=0&limite=10&id=${id}`

    const primerLlamado = async () => {
        if(llamado === false){
            try{
            const api = await fetch(API_URL);
            const datos = await api.json();
            setLlamado(true)
            setPostulantes(datos.postulaciones.rows)
            console.log(datos.postulaciones.rows)
            }
            catch(error){
                console.log(error)
            }
        }
    }

    /*const traerPostulantes = async (e) => {
        try{
            e.preventDefault()
            const {usuario} = e.target.elements;
            const usuarioValue = usuario.value;
            const api = await fetch(`https://comunidad-de-trabajo.herokuapp.com/usuariosPostulantes/?buscarApellido=${usuarioValue}`);
            const datos = await api.json();
            console.log(datos.Postulantes.rows)
            setPostulantes(datos.Postulantes.rows)
            
            
        }
        catch(err){
            console.log(err)
        }
    }*/

    const traerOferta = `https://comunidad-de-trabajo.herokuapp.com/ofertas/${id}`;
    const [idEmpresa, setIdEmpresa] = useState('')
    const traerIdEmpresa = async () => {
      try {
        const api = await fetch(traerOferta);
        const datos = await api.json();
        setIdEmpresa(datos.fk_id_empresa);
      } catch (error) {
        console.log(error);
      }
    };
    
    primerLlamado()
    traerIdEmpresa()
    return (  
        <Fragment>
            {
            grupo == 2 
                ?
                datosUsuario.id == idEmpresa
                ?
                <Box>
                <Header/>
                <ListaPostulantes
                postulantes={postulantes}/>
                </Box>
                :
                <Box></Box>
                :
            <NotFound></NotFound>
            }
        </Fragment>
    );
}
 
export default ListadoPostulantes;