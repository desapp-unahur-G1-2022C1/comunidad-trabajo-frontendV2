import './App.css';
import React from "react";
import Home from './Components/home/Home';
import { BrowserRouter as Router, Switch , Route, Link } from 'react-router-dom';
import PerfilUsuarioPrivado from "./Components/PerfilUsuarioPrivado"
import RegistroPregunta from './Components/registro/RegistroPregunta';
import NotFound from './Components/NotFound'
import DescripcionOferta from './Components/oferta/DescripcionOferta'
import RegistroPostulante from './Components/registro/RegistroPostulante';
import RegistroUsuario from './Components/registro/RegistroUsuario';
import PanelAdmin from './Components/panelAdmin/PanelAdmin'


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
          <Route exact path="/oferta/:id">
            <DescripcionOferta/>
          </Route>
          <Route exact path="/RegistroUsuario">
            <RegistroUsuario/>
          </Route>
          <Route exact path="/RegistroPostulante">
            <RegistroPostulante/>
          </Route>
          <Route exact path="/admin">
            <PanelAdmin/>
          </Route>
          <Route exact path="/listadoPostulantes">
      
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
          
          </Switch>

      </Router>
  );
}

export default App;
