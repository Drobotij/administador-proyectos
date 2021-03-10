const { validationResult } = require('express-validator');

exports.validarDatosRegistro = (req, res, next) => {

    // Revisa si hay error de validacion
    const errores = validationResult(req);
    
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    next();

};