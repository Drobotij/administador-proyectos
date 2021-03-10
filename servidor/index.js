const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

const app = express();

// Conectar a la base de datos
conectarDB();

// Habilitar cors
app.use(cors());

// Habilitar express.json
app.use(express.json({ extended: true }));

// Puerto de la app
const PORT = process.env.PORT || 4000;

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

// Comenzando el server
app.listen(PORT, () =>{
    console.log('Server started.. port '+ PORT);
});