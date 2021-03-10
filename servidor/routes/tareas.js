const router = require('express').Router();
const authJWT = require('../middlewares/auth');
const { check } = require('express-validator');
const { crearTarea, obtenerTareas, actulizarTarea, eliminarTarea } = require('../constrollers/tareas.controller');
const { validarDatosRegistro } = require('../helpers/ExpressValidator');

router.post('/', authJWT, [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
], validarDatosRegistro, crearTarea);

// Obtiene los proyecto a partir de una id
router.get('/', authJWT, obtenerTareas);

// Actualiza una tarea
router.put('/:id', authJWT, actulizarTarea);

// Elimina una tarea
router.delete('/:id', authJWT, eliminarTarea);

module.exports = router;