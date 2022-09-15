import React, { createContext, useState, useCallback, useMemo } from "react";

const DatosUsuarioContext = createContext()

export default DatosUsuarioContext;

export function DatosUsuarioContextProvider({children}){
    const [datosUsuario, setDatosUsuarios] = useState([])
    const [token, setToken] = useState('')
    const [idUsuario, setIdUsuario] = useState(0)
    const [estaLogeado, setestaLogeado] = useState(false)
    const [grupo, setGrupo] = useState(0)

    const cambiarDatosUsuario = useCallback ((datoNuevo) => {
        setDatosUsuarios(datoNuevo)
        sessionStorage.setItem('datosUsuario', JSON.stringify(datoNuevo));
    }, []);

    const cambiarToken = useCallback ((tokenNuevo) => {
        setToken(tokenNuevo)
        sessionStorage.setItem('token', tokenNuevo);
    }, []);

    const cambiarIdUsuario = useCallback ((idNuevo) => {
        setIdUsuario(idNuevo)
        parseInt(sessionStorage.setItem('idUsuario', idNuevo));
    }, []);

    const cambiarEstadoLogeado = useCallback ((nuevoEstado) => {
        setestaLogeado(nuevoEstado)
        sessionStorage.setItem('estaLogeado', nuevoEstado);
    }, []);

    const cambiarGrupo = useCallback ((grupoNuevo) => {
        setGrupo(grupoNuevo)
        sessionStorage.setItem('grupo', grupoNuevo);
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
        grupo,
        cambiarGrupo
    }), [datosUsuario, cambiarDatosUsuario, token, cambiarToken, idUsuario, cambiarIdUsuario, estaLogeado, cambiarEstadoLogeado, grupo, cambiarGrupo])

    return(
    <DatosUsuarioContext.Provider value={value}>
        {children}
    </DatosUsuarioContext.Provider>
    )
}