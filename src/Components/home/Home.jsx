import '../../App.css';
import React, { Fragment } from "react";
import Header from "../Header"
import Ofertas from './Ofertas';

import Burger from './Burger';
import Filtros from './Filtros'
import { useState } from 'react';
import BotonInicioSesion from './BotonInicioSesion';
import VentanaLogin from './VentanaLogin'

const Home = () => {
    return ( 
    <Fragment>
      <Header/>
        <Burger/>
        <div style={{display:"flex"}}>
          <Filtros/>
          <Ofertas/>
        </div>
      </Fragment> );
}
 
export default Home;