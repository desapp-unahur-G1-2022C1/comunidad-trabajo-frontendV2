import './App.css';
import React from "react";
import Home from './Components/home/Home';
import { BrowserRouter as Router, Switch , Route } from 'react-router-dom';
import PerfilUsuario from "./Components/perfilUsuario/PerfilUsuario";
import PerfilEmpresaPrivado from "./Components/empresa/PerfilEmpresaPrivado";
import EmpresaDatosPrivado from "./Components/empresa/EmpresaDatosPrivado";
import RegistroPregunta from './Components/registro/RegistroPregunta';
import NotFound from './Components/NotFound';
import DescripcionOferta from './Components/oferta/DescripcionOferta';
import RegistroPostulante from './Components/registro/RegistroPostulante';
import RegistroEmpresa from './Components/registro/RegistroEmpresa';
import RegistroOferta from './Components/empresa/RegistroOferta';
import RegistroUsuario from './Components/registro/RegistroUsuario';
import ListadoOfertasEmpresa from './Components/empresa/listadoDeOfertas/ListadoOfertas'
import PanelAdmin from './Components/panelAdmin/PanelAdmin'
import ListadoPostulantes from './Components/panelAdmin/listadoPostulantesAdmin/ListadoPostulantes'
import Login from './Components/login/Login'
import {IdFormContextProvider} from './Context/IdFormContext';
import ListadoEmpresas from './Components/panelAdmin/listadoEmpresasAdmin/ListadoEmpresas';
import ListadoEmpresasInactivas from './Components/panelAdmin/listadoEmpresasAdmin/ListadoEmpresasInactivas';
import ListadoOfertas from './Components/panelAdmin/listadoOfertasAdmin/ListadoOfertas';
import ListadoOfertasInactivas from './Components/panelAdmin/listadoOfertasAdmin/ListadoOfertasInactivas';
import OfertasPostulante from './Components/perfilUsuario/listadoDeOfertas/ListadoOfertas';
import PostulantesDeOferta from './Components/oferta/listadoDePostulantes/ListadoDePostulantes';
import EdicionEmpresa from './Components/empresa/EdicionEmpresa';
import EdicionOferta from './Components/oferta/EdicionOferta';

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
          <Route exact path="/RegistroEmpresa">
            <RegistroEmpresa/>
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
          <Route exact path="/ofertasPostulante">
            <OfertasPostulante/>
          </Route>
          <Route exact path="/listadoDePostulantes/:id">
            <PostulantesDeOferta/>
          </Route>
          <Route exact path="/admin/listadoEmpresas">
            <ListadoEmpresas/>
          </Route>
          <Route exact path="/admin/listadoEmpresasInactivas">
            <ListadoEmpresasInactivas/>
          </Route>
          <Route exact path="/admin/listadoOfertas">
            <ListadoOfertas/>
          </Route>
          <Route exact path="/admin/listadoOfertasInactivas">
            <ListadoOfertasInactivas/>
          </Route>
          <Route exact path="/edicionEmpresa">
            <EdicionEmpresa/>
          </Route>
          <Route exact path="/edicionOferta/:id">
            <EdicionOferta/>
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
