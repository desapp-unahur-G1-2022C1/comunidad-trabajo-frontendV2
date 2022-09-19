import '../../App.css';
import React, { Fragment } from "react";
import Header from "../Header"
import Ofertas from './Ofertas';
import { useState } from 'react';
import BarraBusqueda from './BarraBusqueda';

import BusquedaNoEncontrada from './BusquedaNoEncontrada';
import { Pagination } from '@mui/material';



const Home = () => {

  const [listaOfertas, setListaOfertas] = useState([]);
  const [llamado, setLlamado] = useState(false);
  const [cantPaginas, setCantPaginas] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [busquedaActual, setBusquedaActual] = useState('');

  
  
  const API_URL = `https://comunidad-backend-v3.herokuapp.com/ofertas/?pagina=0&limite=3&ordenar=id&idEstado=1`;

  const primerLlamado = async () => {
    if (llamado === false){
      try{
        const api = await fetch(API_URL);
        const datos = await api.json();
        setListaOfertas(datos.ofertas.rows)
        setCantPaginas(datos.totalPaginas)
        setLlamado(true)
      } catch (error) {
        console.log(error)
      }
    }
  }
  
  const ofertasAPI = async (e, p) => {
    try {
      e.preventDefault()
      const {ofertas} = e.target.elements;
      const ofertasValue = ofertas.value;
      setBusquedaActual(ofertasValue);
      const api = await fetch(`https://comunidad-backend-v3.herokuapp.com/ofertas/?pagina=0&limite=3&buscarTitulo=${ofertasValue}&ordenar=id&idEstado=1`);
      const datos = await api.json();
      setPagina(1)
      setListaOfertas(datos.ofertas.rows);
      setCantPaginas(datos.totalPaginas)
      console.log(datos.ofertas.rows)
     
      } catch (err) {
        console.log(err);
    }
  }

  const cambiarPagina = async (e, p) => {
    const api = await fetch(`https://comunidad-backend-v3.herokuapp.com/ofertas/?pagina=${p - 1}&limite=3&ordenar=id&buscarTitulo=${busquedaActual}&idEstado=1`);
    const datos = await api.json();
    setListaOfertas(datos.ofertas.rows);
    setPagina(p)
    console.log(datos.ofertas.rows)
  }
  
  primerLlamado()
    
    return ( 
    
    <Fragment>
      <div style={{backgroundColor:'#f3f3f3'}}>
      <Header/>
        
        <div style={{display:"flex", justifyContent:"center" ,flexDirection:"column", margin:"1rem"}}>
          <BarraBusqueda
          ofertasAPI={ofertasAPI}/>
          {listaOfertas.length === 0 && llamado === true ? 
          <BusquedaNoEncontrada/>
          : <Ofertas
          listaOfertas={listaOfertas}/> }
           <Pagination color='primary'count={cantPaginas} page={pagina} onChange={cambiarPagina} variant='text'sx={{display:"flex", justifyContent:"center"}}></Pagination>
          </div>
        </div>
      </Fragment> );
}
 
export default Home;