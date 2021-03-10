const router = require('express').Router();
const { validarDatosRegistro } = require('../helpers/ExpressValidator'); 
const { autenticarUsuario, usuarioAutenticado } = require('../constrollers/auth.controller');
const { check } = require('express-validator');
const authJWT = require('../middlewares/auth');

// iniciar sesion
router.post('/', autenticarUsuario );

// Obtiene el usuario autenticado
router.get('/', authJWT, usuarioAutenticado)

module.exports = router;