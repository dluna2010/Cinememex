const express = require('express');
const router = express.Router();
const Sala = require('../models/sala'); // Asegúrate de que la ruta sea correcta

// Obtener todas las salas
router.get('/', async (req, res) => {
    try {
        const salas = await Sala.find();
        res.json(salas);
    } catch (error) {
        res.status(500).json({ message: "Error fetching salas", error: error.message });
    }
});

// Obtener una sala por ID
router.get('/:id', async (req, res) => {
    try {
        const sala = await Sala.findById(req.params.id);
        if (!sala) {
            res.status(404).send('Sala no encontrada');
            return;
        }
        res.json(sala);
    } catch (error) {
        res.status(500).json({ message: "Error fetching sala", error: error.message });
    }
});

module.exports = router;
