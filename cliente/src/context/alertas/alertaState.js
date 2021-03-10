import React, { useReducer } from 'react';
import alertaReducer from './alertaReducer';
import alertaContext from './alertaContext';

import { OCULTAR_ALERTA, MOSTRAR_ALERTA } from "../../types";

const AlertaState = props =>{

    const initialState = {
        alerta: null
    }

    const [ state, dispatch ] = useReducer(alertaReducer, initialState);

    // Funcion que maneja la alerta
    const mostrarAlerta = (msg, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        })

        // Despues de 5 seg oculta la alerta
        setTimeout(() =>{
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 5000);
    };

    return (
        <alertaContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </alertaContext.Provider>
    )
};

export default AlertaState;