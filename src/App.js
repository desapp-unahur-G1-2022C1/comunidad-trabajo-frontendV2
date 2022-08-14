import './App.css';
import React, { Fragment } from "react";
import Home from './Components/home/Home';
import { BrowserRouter as Router, Switch , Route, Link } from 'react-router-dom';
import PerfilUsuarioPrivado from "./Components/PerfilUsuarioPrivado";
import PerfilEmpresaPrivado from "./Components/empresa/PerfilEmpresaPrivado";
import EmpresaDatosPrivado from "./Components/empresa/EmpresaDatosPrivado";
import RegistroPregunta from './Components/registro/RegistroPregunta';
import NotFound from './Components/NotFound';
import DescripcionOferta from './Components/oferta/DescripcionOferta';
import RegistroPostulante from './Components/registro/RegistroPostulante';
import RegistroOferta from './Components/empresa/RegistroOferta';
import RegistroUsuario from './Components/registro/RegistroUsuario';
import PanelAdmin from './Components/panelAdmin/PanelAdmin';
import ListadoPostulantes from './Components/panelAdmin/listadoPostulantes/ListadoPostulantes';
import ListadoOfertasEmpresa from './Components/empresa/listadoDeOfertas/ListadoOfertas';


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
          <Route exact path="/perfilEmpresa">
            <PerfilEmpresaPrivado/>
          </Route>
          <Route exact path="/empresaDatosPrivado">
            <EmpresaDatosPrivado/>
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
          <Route exact path="/RegistroOferta">
            <RegistroOferta/>
          </Route>
          <Route exact path="/RegistroPostulante">
            <RegistroPostulante/>
          </Route>
          <Route exact path="/admin">
            <PanelAdmin/>
          </Route>
          <Route exact path="/listadoPostulantes">
            <ListadoPostulantes/>
          </Route>
          <Route exact path="/listadoOfertasEmpresa">
            <ListadoOfertasEmpresa/>
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
          </Switch>
      </Router>
  );
}

export default App;
