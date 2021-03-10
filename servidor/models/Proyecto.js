const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        trim: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario' 
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    integrantes: [{
        type: String,
        default: this._id
    }]
});

ProyectoSchema.pre('save', function(next) {
    if(this.integrantes.length === 0){
        this.integrantes.push(this.creador.toString());
    }
    next();
});

module.exports = mongoose.model('Proyecto', ProyectoSchema); 