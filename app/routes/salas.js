const express = require('express');
const router = express.Router();
const dataHandler = require('../controllers/data_handler');

// Obtener todas las salas
router.get('/salas', (req, res) => {
    const salas = dataHandler.getSucursales();
    res.json(salas);
});

// Obtener una sala por ID
router.get('/salas/:id', (req, res) => {
    const id = req.params.id;
    const sala = dataHandler.getSucursalById(id);
    if (sala) {
        res.json(sala);
    } else {
        res.status(404).send('Sala no encontrada');
    }
});

module.exports = router;