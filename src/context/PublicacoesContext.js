import React, { useState } from "react";

const PublicacoesContext = React.createContext()

const initial = []

const PublicacoesProvider = (props) =>{
    const [publish, setPublish] = useState([])

    return (
        <PublicacoesContext.Provider value={[publish, setPublish]}>
            {props.children}
        </PublicacoesContext.Provider>
    )
}

export {PublicacoesContext, PublicacoesProvider}