 import NotFound from "./Components/NotFound"
 
 var datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario'))
 var token = sessionStorage.getItem('token')
 var idUsuario = parseInt(sessionStorage.getItem('idUsuario'))
 var grupo =  sessionStorage.getItem('grupo')
 var estaLogeado = sessionStorage.getItem('estaLogeado')
export function CheckRole({ role, children }) {
    const loggedUserRole = grupo;

    return role == loggedUserRole
        ? children
        : <NotFound />
}
