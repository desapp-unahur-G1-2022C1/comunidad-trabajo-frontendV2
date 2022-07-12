import '../../App.css';
import React, { Fragment, useEffect } from "react";
import Header from "../Header"
import Ofertas from './Ofertas';

import Burger from './Burger';
import Filtros from './Filtros'
import { useState } from 'react';
import BarraBusqueda from './BarraBusqueda';



const Home = () => {

  const [listaOfertas, setListaOfertas] = useState([]);

  const API_URL = `https://comunidad-de-trabajo.herokuapp.com/ofertas`;

  const primerLlamado = async () => {
    try{
      const api = await fetch(API_URL);
      const datos = await api.json();
      setListaOfertas(datos.ofertas.rows)
    } catch (error) {
      console.log(error)
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


  
    

  
  
    
    return ( 
    
    <Fragment>
      
      <Header/>
        <Burger/>
        <div style={{display:"flex", justifyContent:"center" ,flexDirection:"column"}}>
          <BarraBusqueda
          ofertasAPI={ofertasAPI}/>
          <Ofertas
          listaOfertas={listaOfertas}/>
        </div>
      </Fragment> );
}
 
export default Home;