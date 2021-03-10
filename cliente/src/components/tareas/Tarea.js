import React, {useContext} from 'react';
import tareaContext from '../../context/tareas/tareasContext';
import ProyectoContext from '../../context/proyectos/proyectoContext';
const Tarea = ({tarea}) => {

    // Extraer context de tarea
    const { eliminarTarea, obtenerTareas,actualizarTarea, guardarTareaActual } = useContext(tareaContext);

    // Obtener el state de proyecto
    const proyectoContext = useContext(ProyectoContext)
    const { proyecto } = proyectoContext;
    const [proyectoActual] = proyecto;
    
    // Eliminar tareas
    const eliminarTareasPorId = id =>{
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual._id);
    };

    // Cambia el estado de la tarea
    const cambiarEstado = tarea =>{
        if(tarea.estado){
            tarea.estado = false;
        }else{
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    };

    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    };

    return ( 

        <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {   tarea.estado
                    ?
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={()=> cambiarEstado(tarea)}
                            >
                                Completo
                            </button>
                        )
                    :
                        (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={()=> cambiarEstado(tarea)}
                            >
                                Incompleto
                            </button>
                        )

                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >
                    Editar
                </button>


                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => eliminarTareasPorId(tarea._id)}
                >
                    Eliminar
                </button>
            </div>
        </li>

     );
}
 
export default Tarea;