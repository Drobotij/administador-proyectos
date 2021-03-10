import React, {Fragment, useState, useContext} from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';


const NuevoProyecto = () => {

    const proyectoContext = useContext(ProyectoContext)
    const { formularioUnirse, errorFormularioUnirse, mostrarFormularioUnirse,mostrarErrorUnirse, unirseProyecto, obtenerProyectos } = proyectoContext;

    // State para Proyecto
    const [proyecto, setProyecto] = useState({
        codigoProyecto: ''
    });

    const { codigoProyecto } = proyecto;

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
        if(codigoProyecto === ''){
            mostrarErrorUnirse();
            return;
        }

        // Agregar proyecto existente
        unirseProyecto(codigoProyecto);
        obtenerProyectos();
        // Reiniciar el formulario
        setProyecto({
            codigoProyecto: ''
        })
    };

    return (  
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => mostrarFormularioUnirse()}
            >
                Unirse A Un Proyecto
            </button>
            {
                formularioUnirse ?
                (
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProyecto}
                    >
                        <input 
                            type="text"
                            className="input-text"
                            placeholder="Codigo del proyecto"
                            name="codigoProyecto"
                            value={codigoProyecto}
                            onChange={onChangeProyecto}
                        />
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Unirse"
                        />
                    </form>
                )
                : null
            }
            {errorFormularioUnirse ? <p className="mensaje error">Asegurece de que el codigo sea correto.</p>: null}
        </Fragment>
        
    );
}
 
export default NuevoProyecto;