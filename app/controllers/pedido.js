const mongoose = require('mongoose');

const funcionSchema = new mongoose.Schema({
    fechaHora: {
        type: String,
        required: true
    },
    idPelicula: {
        type: String,
        required: true,
        //ref: 'movie' // Si estás utilizando referencias a otro modelo
    },
    idSala: {
        type: String,
        required: true,
        //ref: 'sala' // Si estás utilizando referencias a otro modelo
    }
});

const Funcion = mongoose.model('Funcion', funcionSchema);

module.exports = Funcion;