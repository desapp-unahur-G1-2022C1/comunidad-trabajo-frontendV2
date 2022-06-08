import './App.css';
import React, { Fragment } from "react";
import Header from "./Components/Header"
import Home from './Components/Home';
import { BrowserRouter as Router, Switch , Route, Link } from 'react-router-dom';
import PerfilUsuarioPrivado from "./Components/PerfilUsuarioPrivado"
import RegistroPregunta from './Components/RegistroPregunta';
import NotFound from './Components/NotFound'
import DescripcionOferta from './Components/DescripcionOferta'
import RegistroPostulante from './Components/RegistroPostulante';
import RegistroDatosAcademicos from './Components/RegistroDatosAcademicos'
import RegistroCV from './Components/RegistroCV'


function App() {
  return (
    
      <Router>

        
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
          <Route exact path="/descripcionOferta">
            <DescripcionOferta/>
          </Route>
          <Route exact path="/registroPostulante">
            <RegistroPostulante/>
          </Route>
          <Route exact path="/registroPostulante/1">
            <RegistroDatosAcademicos/>
          </Route>
          <Route exact path="/registroPostulante/2">
            <RegistroCV></RegistroCV>
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
          </Switch>

      </Router>
  );
}

export default App;
