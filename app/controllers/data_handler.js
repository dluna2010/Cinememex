const fs = require('fs');
const path = require("path");

const { generateUUID } = require("./util");

//Apartado para Movie
const moviesFilePath = path.join(__dirname, "..", "data", "movies.json");

// LEER películas del json
function readMoviesFromFile() {
    try {
        const data = fs.readFileSync(moviesFilePath, 'utf8');
        //console.table(data);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading the movies from file:', error);
        return [];
    }
}

// ESCRIBIR películas en el json
function writeMoviesToFile(movies) {
    try {
        fs.writeFileSync(moviesFilePath, JSON.stringify(movies, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing movies to file:', error);
    }
}

// Obtener todos los películas
function getMovies() {
    let data = readMoviesFromFile();
    return data;
}

// Obtener un película por ID
function getMovieById(uuid) {
    const movies = readMoviesFromFile();
    return movies.find(movie => movie.uuid === uuid);
}

// Crear un nuevo película
function createMovie(newMovie) {
    const movies = readMoviesFromFile();
    newMovie.uuid = generateUUID();
    movies.push(newMovie);
    writeMoviesToFile(movies);
    return newMovie;
}

// Actualizar un película
function updateMovie(uuid, updatedMovie) {
    const movies = readMoviesFromFile();
    const index = movies.findIndex(movie => movie.uuid === uuid);
    if (index !== -1) {
        movies[index] = { ...movies[index], ...updatedMovie };
        writeMoviesToFile(movies);
        return movies[index];
    }

    return null;
}

// Borrar un película
function deleteMovie(uuid) {
    const movies = readMoviesFromFile();
    const index = movies.findIndex(movie => movie.uuid === uuid);
    if (index !== -1) {
        const deletedMovie = movies.splice(index, 1)[0];
        writeMoviesToFile(movies);
        return deletedMovie;
    }
    return null;
}

// Encontrar un película mediante una consulta
// Método adicional para buscar películas por categoría y/o nombre
function findMovie(query) {
    if (!query) return [];

    let [category, titulo] = query.split(":").map(str => str.trim());

    if (category === "") {
        // La búsqueda es por título
        category = undefined;
        titulo = titulo.toLowerCase();
    } else if (titulo === "" || titulo === undefined) {
        // La búsqueda es por categoría
        titulo = undefined;
        category = category.toLowerCase();
    } else {
        // La búsqueda es por categoría y título
        category = category.toLowerCase();
        titulo = titulo.toLowerCase();
    }

    const movies = readMoviesFromFile();

    // Agregamos que no discrimine mayúsculas y minúsculas
    return movies.filter(movie => {
        const movieCategory = movie.category ? movie.category.toLowerCase() : "";
        const movieTitulo = movie.titulo ? movie.titulo.toLowerCase() : "";

        let matchCategory = true;
        let matchTitulo = true;

        if (category) {
            matchCategory = movieCategory.includes(category);
        }

        if (titulo) {
            matchTitulo = movieTitulo.includes(titulo);
        }

        return matchCategory && matchTitulo;
    });
}

//Apartado para 

//Apartado para 

//Apartado para 

//Apartado para 

module.exports = {
    getMovies,
    getMovieById,
    writeMoviesToFile,
    createMovie,
    updateMovie,
    deleteMovie,
    findMovie
};