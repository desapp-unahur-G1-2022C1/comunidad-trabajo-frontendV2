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
import OfertasPostulante from './Components/perfilUsuario/listadoDePostulaciones/ListadoPostulaciones';
import PostulantesDeOferta from './Components/oferta/listadoDePostulantes/ListadoDePostulantes';
import EdicionEmpresa from './Components/empresa/EdicionEmpresa';
import EdicionOferta from './Components/oferta/EdicionOferta';
import PostulanteDatosPrivado from './Components/perfilUsuario/PostulanteDatosPrivado';
import PostulanteDatosAcademicosPrivado from './Components/perfilUsuario/PostulanteDatosAcademicosPrivado';
import EdicionDatosPersonalesPostulante from './Components/perfilUsuario/EdicionDatosPersonalesPostulante';
import PerfilEmpresaPublico from './Components/empresa/EmpresaPerfilPublico'
import PerfilPostulantePublico from './Components/perfilUsuario/UsuarioPerfilPublico'
import MiCV from './Components/perfilUsuario/miCV/MiCV';
import ListadoOfertasRevision from "./Components/panelAdmin/listadoOfertasAdmin/ListadoOfertasRevision";
import ListadoOfertasFinalizadas from "./Components/panelAdmin/listadoOfertasAdmin/ListadoOfertasFinalizadas";
import PostulantesDeOfertaAdmin from './Components/panelAdmin/listadoOfertasAdmin/PostulantesDeOfertaAdmin';



import { CheckRole } from './PrivateRoute';
function App() {
  const postulante = 1
  const empresa = 2
  const admin = 3
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
            <CheckRole role={postulante}>
              <PerfilUsuario/>
            </CheckRole>       
          </Route>
          <Route exact path="/perfilEmpresa">
            <CheckRole role={empresa}>
              <PerfilEmpresaPrivado/>
            </CheckRole>
          </Route>
          <Route exact path="/empresaDatosPrivado">
            <CheckRole role={empresa}>
              <EmpresaDatosPrivado/>
            </CheckRole>
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
            <CheckRole role={empresa}>
              <RegistroOferta/>
            </CheckRole>
          </Route>
          <Route exact path="/RegistroPostulante">
            <RegistroPostulante/>
          </Route>
          <Route exact path="/RegistroEmpresa">
            <RegistroEmpresa/>
          </Route>
          <Route exact path="/admin">
            <CheckRole role={admin}>
              <PanelAdmin/>
            </CheckRole>
          </Route>
          <Route exact path="/admin/listadoPostulantes">
            <CheckRole role={admin}>
              <ListadoPostulantes/>
            </CheckRole>
          </Route>
          <Route exact path="/listadoOfertasEmpresa">
            <CheckRole role={empresa}>
              <ListadoOfertasEmpresa/>
            </CheckRole>
          </Route>
          <Route exact path="/ofertasPostulante">
            <CheckRole role={postulante}>
              <OfertasPostulante/>
            </CheckRole>
          </Route>
          <Route exact path='/listadoDePostulantes/:id'>
            <CheckRole role={empresa}>
              <PostulantesDeOferta/>
            </CheckRole>
          </Route>
          <Route exact path="/admin/listadoPostulaciones/:id">
            <CheckRole role={admin}>
              <PostulantesDeOfertaAdmin/>
            </CheckRole>
          </Route>
          <Route exact path="/admin/listadoEmpresas">
            <CheckRole role={admin}>
              <ListadoEmpresas/>
            </CheckRole>
          </Route>
          <Route exact path="/admin/listadoEmpresasInactivas">
            <CheckRole role={admin}>
              <ListadoEmpresasInactivas/>
            </CheckRole>
          </Route>
          <Route exact path="/admin/listadoOfertas">
            <CheckRole role={admin}>
              <ListadoOfertas/>
            </CheckRole>
          </Route>
          <Route exact path="/admin/listadoOfertasInactivas">
            <CheckRole role={admin}>
              <ListadoOfertasInactivas/>
            </CheckRole>
          </Route>
          <Route exact path="/admin/listadoOfertasFinalizadas">
            <CheckRole role={admin}>
              <ListadoOfertasFinalizadas/>
            </CheckRole>
          </Route>

          <Route exact path="/admin/listadoOfertasRevision">
            <CheckRole role={admin}>
              <ListadoOfertasRevision/>
            </CheckRole>
          </Route>
          <Route exact path="/edicionEmpresa">
            <CheckRole role={empresa}>
              <EdicionEmpresa/>
            </CheckRole>
          </Route>
          <Route exact path="/edicionOferta/:id">
            <CheckRole role={empresa}>
              <EdicionOferta/>
            </CheckRole>
          </Route>
          <Route exact path="/empresa/:id">
            <PerfilEmpresaPublico/>
          </Route>
          <Route exact path="/postulante/:id">
            <PerfilPostulantePublico/>
          </Route>
          <Route exact path="/miPerfil/misDatos">
            <CheckRole role={postulante}>
              <PostulanteDatosPrivado/>
            </CheckRole>
          </Route>
          <Route exact path="/miPerfil/datosAcademicos">
            <CheckRole role={postulante}>
              <PostulanteDatosAcademicosPrivado/>
            </CheckRole>
          </Route>
          <Route exact path="/miPerfil/misDatos/editar">
            <CheckRole role={postulante}>
              <EdicionDatosPersonalesPostulante/>
            </CheckRole>
          </Route>
          <Route exact path="/miPerfil/miCV">
            <CheckRole role={postulante}>
              <MiCV/>
            </CheckRole>
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
