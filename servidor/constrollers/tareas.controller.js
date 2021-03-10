const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');

exports.crearTarea = async (req,res) =>{

    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.body;
        const existeProyecto = await Proyecto.findById(proyecto)

        // Comprueba si existe el proyecto
        if(!existeProyecto){
            return res.status(404).json({msg:'El proyecto no existe'});
        }

        // Revisar si el usuario autenticado se encuentra en participantes
        if(!existeProyecto.integrantes.includes(req.usuario.id)) {
            return res.status(401).json({msg: "No autorizado"});
        };


        // Crea la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea});

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Ocurrio un error en el servidor'})
    }

};

exports.obtenerTareas = async (req, res) => {
    try {
        
        // Extrae el id del proyecto
        const { proyecto }  = req.query;
       
        // Chequea si existe el proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg: 'El proyecto no existe'});
        }
        
        // Revisar si el usuario autenticado se encuentra en participantes
        if(!existeProyecto.integrantes.includes(req.usuario.id)) {
            return res.status(401).json({msg: "No autorizado"});
        };

        // Obtiene las tareas
        const tareas = await Tarea.find({ proyecto });

        // Devuelve las tareas
        res.status(200).json(tareas);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error en el servidor'});
    }
};

exports.actulizarTarea = async (req, res) => {
    try {
        
        // Extrae el id del proyecto
        const { proyecto, nombre, estado }  = req.body;
       
        // Chequea si existe la tarea
        const existeTarea = await Tarea.findById(req.params.id);
        if(!existeTarea){
            return res.status(404).json({msg: 'No existe esa tarea'});
        };

        // Revisar si el usuario autenticado se encuentra en participantes
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto.integrantes.includes(req.usuario.id)) {
            return res.status(401).json({msg: "No autorizado"});
        };

        // Crear un objeto con la nueva informacion
        const nuevaTarea = {}

        // Si quiere cambiar el nombre
        nuevaTarea.nombre = nombre;

        // Si quiere cambiar el estado
        nuevaTarea.estado = estado;

        // Guardar la tarea nueva
        const tareaActualizada = await Tarea.findByIdAndUpdate({_id:req.params.id}, nuevaTarea, {new: true});

        res.status(200).json({tareaActualizada});

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error en el servidor'});
    }
};

// Eliminar una tarea
exports.eliminarTarea = async (req, res) =>{
    try {
        
        // Extrae el id del proyecto
        const { proyecto }  = req.query;
       
        // Chequea si existe la tarea
        const existeTarea = await Tarea.findById(req.params.id);
        if(!existeTarea){
            return res.status(404).json({msg: 'No existe esa tarea'});
        };

        // Revisar si el usuario autenticado se encuentra en participantes
        const existeProyecto = await Proyecto.findById(proyecto);
       
        if(!existeProyecto.integrantes.includes(req.usuario.id)) {
            return res.status(401).json({msg: "No autorizado"});
        };

        // Eliminar la tarea
        await Tarea.findByIdAndRemove({ _id: req.params.id});
        res.status(200).json({msg : "Se elimino ua tarea correctamente"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error en el servidor'});
    }
};