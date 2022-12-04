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

    const {cambiarDatosUsuario, cambiarToken, cambiarIdUsuario, cambiarEstadoLogeado, cambiarGrupo} = useContext(DatosUsuarioContextProvider)
    var datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario'))
    var token = sessionStorage.getItem('token')
    var idUsuario = sessionStorage.getItem('idUsuario')
    var grupo = sessionStorage.getItem('grupo')
    var estaLogeado = sessionStorage.getItem('estaLogeado')

    const [llamado, setLlamado] = useState(false);
    const [postulantes, setPostulantes] = useState([]);
    const [ofertaActual, setOfertaActual] = useState([]);
    const { id } = useParams();
    const API_URL = `https://comunidad-backend-v3-production.up.railway.app/postulacionesId/oferta/?pagina=0&limite=10&id=${id}`

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



    const API_OFERTA = `https://comunidad-backend-v3-production.up.railway.app/ofertas/idOferta/${id}`;
    const [idEmpresa, setIdEmpresa] = useState('')
    const traerIdEmpresa = async () => {
      try {
        const api = await fetch(API_OFERTA);
        const datos = await api.json();
        setOfertaActual(datos)
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
                <Typography variant="h4" sx={{display:"flex", justifyContent:"center", margin:"1rem"}}> Postulantes a {ofertaActual.titulo_oferta} </Typography>
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