const Movie = require('../controllers/movie');
const express = require('express');
const dataHandler = require('../controllers/data_handler');

const router = express.Router();

// Middleware de validación
function validateAdmin(req, res, next) {
    const authToken = req.headers['x-auth'];
    if (authToken !== 'admin') {
        res.status(403).json({ message: "Acceso no autorizado, no se cuenta con privilegios de administrador" });
        return;
    }
    next();
}

// Hacemos que use en TODAS las rutas :)
router.use(validateAdmin);

// Crear un nuevo película
router.post('/', (req, res) => {
    console.log("Entro a la ruta de creación de película");
    try {
        const newMovie = new Movie(req.body.titulo, req.body.sinopsis, req.body.posterUrl, req.body.genero, req.body.duration, req.body.reparto, req.body.trailerIframe);
        const movies = dataHandler.getMovies();
        movies.push(newMovie);
        dataHandler.writeMoviesToFile(movies);
        res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
    } catch (error) {
        res.status(500).json({ message: 'Error creating movie', error: error.message });
    }
});


// Actualizar un película mediante su ID
router.put('/:id', (req, res) => {
    console.log("Entro a la ruta de actualización de película con ID:", req.params.id);
    try {
        const existingMovie = dataHandler.getMovieById(req.params.id);
        if (!existingMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        //Actualizar el película manualmente
        //Adicional le agregué el operador ternario por si me pasan undefined o valores vacíos en la llamada pa que no truene
        existingMovie.titulo = req.body.titulo !== undefined ? req.body.titulo : "No definido";
        existingMovie.sinopsis = req.body.sinopsis !== undefined ? req.body.sinopsis : "No definido";
        existingMovie.posterUrl = req.body.posterUrl !== undefined ? req.body.posterUrl : "No definido";
        existingMovie.genero = req.body.genero !== undefined ? req.body.genero : "No definido";
        existingMovie.duration = req.body.duration !== undefined ? req.body.duration : 0;
        existingMovie.reparto = req.body.reparto !== undefined ? req.body.reparto : 0;
        existingMovie.trailerIframe = req.body.trailerIframe !== undefined ? req.body.trailerIframe : "No definido";

        const result = dataHandler.updateMovie(req.params.id, existingMovie);
        if (!result) {
            res.status(404).json({ message: "Movie not found" });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).json({ message: "Error updating movie", error: error.message });
    }
});

// Borrar un película mediante su ID
router.delete('/:id', (req, res) => {
    console.log("Entro a la ruta de eliminación de película con ID:", req.params.id);
    try {
        const deletedMovie = dataHandler.deleteMovie(req.params.id);
        if (!deletedMovie) {
            res.status(404).json({ message: "Movie not found" });
            return;
        }
        res.json(deletedMovie);
    } catch (error) {
        res.status(500).json({ message: "Error deleting movie", error: error.message });
    }
});

module.exports = router;