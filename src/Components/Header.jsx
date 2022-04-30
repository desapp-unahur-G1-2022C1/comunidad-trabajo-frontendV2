import '../App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
const Header = () => {
  return ( 
    <div>
        <div className="row align-items-end">
          <div className="col">
            <button type="button" class="btn btn-success botonVolver">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"></path>
              </svg>
                Volver
            </button>
          </div>
          <div className="col botonIngresar">
            <button type="button" class="btn btn-danger ">Ingresar</button>
          </div>
        </div>
        <div className="App">
          <div className='titulo'> 
            <div className="row align-items-center contenidoTitulo">
              <div className="col contenidoTitulo">
                <img className='logo' src="http://comunidad-de-trabajo.unahur.edu.ar/static/media/logoComunidadDeTrabajo.b8bf300b.svg"></img>
              </div>
              <div className="col contenidoTitulo">
                Ofertas
              </div>
              <div className="col">
              </div>
              </div>
            </div>
        </div>
      </div>
   );
}
 
export default Header;
      
