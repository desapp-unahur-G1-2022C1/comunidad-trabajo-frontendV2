import './App.css';
import React, { Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Components/Header"
import Ofertas from './Components/Ofertas';
import Search from './Components/Search';
function App() {
  return (
    <Fragment>
      <Header/>
      <Ofertas/>
    </Fragment>
  );
}

export default App;
