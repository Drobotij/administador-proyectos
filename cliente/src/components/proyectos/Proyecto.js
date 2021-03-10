import React, {useContext} from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareasContext';

const Proyecto = ({proyecto}) => {

    // Obtener el state de proyecto
    const proyectoContext = useContext(ProyectoContext)
    const { proyectoActual } = proyectoContext;

    // Obtener Context Tareas
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext;
    // Agregar el proyecto actual
    const seleccionarProyecto = id =>{
        proyectoActual(id);
        obtenerTareas(id);
    }
    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto._id)}
            >
                {proyecto.nombre}
            </button>
        </li>
     );
}
 
export default Proyecto;