const mongoose = require('mongoose');

const funcionSchema = new mongoose.Schema({
    fechaHora: {
        type: Date,
        required: true
    },
    idPelicula: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Movie' // Si estás utilizando referencias a otro modelo
    },
    idSala: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Sala' // Si estás utilizando referencias a otro modelo
    }
});

const Funcion = mongoose.model('Funcion', funcionSchema);

module.exports = Funcion;