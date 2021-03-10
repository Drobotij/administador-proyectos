import React, {Fragment, useContext} from 'react';
import Tarea from './Tarea';

import ProyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareasContext';
import authContext from '../../context/autenticacion/authContext';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoProyectos = () => {

    const proyectoContext = useContext(ProyectoContext)
    const { proyecto, eliminarProyecto } = proyectoContext;

    const tareasContext = useContext(tareaContext);
    const { tareasProyecto } = tareasContext;

    const { usuario } = useContext(authContext);

    // Si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un proyecto</h2>

    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    return (  

        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {tareasProyecto.length === 0 ?
                    (<li className="tarea"><p>No hay tareas</p></li>)
                :  
                <TransitionGroup>
                    {
                        tareasProyecto.map(tarea =>(
                            <CSSTransition
                                key={tarea.id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Tarea
                                    
                                    tarea={tarea}
                                />
                            </CSSTransition>
                        ))
                    }
                </TransitionGroup>

                }

            
            </ul>
            
            {
                usuario._id === proyectoActual.creador ?
                (
                    <div className="d-flex jutify-content-aroud">
                        <button
                            type="button"
                            className="btn btn-eliminar"
                            onClick={() => eliminarProyecto(proyectoActual._id)}
                        >
                            ELiminar Proyecto &times;
                        </button>
                        <p className="codigo-proyecto">Codigo de proyecto: <span>{proyectoActual._id}</span></p>
                    </div>
                ) :
                null
            }
            
        </Fragment>
    );
}
 
export default ListadoProyectos;