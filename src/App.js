import './App.css';
import React, { Fragment } from "react";
import Home from './Components/home/Home';
import { BrowserRouter as Router, Switch , Route, Link } from 'react-router-dom';
import PerfilUsuarioPrivado from "./Components/PerfilUsuarioPrivado"
import RegistroPregunta from './Components/registro/RegistroPregunta';
import NotFound from './Components/NotFound'
import DescripcionOferta from './Components/oferta/DescripcionOferta'
import RegistroPostulante from './Components/registro/RegistroPostulante';
import RegistroDatosAcademicos from './Components/registro/RegistroDatosAcademicos'
import RegistroCV from './Components/registro/RegistroCV'


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
