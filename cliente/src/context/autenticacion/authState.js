import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import { 
    REGISTRO_ERROR,
    REGISTRO_EXITOSO,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    CERRAR_SESION,
    OBTENER_USUARIO
} from "../../types";

const AuthState = props => {

    const initialState = {
      token: localStorage.getItem('token'),
      usuario: {
          _id: ''
      },
      autenticado: null,
      mensaje: null,
      cargando: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Funciones de autenticacion

    const registrarUsuario = async datos => {
        try {

            // Peticions HTTP/POST al servidor. Registra el usuario con los nuevos datos
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            
        

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.token
            })

            // Obtener el usuario
            usuarioAutenticado();

        } catch (error) {
            
            // console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    };

    // Retorna el usuario autenticado
    const usuarioAutenticado = async () =>{
        const token = localStorage.getItem('token');
        if(token) {
            // Funcion para enviar el token por headers
            tokenAuth(token);
        }

        try {
            
            const respuesta = await clienteAxios.get('/api/auth');
            //console.log(respuesta);
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data
            })
        } catch (error) {
            console.log(error.response);
            dispatch({
                tyep: LOGIN_ERROR
            })
        }
    };

    // Cuando el usuario inicia sesion
    const iniciarSesion = async datos =>{
        try {
            
            const respuesta = await clienteAxios.post('/api/auth', datos);
            console.log(respuesta);

            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            })

            // Obtener el usuario
            usuarioAutenticado();

        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    };

    // Cierrra la sesion
    const cerrarSesion = () =>{
        dispatch({
            type: CERRAR_SESION
        })
    };

    return (
        <AuthContext.Provider
            value={
                {
                    token: state.token,
                    autenticado: state.autenticado,
                    usuario: state.usuario,
                    mensaje: state.mensaje,
                    cargando: state.cargando,
                    registrarUsuario,
                    iniciarSesion,
                    usuarioAutenticado,
                    cerrarSesion
                }
            }
        >
            {props.children}
        </AuthContext.Provider>
    );

}
export default AuthState;