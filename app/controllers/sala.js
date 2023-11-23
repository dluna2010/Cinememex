const mongoose = require('mongoose');

const salaSchema = new mongoose.Schema({
    numeroDeSala: {
        type: Number,
        required: true,
        min: 1
    },
    capacidad: {
        type: Number,
        required: true,
        min: 1
    },
    idSucursal: {
        type: String,
        required: true,
        //ref: 'Sucursal' // Si estás utilizando referencias a otro modelo
    }
});

const Sala = mongoose.model('Sala', salaSchema);

module.exports = Sala;