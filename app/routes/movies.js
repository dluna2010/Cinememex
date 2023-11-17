const express = require('express');
const dataHandler = require('../controllers/data_handler');
const ShoppingCart = require('../controllers/shopping_cart');

const router = express.Router();

// Obtener todos los películas
router.get('/', (req, res) => {
    try {
        const movies = dataHandler.getMovies();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: "Error fetching movies", error: error.message });
    }
});

// Crear una instancia de ShoppingCart
const cart = new ShoppingCart();

// Agregar películas al carrito (por IDs)
router.post('/cart', (req, res) => {
    const movieIds = req.body;
    if (!Array.isArray(movieIds)) {
        res.status(400).json({ message: "Body should be an array of movie IDs" });
        return;
    }
    try {
        const movies = movieIds.map(id => dataHandler.getMovieById(id)).filter(movie => movie);
        if (movies.length !== movieIds.length) {
            res.status(404).json({ message: "Some movies were not found" });
            return;
        }

        // Añadir películas al carrito de compras
        movies.forEach(movie => cart.addItem(movie, 1));  // Uno como cantidad default

        // Regresar el contenido del carrito
        res.json(cart.getAllItems());
    } catch (error) {
        res.status(500).json({ message: "Error fetching movies for cart", error: error.message });
    }
});

// Obtener película por ID
router.get('/:id', (req, res) => {
    try {
        const movie = dataHandler.getMovieById(req.params.id);
        if (!movie) {
            res.status(404).json({ message: "Movie not found" });
            return;
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: "Error fetching movie", error: error.message });
    }
});

// Buscar película por nombre o categoría
router.get('/search/:query', (req, res) => {
    const query = req.params.query;
    const movies = dataHandler.findMovie(query);
    res.json(movies);
});

module.exports = router;