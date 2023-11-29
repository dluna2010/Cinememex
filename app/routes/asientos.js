const express = require('express');
const router = express.Router();
const Asiento = require('../controllers/asiento');


// Obtener todas los asientos
router.get('/', async (req, res) => {
    try {
        const asientos = await Asiento.find();
        res.json(asientos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching asientos", error: error.message });
    }
});

/*
router.get('/', async (req, res) => {
    try {
        let query = {};
        if (req.query.idFuncion) {
            // Filtrar por correo (exacto e insensible a mayúsculas y minúsculas)
            query.idFuncion = new RegExp("^" + req.query.email + "$", "i");
        }

        const asientos = await Asiento.find(query);
        res.status(200).send(asientos);
    } catch (error) {
        res.status(500).send(error);
    }
});

/*
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
});*/

module.exports = router;