import React, { Fragment, useState } from 'react'

import Header from "../../Header"
import { Box, Button, Pagination } from '@mui/material';
import BarraBusquedaOfertas from './BarraBusquedaOfertas';
import ListaOfertas from './ListaOfertas';
import BusquedaNoEncontrada from './BusquedaNoEncontrada';
import { Link } from 'react-router-dom';

const ListadoOfertas = () => {


    const [llamado, setLlamado] = useState(false);
    const [ofertas, setOfertas] = useState([]);
    const [cantPaginas, setCantPaginas] = useState(0);
    const [pagina, setPagina] = useState(1);
    const [busquedaActual, setBusquedaActual] = useState('');

    const API_URL = `https://comunidad-backend-v3.herokuapp.com/ofertas/?pagina=0&limite=3&ordenar=id&idEstado=1`;

    const primerLlamado = async () => {
        if (llamado === false) {
            try {
                const api = await fetch(API_URL);
                const datos = await api.json();
                setLlamado(true)
                setOfertas(datos.ofertas.rows)
                setCantPaginas(datos.totalPaginas)
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    const traerOfertas = async (e, p) => {
        try {
            e.preventDefault()
            const { oferta } = e.target.elements;
            const ofertaValue = oferta.value;
            setBusquedaActual(ofertaValue);
            const api = await fetch(`https://comunidad-backend-v3.herokuapp.com/ofertas/?pagina=0&limite=3&ordenar=id&idEstado=1&buscarTitulo=${ofertaValue}`);
            const datos = await api.json();
            setPagina(1)
            console.log(datos)
            setOfertas(datos.ofertas.rows)
            setCantPaginas(datos.totalPaginas)
            console.log(ofertas)
        }
        catch (err) {
            console.log(err)
        }
    }

    const cambiarPagina = async (e, p) => {

        const api = await fetch(`https://comunidad-backend-v3.herokuapp.com/ofertas/?pagina=${p - 1}&limite=3&ordenar=id&idEstado=1&buscarTitulo=${busquedaActual}`);
        const datos = await api.json();
        setOfertas(datos.ofertas.rows);
        setPagina(p)
        console.log(datos.ofertas.rows)
    }


    primerLlamado()
    return (
        <Fragment>
            <Header />
            <BarraBusquedaOfertas
                traerOfertas={traerOfertas} />
            <Box sx={{display:"flex" }}>
                <Box sx={{ display: "flex", justifyContent: "start" }}>
                    <Link to="/admin/listadoOfertasInactivas" style={{ textDecoration: "none" }}>
                        <Button variant="contained" color='edit' sx={{ margin: "0.5rem" }}>
                            Ofertas pendientes
                        </Button>
                    </Link>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "start" }}>
                    <Link to="/admin/listadoOfertasInactivas" style={{ textDecoration: "none" }}>
                        <Button variant="contained" color='error' sx={{ margin: "0.5rem" }}>
                            Ofertas en revisión
                        </Button>
                    </Link>
                </Box>
            </Box>
            {ofertas.length === 0 && llamado === true ?
                <BusquedaNoEncontrada /> :
                <ListaOfertas
                    ofertas={ofertas} />}
            <Pagination color="primary" count={cantPaginas} page={pagina} onChange={cambiarPagina} sx={{ display: "flex", justifyContent: "center", margin: "1rem" }} />
        </Fragment>
    );
}

export default ListadoOfertas;