import React, {useContext, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import alertaContext from '../../context/alertas/alertaContext';
import authContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    // Usando el context de alertas
    const { alerta, mostrarAlerta } = useContext(alertaContext);

    // Context de autenticacion 
    const { registrarUsuario, mensaje, autenticado } = useContext(authContext);

    // En caso de que el usuario se haya autenticado
    // o registrado o se sea un registro duplicado
    useEffect(() =>{
        if(autenticado){
            props.history.push('/proyectos');
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history])

    const [usuario, setUsuario] = useState({
        nombre: '',
        confirmar: '',
        email: '',
        password: ''
    });

    // Extraer usuario
    const {nombre, email, password, confirmar} = usuario;
    
    const onChange = e =>{
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    };

    const onSubmit = e =>{
        e.preventDefault();

        // Validar campos
        if( nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '' ){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        // Password minimo de 6 caracteres
        if(password.length < 6 ){
            mostrarAlerta('El password debe ser de almenos 6 caracteres', 'alerta-error');
            return;
        }
        // Los 2 password son iguales
        if(password !== confirmar ){
            mostrarAlerta('Los passwrod deben coincidir', 'alerta-error');
            return;
        }
        // Pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        })
    };

    return ( 
        <div className="form-usuario">
            { 
                alerta
                ? ( <div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div> ) 
                : null 
            }
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            placeholder="Ingrese Nombre"
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Ingrese email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Ingrese Password"
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            value={confirmar}
                            placeholder="Repite tu password"
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Volver a Iniciar Sesion
                </Link>
            </div>
        </div>
    );
}
 
export default NuevaCuenta;