import '../../App.css';
import React, { Fragment } from "react";
import Header from "../Header"
import Ofertas from './Ofertas';

import Burger from './Burger';

import { useState } from 'react';
import BarraBusqueda from './BarraBusqueda';

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
      </Fragment> );
}
 
export default Home;