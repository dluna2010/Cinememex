const express = require('express');
const router = express.Router();
const Movie = require('../controllers/movie'); // Importando el modelo Mongoose de Movie

// Obtener todas las películas
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: "Error fetching movies", error: error.message });
    }
});

// Obtener una película por su ID
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            res.status(404).json({ message: "Movie not found" });
            return;
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: "Error fetching movie", error: error.message });
    }
});

// Crear una nueva película
router.post('/', async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (error) {
        res.status(400).json({ message: "Error creating movie", error: error.message });
    }
});

// Actualizar una película por su ID
router.put('/:id', async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMovie) {
            res.status(404).json({ message: "Movie not found" });
            return;
        }
        res.json(updatedMovie);
    } catch (error) {
        res.status(400).json({ message: "Error updating movie", error: error.message });
    }
});

// Eliminar una película por su ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) {
            res.status(404).json({ message: "Movie not found" });
            return;
        }
        res.json({ message: "Movie deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting movie", error: error.message });
    }
});

module.exports = router;

/*const express = require('express');
const dataHandler = require('../controllers/data_handler');
const ShoppingCart = require('../controllers/shopping_cart');

const router = express.Router();

// Obtener todos los películas
router.get('/', (req, res) => {
    try {
        const movies = dataHandler.getMovies();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: "Error fetching movie", error: error.message });
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

module.exports = router;*/