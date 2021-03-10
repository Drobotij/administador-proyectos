import React, { useReducer } from 'react';
import TareasContext from './tareasContext';
import TareasReducer from './tareasReducer';

import clienteAxios from '../../config/axios';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA
} from '../../types';

const TareaState = props =>{
    const initialState = {
        
        tareasProyecto: [],
        errorTarea: false,
        tareaSeleccionada: null
    }

    // Crear dispatch y state
    const [state, dispatch] = useReducer(TareasReducer, initialState)


    // Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto =>{

        try {
          

            const resultado = await clienteAxios.get('/api/tareas', {params: { proyecto}});
            
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error.response);
        }

        
    } 

    // Agregar una nueva tarea
    const agregarTarea = async tarea =>{
        
        
        try {
        
            await clienteAxios.post('/api/tareas', tarea);
            
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            });
        } catch (error) {
            console.log(error);
        }
    };

    // Valida error en el formulario de tarea
    const validarTarea = () =>{
        dispatch({
            type: VALIDAR_TAREA
        })
    };

    // Eliminar tarea por id
    const eliminarTarea = async (id, proyecto) =>{
        try {

            await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}});

            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Editar una tarea
    const actualizarTarea = async tarea =>{
        try {
            
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tareaActualizada
            })

        } catch (error) {
            console.log(error.response);
        }
    }
    // Extrae una tarea para edicion
    const guardarTareaActual = tarea =>{
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    
    return (
        <TareasContext.Provider
            value={{
                
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea
            }}
        >
            {props.children}
        </TareasContext.Provider>
    )
}

export default TareaState;