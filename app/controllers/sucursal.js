const mongoose = require('mongoose');

const sucursalSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    ubicacion: {
        type: String,
        required: true,
        trim: true
    },
    numeroDeSalas: {
        type: Number,
        required: true,
        min: 1
    }
});

const Sucursal = mongoose.model('Sucursal', sucursalSchema);

module.exports = Sucursal;