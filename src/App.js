import './App.css';
import React, { Fragment } from "react";
import Header from "./Components/Header"
import Ofertas from './Components/Ofertas';
import Search from './Components/Search';
import Burger from './Components/Burger';
import Filtros from './Components/Filtros'
import { useState } from 'react';
import Login from './Components/Login';
import VentanaLogin from './Components/VentanaLogin'
import Home from './Components/Home';
import { BrowserRouter as Router, Switch , Route, Link } from 'react-router-dom';
import PerfilUsuarioPrivado from "./Components/PerfilUsuarioPrivado"
import RegistroPregunta from './Components/RegistroPregunta';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/miPerfil">
            <PerfilUsuarioPrivado/>
          </Route>
          <Route exact path="/registroPregunta">
            <RegistroPregunta/>
          </Route>
          </Switch>
      </Router>
  );
}

export default App;
