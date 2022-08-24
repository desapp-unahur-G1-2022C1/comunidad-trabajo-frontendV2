import './App.css';
import React from "react";
import Home from './Components/home/Home';
import { BrowserRouter as Router, Switch , Route, Link } from 'react-router-dom';
import PerfilUsuario from "./Components/perfilUsuario/PerfilUsuario";
import PerfilEmpresaPrivado from "./Components/empresa/PerfilEmpresaPrivado";
import EmpresaDatosPrivado from "./Components/empresa/EmpresaDatosPrivado";
import RegistroPregunta from './Components/registro/RegistroPregunta';
import NotFound from './Components/NotFound';
import DescripcionOferta from './Components/oferta/DescripcionOferta';
import RegistroPostulante from './Components/registro/RegistroPostulante';
import RegistroOferta from './Components/empresa/RegistroOferta';
import RegistroUsuario from './Components/registro/RegistroUsuario';
import ListadoOfertasEmpresa from './Components/empresa/listadoDeOfertas/ListadoOfertas'
import PanelAdmin from './Components/panelAdmin/PanelAdmin'
import ListadoPostulantes from './Components/panelAdmin/listadoPostulantes/ListadoPostulantes'
import Login from './Components/login/Login'
import {IdFormContextProvider} from './Context/IdFormContext';

function App() {
  return (
      <Router>
        
        <IdFormContextProvider>
        <Switch>
          
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/miPerfil">
            <PerfilUsuario/>
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
          <Route exact path="/admin/listadoPostulantes">
            <ListadoPostulantes/>
          </Route>
          <Route exact path="/listadoOfertasEmpresa">
            <ListadoOfertasEmpresa/>
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
          </Switch>
          </IdFormContextProvider>

      </Router>
    
  );
}

export default App;
