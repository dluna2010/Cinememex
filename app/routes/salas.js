const express = require('express');
const router = express.Router();
const dataHandler = require('../controllers/data_handler');

// Obtener todas las sucursales
router.get('/sucursales', (req, res) => {
    const sucursales = dataHandler.getSucursales();
    res.json(sucursales);
});

// Obtener una sucursal por ID
router.get('/sucursales/:id', (req, res) => {
    const id = req.params.id;
    const sucursal = dataHandler.getSucursalById(id);
    if (sucursal) {
        res.json(sucursal);
    } else {
        res.status(404).send('Sucursal no encontrada');
    }
});

module.exports = router;