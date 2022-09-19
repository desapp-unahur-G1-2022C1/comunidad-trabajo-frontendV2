import React, { Fragment, useState} from 'react'
import { TextField } from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import Header from "../../Header"
import { Grid, Pagination, Typography } from '@mui/material';
import BarraBusquedaEmpresas from './BarraBusquedaEmpresas';
import ListaEmpresas from './ListaEmpresas';
import BusquedaNoEncontrada from './BusquedaNoEncontrada';
import { Link } from "react-router-dom";

const ListadoEmpresas = () => {


    const [llamado, setLlamado] = useState(false);
    const [empresas, setEmpresas] = useState([]);
    const [cantPaginas, setCantPaginas] = useState(0);
    const [pagina, setPagina] = useState(1);
    const [busquedaActual, setBusquedaActual] = useState('');
    const API_URL = `https://comunidad-backend-v3.herokuapp.com/empresas/?pagina=0&limite=5&idEstado=1&ordenar=id`;

    const primerLlamado = async () => {
        if(llamado === false){
            try{
                const api = await fetch(API_URL);
                const datos = await api.json();
                setLlamado(true)
                setEmpresas(datos.empresas.rows)
                setCantPaginas(datos.totalPaginas)
                
            }
            catch(error){
                console.log(error)
            }
        }
    }

    const traerEmpresas = async (e, p) => {
        try{
            e.preventDefault()
            const {empresa} = e.target.elements;
            const empresaValue = empresa.value;
            setBusquedaActual(empresaValue);
            const api = await fetch(`https://comunidad-backend-v3.herokuapp.com/empresas/?pagina=0&limite=5&ordenar=id&idEstado=1&nombreEmpresa=${empresaValue}`);
            const datos = await api.json();
            console.log(datos)
            setPagina(1)
            setEmpresas(datos.empresas.rows)
            setCantPaginas(datos.totalPaginas)
            console.log(empresas)
        }
        catch(err){
            console.log(err)
        }
    }

    const cambiarPagina = async (e, p) => {
        
        const api = await fetch(`https://comunidad-backend-v3.herokuapp.com/empresas/?pagina=${p - 1}&ordenar=id&limite=5&idEstado=1&nombreEmpresa=${busquedaActual}`);;
        const datos = await api.json();
        setEmpresas(datos.empresas.rows);
        setPagina(p)
        console.log(datos.empresas.rows)
        
        
    }


    primerLlamado()
    return (  
        <Fragment>
            <Header/>
            <BarraBusquedaEmpresas
            traerEmpresas={traerEmpresas}/>
            <Box sx={{display:"flex", justifyContent:"start"}}>
                <Link to="/admin/listadoEmpresasInactivas" style={{textDecoration:"none"}}>
                    <Button variant="contained" color='edit' sx={{margin:"0.5rem"}}>
                        Aceptar empresas
                    </Button>
                </Link>
            </Box>
            {empresas.length === 0 && llamado === true ?
            <BusquedaNoEncontrada/> :
            <ListaEmpresas
            empresas={empresas}/>}
            <Pagination color="primary" count={cantPaginas} page={pagina} onChange={cambiarPagina} sx={{display:"flex", justifyContent:"center", margin:"1rem"}}/>
        
            
            
        </Fragment>
    );
}
 
export default ListadoEmpresas;