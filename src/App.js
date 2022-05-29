import './App.css';
import React, { Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Components/Header"
import Ofertas from './Components/Ofertas';
import Search from './Components/Search';
import Burger from './Components/Burger';
import Filtros from './Components/Filtros'
import { useState } from 'react';
import Login from './Components/Login';
import VentanaLogin from './Components/VentanaLogin'

function App() {
  return (
    <Fragment>
      <Burger/>
      <Header/>
      <div style={{display:"flex"}}>
        <Filtros/>
        <Ofertas/>
      </div>
    </Fragment>
  );
}

export default App;
