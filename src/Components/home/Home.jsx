import '../../App.css';
import React, { Fragment, useEffect } from "react";
import Header from "../Header"
import Ofertas from './Ofertas';
import Box from '@mui/material/Box'
import Burger from './Burger';
import Filtros from './Filtros'
import { useState } from 'react';
import BarraBusqueda from './BarraBusqueda';
import { Typography } from '@material-ui/core';
import BusquedaNoEncontrada from './BusquedaNoEncontrada';
import { Pagination } from '@mui/material';



const Home = () => {

  const [listaOfertas, setListaOfertas] = useState([]);
  const [llamado, setLlamado] = useState(false);
  const [cantPaginas, setCantPaginas] = useState(0);
  const [pagina, setPagina] = useState(1);

  
  
  const API_URL = `https://comunidad-de-trabajo.herokuapp.com/ofertas/?pagina=0&limite=3&ordenar=id`;

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
  
  const ofertasAPI = async (e) => {
    try {
      e.preventDefault()
      const {ofertas} = e.target.elements;
      const ofertasValue = ofertas.value;
      const api = await fetch(`https://comunidad-de-trabajo.herokuapp.com/ofertas/?pagina=${pagina}&limite=3&buscarTitulo=${ofertasValue}&ordenar=id `);
      const datos = await api.json();
      setListaOfertas(datos.ofertas.rows);
      setCantPaginas(datos.totalPaginas)
      console.log(datos.ofertas.rows)
     
      } catch (err) {
        console.log(err);
    }
  }

  const cambiarPagina = async (e, p) => {
    
    const api = await fetch(`https://comunidad-de-trabajo.herokuapp.com/ofertas/?pagina=${pagina}&limite=3&ordenar=id `);
    const datos = await api.json();
    setListaOfertas(datos.ofertas.rows);
    setCantPaginas(datos.totalPaginas)
    setPagina(p)
    console.log(datos.ofertas.rows)
  }
  
  primerLlamado()
    
    return ( 
    
    <Fragment>
      <div style={{backgroundColor:'#f3f3f3'}}>
      <Header/>
        <Burger/>
        <div style={{display:"flex", justifyContent:"center" ,flexDirection:"column"}}>
          <BarraBusqueda
          ofertasAPI={ofertasAPI}/>
          {listaOfertas.length === 0 && llamado === true ? 
          <BusquedaNoEncontrada/>
          : <Ofertas
          listaOfertas={listaOfertas}/> }
           <Pagination count={cantPaginas} page={pagina} onChange={cambiarPagina} variant='outlined'></Pagination>
          </div>
        </div>
      </Fragment> );
}
 
export default Home;