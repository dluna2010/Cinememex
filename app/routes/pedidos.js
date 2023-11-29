const express = require('express');
const router = express.Router();
const Pedido = require('../controllers/pedido'); // Asegúrate de que la ruta sea correcta

// Obtener todas las pedidos
router.get('/', async (req, res) => {
    try {
        const pedidos = await Pedido.find();
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pedidos", error: error.message });
    }
});

// Obtener una pedido por ID
router.get('/:id', async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id);
        if (!pedido) {
            res.status(404).send('Pedido no encontrada');
            return;
        }
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pedido", error: error.message });
    }
});

// Crear una nueva pedido
router.post('/', async (req, res) => {
    try {
        const nuevaPedido = new Pedido({
            // Asegúrate de asignar los campos correctos del cuerpo de la solicitud
            tituloPelicula: req.body.tituloPelicula,
            nombreSucursal: req.body.nombreSucursal,
            funcion: req.body.funcion,
            cantidadBoletos: req.body.cantidadBoletos,
            asientosSeleccionados: req.body.asientosSeleccionados
        });
        const pedidoGuardada = await nuevaPedido.save();
        res.status(201).json(pedidoGuardada);
    } catch (error) {
        res.status(400).json({ message: "Error creating pedido", error: error.message });
    }
});

// Actualizar una pedido por ID
router.put('/:id', async (req, res) => {
    try {
        const pedidoActualizada = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pedidoActualizada) {
            res.status(404).send('Pedido no encontrada para actualizar');
            return;
        }
        res.json(pedidoActualizada);
    } catch (error) {
        res.status(400).json({ message: "Error updating pedido", error: error.message });
    }
});

// Eliminar una pedido por ID
router.delete('/:id', async (req, res) => {
    try {
        const pedidoEliminada = await Pedido.findByIdAndDelete(req.params.id);
        if (!pedidoEliminada) {
            res.status(404).send('Pedido no encontrada para eliminar');
            return;
        }
        res.json({ message: "Pedido eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting pedido", error: error.message });
    }
});

// Obtener pedidos por ID de usuario
router.get('/usuario/:usuarioId', async (req, res) => {
    try {
        const usuarioId = req.params.usuarioId;
        const pedidosUsuario = await Pedido.find({ idUsuario: usuarioId });
        if (pedidosUsuario.length === 0) {
            res.status(404).send('No se encontraron pedidos para el usuario');
            return;
        }
        res.json(pedidosUsuario);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pedidos for user", error: error.message });
    }
});

// Obtener pedidos por email de usuario
router.get('/usuario/:emailUsuario', async (req, res) => {
    try {
        const emailUsuario = req.params.emailUsuario;
        const pedidosUsuario = await Pedido.find({ emailUsuario: emailUsuario });
        if (pedidosUsuario.length === 0) {
            res.status(404).send('No se encontraron pedidos para el email proporcionado');
            return;
        }
        res.json(pedidosUsuario);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pedidos for email", error: error.message });
    }
});


module.exports = router;