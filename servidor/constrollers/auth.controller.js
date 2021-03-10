const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.autenticarUsuario = async (req, res) => {

    // Extraer los datos
    const {email, password } = req.body;

    try {
        
        // Revisa que exista el email
        const usuario = await Usuario.findOne({email});

        if(!usuario){
            return res.status(400).json({msg: "El email que ingreso no existe."});
        }

        // Revisa que el password sea correcto
        const passCorrecto = await bcrypt.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg: "Contraseña incorrecta"});
        }

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

            res.status(201).json({msg: "Sesion iniciada correctamente",token});
        });

    } catch (error) {
        console.log(error);
    }
}
// Obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req, res) =>{
    try {

        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.status(200).json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Hubo un error en el servidor"});
    }
}