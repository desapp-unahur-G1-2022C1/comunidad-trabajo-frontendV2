import React, { createContext, useState, useCallback, useMemo } from "react";

const IdFormContext = createContext()

export default IdFormContext;

export function IdFormContextProvider({children}){
    const [id, setId] = useState(null)
    const cambiarId = useCallback ((idNuevo) => {
        setId(idNuevo)
    }, []);

    const value = useMemo(() => ({
        id,
        cambiarId
    }), [id, cambiarId])

    return(
    <IdFormContext.Provider value={value}>
        {children}
    </IdFormContext.Provider>
    )
}