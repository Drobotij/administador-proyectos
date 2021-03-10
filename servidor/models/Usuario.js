const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const UsuariosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    registro: {
        type: Date,
        default: Date.now()
    }
})

// Encriptacion de password antes de guardar
UsuariosSchema.pre('save', async function(next){ 

    try {
        
        const salt = await bcryptjs.genSalt(10);
        this.password = await bcryptjs.hash(this.password, salt);
        next();

    } catch (error) {
        
        console.log(error);
        return;
    
    }

});

module.exports = mongoose.model('Usuarios', UsuariosSchema);