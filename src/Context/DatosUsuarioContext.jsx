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
        localStorage.setItem('datosUsuario', JSON.stringify(datoNuevo));
    }, []);

    const cambiarToken = useCallback ((tokenNuevo) => {
        setToken(tokenNuevo)
        localStorage.setItem('token', tokenNuevo);
    }, []);

    const cambiarIdUsuario = useCallback ((idNuevo) => {
        setIdUsuario(idNuevo)
        localStorage.setItem('idUsuario', idNuevo);
    }, []);

    const cambiarEstadoLogeado = useCallback ((nuevoEstado) => {
        setestaLogeado(nuevoEstado)
        localStorage.setItem('estaLogeado', nuevoEstado);
    }, []);

    const cambiarGrupo = useCallback ((grupoNuevo) => {
        setGrupo(grupoNuevo)
        localStorage.setItem('grupo', grupoNuevo);
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