const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    tituloPelicula: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    nombreSucursal: {
        type: String,
        required: true
    },
    funcion: { // Asumiendo que es un String que representa la fecha y hora de la función
        type: String,
        required: true
    },
    cantidadBoletos: {
        type: Number,
        required: true
    },
    asientosSeleccionados: {
        type: String,
        required: true
    },
    emailUsuario: {
        type: String,
        required: true
    }
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;
