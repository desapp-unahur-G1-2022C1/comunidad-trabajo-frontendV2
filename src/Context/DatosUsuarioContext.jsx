import { createContext, useState, useCallback, useMemo } from "react";

const DatosUsuarioContext = createContext()

export default DatosUsuarioContext;

export function DatosUsuarioContextProvider({children}){
    const [datosUsuario, setDatosUsuarios] = useState([])
    const [token, setToken] = useState('')
    const [idUsuario, setIdUsuario] = useState(0)
    const [estaLogeado, setestaLogeado] = useState(false)

    const cambiarDatosUsuario = useCallback ((datoNuevo) => {
        setDatosUsuarios(datoNuevo)
    }, []);

    const cambiarToken = useCallback ((tokenNuevo) => {
        setToken(tokenNuevo)
    }, []);

    const cambiarIdUsuario = useCallback ((idNuevo) => {
        setIdUsuario(idNuevo)
    }, []);

    const cambiarEstadoLogeado = useCallback ((nuevoEstado) => {
        setestaLogeado(nuevoEstado)
    }, []);

    const value = useMemo(() => ({
        datosUsuario,
        cambiarDatosUsuario,
        token,
        cambiarToken,
        idUsuario,
        cambiarIdUsuario,
        estaLogeado,
        cambiarEstadoLogeado,
    }), [datosUsuario, cambiarDatosUsuario, token, cambiarToken, idUsuario, cambiarIdUsuario, estaLogeado, cambiarEstadoLogeado])

    return(
    <DatosUsuarioContext.Provider value={value}>
        {children}
    </DatosUsuarioContext.Provider>
    )
}