const express = require('express');
const path = require('path');
const router = express.Router();

// Importar rutas
const moviesRoutes = require('../routes/movies');
const funcionesRoutes = require('../routes/funciones');
const salasRoutes = require('../routes/salas');
const sucursalRoutes = require('../routes/sucursal');
const usuariosRoutes = require('../routes/usuarios');
const pedidosRoutes = require('../routes/pedidos');
const asientosRoutes = require('../routes/asientos');

// Montar rutas importadas
router.use('/api/movies', moviesRoutes);
router.use('/api/funciones', funcionesRoutes);
router.use('/api/salas', salasRoutes);
router.use('/api/sucursal', sucursalRoutes);
router.use('/api/usuarios', usuariosRoutes);
router.use('/api/pedidos', pedidosRoutes);
router.use('/api/asientos', asientosRoutes);

// Rutas pata los html
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'home.html'));
});
router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'home.html'));
});
router.get('/shopping_cart', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'shopping_cart.html'));
});
router.get('/pagos', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'pago.html'));
});

// Ruta para añadir películas al carrito mediante su ID
router.post('/movies/cart', async (req, res) => {
    try {
        const ids = req.body;
        if (!Array.isArray(ids)) {
            return res.status(400).json({ message: "Expected an array of movie IDs." });
        }

        const movies = await getMovies();
        const cartMovies = [];

        for (const id of ids) {
            const movie = movies.find(prod => prod.id === id);
            if (!movie) {
                return res.status(404).json({ message: `Movie with ID ${id} not found.` });
            }
            cartMovies.push(movie);
        }

        res.json(cartMovies);
    } catch (error) {
        res.status(500).json({ message: "Error processing the request." });
    }
});

// Ruta para obtener un película mediante su ID
router.get('/:id', (req, res) => {
    try {
        const movie = dataHandler.getMovieById(req.params.id);
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).json({ message: "Movie not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching movie", error: error.message });
    }
});

module.exports = router;