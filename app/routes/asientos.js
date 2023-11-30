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

// Ruta para obtener un asiento por su ID
router.get('/:id', async (req, res) => {
    try {
        const asientoId = req.params.id;
        const asiento = await Asiento.findById(asientoId);

        if (!asiento) {
            return res.status(404).json({ message: "Asiento no encontrado" });
        }

        res.json(asiento);
    } catch (error) {
        res.status(500).json({ message: "Error fetching asiento", error: error.message });
    }
});

// Ruta para obtener detalles de asientos por un array de IDs
router.post('/por-ids', async (req, res) => {
    try {
        const { ids } = req.body;
        const asientos = await Asiento.find({ _id: { $in: ids } });

        res.json(asientos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching asientos by ids", error: error.message });
    }
});

module.exports = router;


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

router.post('/actualizar', async (req, res) => {
    try {
        const { asientosSeleccionados } = req.body; // Array de IDs de asientos seleccionados
        await Asiento.updateMany(
            { _id: { $in: asientosSeleccionados } },
            { $set: { estado: 'ocupado' } }
        );
        res.json({ message: 'Asientos actualizados exitosamente' });
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;