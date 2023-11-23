const express = require('express');
const router = express.Router();
const Sucursal = require('../controllers/sucursal'); // Asegúrate de que la ruta sea correcta

// Obtener todas las sucursales
router.get('/', async (req, res) => {
    try {
        const sucursales = await Sucursal.find();
        res.json(sucursales);
    } catch (error) {
        res.status(500).json({ message: "Error fetching sucursales", error: error.message });
    }
});

// Obtener una sucursal por ID
router.get('/:id', async (req, res) => {
    try {
        const sucursal = await Sucursal.findById(req.params.id);
        if (!sucursal) {
            res.status(404).send('Sucursal no encontrada');
            return;
        }
        res.json(sucursal);
    } catch (error) {
        res.status(500).json({ message: "Error fetching sucursal", error: error.message });
    }
});

module.exports = router;
