const router = require('express').Router();
const { crearUsuario } = require('../constrollers/usuarios.controller');
const { validarDatosRegistro } = require('../helpers/ExpressValidator'); 
const { check } = require('express-validator');

// Crear Usuario
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'El password debe ser minimo 6 caracteres').isLength({min: 6})
], validarDatosRegistro , crearUsuario);

module.exports = router;