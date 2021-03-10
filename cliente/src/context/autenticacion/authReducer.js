import { 
    REGISTRO_ERROR,
    REGISTRO_EXITOSO,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    CERRAR_SESION,
    OBTENER_USUARIO
} from "../../types";

const reducer = (state, action) =>{
    switch(action.type){
        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
            localStorage.setItem('token', action.payload);

            return{
                ...state,
                autenticado: true,
                token: action.payload,
                mensaje: null,
                cargando: false
            }
        
        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                usuario:{
                    _id: ''
                },
                cargando: false,
                autenticado: null,
                mensaje: action.payload
            }
        
        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                cargando: false,
                usuario: action.payload.usuario
            }    
        
        default:
            return state;
        
    }
}
export default reducer;