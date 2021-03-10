import React, {useReducer} from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR,
    UNIRSE_PROYECTO,
    ERROR_UNIRSE,
    FORMULARIO_UNIRSE
} from '../../types';

import clienteAxios from '../../config/axios';

const ProyectoState = props =>{
   
    // Creando state inicial
    const initialState = {
        proyectos :[],
        errorFormulario: false,
        formulario: false,
        formularioUnirse: false,
        errorFormularioUnirse: false,
        proyecto: null,
        mensaje: null
    }

    // Dispatch para ejecutar las acciones 
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    // Funciones para el CRUD

    // muestra formulario para crear proyectos
    const mostrarFormulario = () =>{
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    };

    // Muestra formulario para unirse a proyectos
    const mostrarFormularioUnirse = () =>{
        dispatch({
            type: FORMULARIO_UNIRSE,
        })
    };

    // Obtener los proyectos
    const obtenerProyectos = async () =>{
        
        try {
            
            const resultado = await clienteAxios.get('/api/proyectos');
           
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })

        } catch (error) {

            const alerta= {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }

    }

    // Agregar nuevo proyecto 
    const agregarProyecto = async proyecto =>{
       
        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            console.log(resultado)
        
            // Insertar el proyecto en el state
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })

        } catch (error) {

            const alerta= {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    // Validar el formulario por errores
    const mostrarError = () =>{
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    // Validar el formulario de unirse por errores
    const mostrarErrorUnirse = () =>{
        dispatch({
            type: ERROR_UNIRSE
        })
    };

    // Selecciona el proyecto que el usuario dio click
    const proyectoActual = proyectoId =>{
        dispatch({
            type:PROYECTO_ACTUAL,
            payload: proyectoId
        })
    };

    // Eliminar un proyecto
    const eliminarProyecto = async proyectoId =>{
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);

            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {

            const alerta= {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    // Unirse a proyecto existente
    const unirseProyecto = async id => {
        try {
            
            const respuesta = await clienteAxios.post(`/api/proyectos/unirseProyecto/${id}`);
            console.log(respuesta);

            dispatch({
                type: UNIRSE_PROYECTO,
                payload: respuesta.data
            });

        } catch (error) {
            console.log(error.response);
        }
       
    } 

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                formularioUnirse: state.formularioUnirse,
                errorFormularioUnirse: state.errorFormularioUnirse,
                errorFormulario: state.errorFormulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto,
                mostrarFormularioUnirse,
                mostrarErrorUnirse,
                unirseProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;