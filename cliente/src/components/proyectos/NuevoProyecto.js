import React, {Fragment, useState, useContext} from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';


const NuevoProyecto = () => {

    const proyectoContext = useContext(ProyectoContext)
    const { formulario, errorFormulario, mostrarFormulario, agregarProyecto,mostrarError } = proyectoContext;

    // State para Proyecto
    const [proyecto, setProyecto] = useState({
        nombre: ''
    });

    const { nombre } = proyecto;

    // Lee los datos del input
    const onChangeProyecto = e =>{
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    // Submit del form
    const onSubmitProyecto = e =>{
        e.preventDefault();

        // Validar el proyecto
        if(nombre === ''){
            mostrarError();
            return;
        }

        // Agregar al state
        agregarProyecto(proyecto);
        // Reiniciar el formulario
        setProyecto({
            nombre: ''
        })
    };

    return (  
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => mostrarFormulario()}
            >
                Nuevo Proyecto
            </button>
            {
                formulario ?
                (
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProyecto}
                    >
                        <input 
                            type="text"
                            className="input-text"
                            placeholder="Nombre Proyecto"
                            name="nombre"
                            value={nombre}
                            onChange={onChangeProyecto}
                        />
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Agregar Proyecto"
                        />
                    </form>
                )
                : null
            }
            {errorFormulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p>: null}
        </Fragment>
        
    );
}
 
export default NuevoProyecto;