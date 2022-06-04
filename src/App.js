import './App.css';
import React, { Fragment } from "react";
import Header from "./Components/Header"
import Home from './Components/Home';
import { BrowserRouter as Router, Switch , Route, Link } from 'react-router-dom';
import PerfilUsuarioPrivado from "./Components/PerfilUsuarioPrivado"
import RegistroPregunta from './Components/RegistroPregunta';
import NotFound from './Components/NotFound'



function App() {
  return (
    
      <Router>
        <Header/>
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
          <Route path="*">
            <NotFound/>
          </Route>
          </Switch>
      </Router>
  );
}

export default App;
