import '../App.css';
import React, { Fragment } from "react";
import Header from "./Header"
import Ofertas from './Ofertas';

import Burger from './Burger';
import Filtros from './Filtros'
import { useState } from 'react';
import Login from './Login';
import VentanaLogin from './VentanaLogin'


const Home = () => {
    return ( 
    <Fragment>
        <Burger/>
        <div style={{display:"flex"}}>
          <Filtros/>
          <Ofertas/>
        </div>
      </Fragment> );
}
 
export default Home;