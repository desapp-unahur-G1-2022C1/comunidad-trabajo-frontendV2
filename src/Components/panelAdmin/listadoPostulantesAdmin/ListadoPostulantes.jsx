import React, { Fragment, useState} from 'react'

import Header from "../../Header"
import { Pagination, Typography } from '@mui/material';
import BarraBusquedaPostulantes from './BarraBusquedaPostulantes';
import ListaPostulantes from './ListaPostulantes';
import BusquedaNoEncontrada from './BusquedaNoEncontrada';
import { Box } from '@mui/system';
const ListadoPostulantes = () => {


    const [llamado, setLlamado] = useState(false);
    const [postulantes, setPostulantes] = useState([]);
    const [cantPaginas, setCantPaginas] = useState(0);
    const [pagina, setPagina] = useState(1);
    const [busquedaActual, setBusquedaActual] = useState('');
    const API_URL = `https://comunidad-backend-v3-production.up.railway.app/postulantes/?pagina=0&limite=6&ordenar=id`;

    const primerLlamado = async () => {
        if(llamado === false){
            try{
                const api = await fetch(API_URL);
                const datos = await api.json();
                setLlamado(true)
                setPostulantes(datos.postulantes.rows)
                setCantPaginas(datos.totalPaginas)
            }
            catch(error){
                console.log(error)
            }
        }
    }

    const traerPostulantes = async (e, p) => {
        try{
            e.preventDefault()
            const {usuario} = e.target.elements;
            const usuarioValue = usuario.value;
            setBusquedaActual(usuarioValue)
            const api = await fetch(`https://comunidad-backend-v3-production.up.railway.app/postulantes/?pagina=0&limite=6&ordenar=id&buscarPostulante=${usuarioValue}`);
            const datos = await api.json();
            console.log(datos)
            setPagina(1)
            setPostulantes(datos.postulantes.rows)
            setCantPaginas(datos.totalPaginas)
            console.log(postulantes)
        }
        catch(err){
            console.log(err)
        }
    }

    const cambiarPagina = async (e, p) => {
        
        const api = await fetch(`https://comunidad-backend-v3-production.up.railway.app/postulantes/?pagina=${p - 1}&limite=6&ordenar=id&buscarPostulante=${busquedaActual}`);;
        const datos = await api.json();
        setPostulantes(datos.postulantes.rows);
        setPagina(p)
        console.log(datos.ofertas.rows)
    }


    primerLlamado()
    return (  
        <Fragment>
            <Header/>
            <Box sx={{ display: "flex", justifyContent:"space-evenly",  alignItems:"center"}}>
                <Typography variant="h4" sx={{textAlign: "center", margin: "1rem" }}>Listado de postulantes</Typography>
                <BarraBusquedaPostulantes
            traerPostulantes={traerPostulantes}/>
            </Box>
            {postulantes.length === 0 && llamado === true ?
            <BusquedaNoEncontrada/> :
            <ListaPostulantes
            postulantes={postulantes}/>}
            <Pagination color="primary" count={cantPaginas} page={pagina} onChange={cambiarPagina} sx={{display:"flex", justifyContent:"center", margin:"1rem"}}/>
        
            
            
        </Fragment>
    );
}
 
export default ListadoPostulantes;