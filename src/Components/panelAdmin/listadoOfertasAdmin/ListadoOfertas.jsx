import React, { Fragment, useState} from 'react'

import Header from "../../Header"
import { Pagination } from '@mui/material';
import BarraBusquedaOfertas from './BarraBusquedaOfertas';
import ListaOfertas from './ListaOfertas';
import BusquedaNoEncontrada from './BusquedaNoEncontrada';

const ListadoOfertas = () => {


    const [llamado, setLlamado] = useState(false);
    const [ofertas, setOfertas] = useState([]);
    const [cantPaginas, setCantPaginas] = useState(0);
    const [pagina, setPagina] = useState(1);

    const API_URL = `https://comunidad-backend-v3.herokuapp.com/ofertas/?pagina=0&limite=3`;

    const primerLlamado = async () => {
        if(llamado === false){
            try{
                const api = await fetch(API_URL);
                const datos = await api.json();
                setLlamado(true)
                setOfertas(datos.ofertas.rows)
                setCantPaginas(datos.totalPaginas)
                
            }
            catch(error){
                console.log(error)
            }
        }
    }

    const traerOfertas = async (e, p) => {
        try{
            e.preventDefault()
            const {usuario} = e.target.elements;
            const usuarioValue = usuario.value;
            const api = await fetch(`https://comunidad-backend-v3.herokuapp.com/ofertas/?pagina=${p - 1}&limite=3&buscarTitulo=${usuarioValue}`);
            const datos = await api.json();
            console.log(datos)
            setOfertas(datos.ofertas.rows)
            setCantPaginas(datos.totalPaginas)
            console.log(ofertas)
        }
        catch(err){
            console.log(err)
        }
    }

    const cambiarPagina = async (e, p) => {
        
        const api = await fetch(`https://comunidad-backend-v3.herokuapp.com/ofertas/?pagina=${p - 1}&limite=3&ordenar=id`);
        const datos = await api.json();
        setOfertas(datos.ofertas.rows);
        setPagina(p)
        console.log(datos.ofertas.rows)
    }


    primerLlamado()
    return (  
        <Fragment>
            <Header/>
            <BarraBusquedaOfertas
            traerOfertas={traerOfertas}/>
            {ofertas.length === 0 && llamado === true ?
            <BusquedaNoEncontrada/> :
            <ListaOfertas
            ofertas={ofertas}/>}
            <Pagination color="primary" count={cantPaginas} page={pagina} onChange={cambiarPagina} sx={{display:"flex", justifyContent:"center", margin:"1rem"}}/>
        </Fragment>
    );
}
 
export default ListadoOfertas;