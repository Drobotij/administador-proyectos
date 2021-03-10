const Proyecto = require('../models/Proyecto');

exports.crearProyecto = async (req, res) =>{

    try {
        
        // Crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);

        // Guardar el creador via JWT
        proyecto.creador = req.usuario.id;

        // Guarda proyecto
        proyecto.save();
        res.status(201).json(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Hubo un error en el servidor"});
    }

};

// Obtiene los proyectos dependiendo de una id
exports.obtenerProyectos = async(req, res) =>{

    try {
        
        const proyectos = await Proyecto.find({ integrantes: { $all: [req.usuario.id] } });
        res.status(200).json({ proyectos });

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Hubo un error en el servidor"});
    }
}

// Actualiza un proyecto
exports.actulizarProyecto = async (req,res) =>{
  
    // Extraer la informacion del proyecto
    const { nombre } = req.body;
    const nuevoProyecto = {};

    if(nombre) {
        nuevoProyecto.nombre = nombre;
    }

    try {
        
        // Revisar el id
        let proyecto = await Proyecto.findById(req.params.id);

        // Si el proyect existe o no
        if(!proyecto){
            return res.status(404).json({msg: "Proyecto no econtrado"});
        }

        // Verificar el Creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: "No autorizado"});
        };

        // Actulizar
        proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id}, 
            {
                $set: nuevoProyecto
            }, {new: true});

        res.json({proyecto});

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Hubo un error en el servidor"});
    }

};

// Elimina un proyecto por id
exports.eliminarProyecto = async (req,res) =>{

    try {
        
        // Revisar el id
        let proyecto = await Proyecto.findById(req.params.id);

        // Si el proyect existe o no
        if(!proyecto){
            return res.status(404).json({msg: "Proyecto no econtrado"});
        }

        // Verificar el Creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: "No autorizado"});
        };

        // Eliminar el proyecto
        await Proyecto.findOneAndRemove({ _id: req.params.id})

        res.json({msg: "Proyecto eliminado."});

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Hubo un error en el servidor"});
    }
    
}
// Unirse a un proyecto existente
exports.unirseProyecto = async (req, res) =>{

    try {
        
        const { id } = req.params;

        // Revisar el id
        let proyecto = await Proyecto.findById(id);

        // Si el proyect existe o no
        if(!proyecto){
            return res.status(404).json({msg: "Proyecto no econtrado"});
        }

        const proyectoActualizado = {
            integrantes: [...proyecto.integrantes, req.usuario.id]
        }

        const actualizacion = await Proyecto.findOneAndUpdate({_id: id },
            {
                $set: proyectoActualizado
            },{new:true}
        );

        res.status(200).json(actualizacion);

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Ha ocurrido un error en el servidor"});
    }

};