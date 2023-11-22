const express = require('express');
const router = express.Router();
const Funcion = require('../controllers/funcion'); // Asegúrate de que la ruta sea correcta

// Obtener todas las funciones
router.get('/', async (req, res) => {
    try {
        const funciones = await Funcion.find();
        res.json(funciones);
    } catch (error) {
        res.status(500).json({ message: "Error fetching funciones", error: error.message });
    }
});

// Obtener una función por ID
router.get('/:id', async (req, res) => {
    try {
        const funcion = await Funcion.findById(req.params.id);
        if (!funcion) {
            res.status(404).send('Función no encontrada');
            return;
        }
        res.json(funcion);
    } catch (error) {
        res.status(500).json({ message: "Error fetching funcion", error: error.message });
    }
});

module.exports = router;