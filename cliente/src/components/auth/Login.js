import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import alertaContext from '../../context/alertas/alertaContext';
import authContext from '../../context/autenticacion/authContext';

const Login = props => {

    // Usando el context de alertas
    const { alerta, mostrarAlerta } = useContext(alertaContext);

    // Context de autenticacion 
    const { iniciarSesion, mensaje, autenticado } = useContext(authContext);

    // En caso de que password o usuario no exista
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
        email: '',
        password: ''
    });

    // Extraer usuario
    const {email, password} = usuario;
    
    const onChange = e =>{
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    };

    const onSubmit = e =>{
        e.preventDefault();

        // Validar campos
        if(email.trim() === "" || password.trim() === ""){
            mostrarAlerta('Todos los campos son obligatorios','alerta-error');
            return;
        }
        // Pasarlo al action
        iniciarSesion({email, password});
    };

    return ( 
        <div className="form-usuario">
            { 
                alerta
                ? ( <div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div> ) 
                : null 
            }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesion</h1>
                <form
                    onSubmit={onSubmit}
                >
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
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar sesion"
                        />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>
        </div>
    );
}
 
export default Login;