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
import { BrowserRouter as Router, Switch , Route } from 'react-router-dom';
import Registro from "./Components/Registro"

function App() {
  return (
    
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/registro">
            <Registro/>
          </Route>
        </Switch>
      </Router>

    
    
  );
}

export default App;
