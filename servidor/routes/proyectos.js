const router = require('express').Router();
const { crearProyecto, obtenerProyectos, actulizarProyecto, eliminarProyecto, unirseProyecto } = require('../constrollers/proyectos.controlller');
const authJWB = require('../middlewares/auth');
const { check }  = require('express-validator');
const {validarDatosRegistro} = require('../helpers/ExpressValidator');

// crea un proyecto
router.post('/', authJWB, [
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
], validarDatosRegistro ,crearProyecto);

// Obtener los proyecto
router.get('/', authJWB, obtenerProyectos);

// Actulizar proyecto
router.put('/:id', authJWB, [
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
], validarDatosRegistro, actulizarProyecto);

// Eliminar proyecto 
router.delete('/:id', authJWB, eliminarProyecto );

// Unirse a un proyecto
router.post('/unirseProyecto/:id', authJWB, unirseProyecto)

module.exports = router;