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



const Home = () => {

  const [listaOfertas, setListaOfertas] = useState([]);
  const [llamado, setLlamado] = useState(false)

  const API_URL = `https://comunidad-de-trabajo.herokuapp.com/ofertas`;

  const primerLlamado = async () => {
    if (llamado === false){
      try{
        const api = await fetch(API_URL);
        const datos = await api.json();
        setListaOfertas(datos.ofertas.rows)
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
      const api = await fetch(`https://comunidad-de-trabajo.herokuapp.com/ofertas/?pagina=0&limite=10&buscarTitulo=${ofertasValue}`);
      const datos = await api.json();
      setListaOfertas(datos.ofertas.rows);
      console.log(datos.ofertas.rows)
     
      } catch (err) {
        console.log(err);
    }
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
           
          </div>
        </div>
      </Fragment> );
}
 
export default Home;