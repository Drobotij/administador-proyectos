const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) =>{
    
    try {

        // Extraer los datos del req.body
        const { nombre, email, password } = req.body;

        // Existe email?
        const ExisteUsuario = await Usuario.findOne({ email });
        
        if(ExisteUsuario){
            res.status(400).json({msg : "El email ya esta en uso"});
            return;
        }

        // Creando el nuevo usuario
        const usuario = Usuario(req.body);

        // Guardando el nuevo usuario
        await usuario.save();

        // Creando el jsonwebtoken
        const payload = {
            usuario:{
                id: usuario.id
            }
        };

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            res.status(201).json({msg: "Usuario creado",token});
        });

        
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "hubo un error"});
    }
};