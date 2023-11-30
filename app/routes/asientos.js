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