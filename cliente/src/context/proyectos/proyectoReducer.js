import { FORMULARIO_PROYECTO,
         OBTENER_PROYECTOS,
         AGREGAR_PROYECTO,
         VALIDAR_FORMULARIO,
         PROYECTO_ACTUAL,
         ELIMINAR_PROYECTO,
         PROYECTO_ERROR,
         UNIRSE_PROYECTO,
         ERROR_UNIRSE,
         FORMULARIO_UNIRSE
} from '../../types'

const reducer =  (state, action) =>{

    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario : true
            }
        case FORMULARIO_UNIRSE:
            return {
                ...state,
                formularioUnirse: true
            }
            
        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload
            }
            
        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formulario: false,
                errorFormulario: false
            }
            
        case VALIDAR_FORMULARIO:
            return{
                ...state,
                errorFormulario: true
            }
            
        case PROYECTO_ACTUAL:
            return{
                ...state,
                proyecto: state.proyectos.filter(proyecto => 
                    proyecto._id === action.payload)
            }
            
        case ELIMINAR_PROYECTO:
            return{
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyecto: null
            }
            

        case PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }    
        case ERROR_UNIRSE:
            return {
                ...state,
                errorFormularioUnirse: true
            }
        case UNIRSE_PROYECTO:
            return {
                ...state,
                formularioUnirse: false,
                errorFormularioUnirse: false,
                proyectos: [...state.proyectos, action.payload],
            }
        
        default:
            return state;
            
    }

};

export default reducer;