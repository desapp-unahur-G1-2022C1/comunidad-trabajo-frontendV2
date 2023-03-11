import { Box } from '@mui/material'
import React from 'react'
import Header from '../../Header'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import NotFound from '../../NotFound'
import {Typography} from '@mui/material'
import ListaPostulantesDeOfertaAdmin from './ListaPostulantesDeOfertaAdmin'

export default function PostulantesDeOfertaAdmin() {

    var datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario'))
    var token = sessionStorage.getItem('token')
    var idUsuario = sessionStorage.getItem('idUsuario')
    var grupo = sessionStorage.getItem('grupo')
    var estaLogeado = sessionStorage.getItem('estaLogeado')



    const [llamado, setLlamado] = useState(false);
    const [postulantes, setPostulantes] = useState([]);
    const [ofertaActual, setOfertaActual] = useState([]);
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

    const API_OFERTA = `https://comunidad-backend-v3.herokuapp.com/ofertas/idOferta/${id}`;
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
    <>
        <Header/>
        <Box>
        {
            grupo == 3
                ?
                <Box>
                <Typography variant="h4" sx={{display:"flex", justifyContent:"center", margin:"1rem"}}> Postulantes a {ofertaActual.titulo_oferta} </Typography>
                <ListaPostulantesDeOfertaAdmin 
                  postulantes={postulantes}
                />
                </Box>
                :
                
                
            <NotFound/>
            }
        </Box>
    </>
  )
}
