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

/* Ruta para obtener los asientos por idFuncion
router.get('/:idFuncion', async (req, res) => {
    //const idFuncion = req.params.idFuncion;

    try {
        // Filtrar los asientos por idFuncion
        const asientos = await Asiento.find(req.params.idFuncion);

        if (!asientos || asientos.length === 0) {
            return res.status(404).json({ message: "No se encontraron asientos para la función seleccionada" });
        }

        res.json(asientos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching asientos", error: error.message });
    }
});*/

// Nueva ruta para obtener asientos por idFuncion
router.get('/por-id-funcion/:idFuncion', async (req, res) => {
    try {
        const idFuncion = req.params.idFuncion;
        const asientos = await Asiento.find({ idFuncion: idFuncion }); // Filtra los asientos por idFuncion
        res.json(asientos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching asientos by idFuncion", error: error.message });
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