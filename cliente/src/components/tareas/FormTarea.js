import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareasContext';

const FormTarea = () => {

    //Extrar si un proyecto esta vacio
    const { proyecto } = useContext(proyectoContext);
    // Extraer context de tarea
    const { tareaSeleccionada, agregarTarea, validarTarea, errorTarea, obtenerTareas, actualizarTarea } = useContext(tareaContext);

    useEffect(() => {
        if(tareaSeleccionada !== null){
            setTarea(tareaSeleccionada);
        }else{
            setTarea({
                nombre: ''
            })
        }
    }, [tareaSeleccionada])

    // State del formulario
    const [tarea, setTarea] = useState({
        nombre: ''
    });
    
    // Extraer el nombre de tarea
    const { nombre } = tarea;

   
    // Si no hay proyecto seleccionado
    if(!proyecto) return null;

    // Etraer el proyecto actual
    const [proyectoActual] = proyecto;

    const handleChange = e =>{
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = e =>{

        e.preventDefault();

        // Validar
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }

        // Si es edicion o si es nueva tarea
        if(tareaSeleccionada === null){
             // Agregar la nueva tarea al state
            tarea.proyecto  = proyectoActual._id;
            agregarTarea(tarea);
        }else{
            // Actualizar tarea existente
            actualizarTarea(tarea);
        }

       

        // Actulizar el listado de tareas
        obtenerTareas(proyectoActual._id);

        // Reiniciar formulario
        setTarea({
            nombre: ''
        })
    }

    return (  
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? "Editar Tarea" : "Agregar Tarea"}
                    />
                </div>
            </form>
            {errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio.</p> : null}
        </div>
    );
}
 
export default FormTarea;