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

//Apartado para sucursal


//Apartado para funcion
const funcionesFilePath = path.join(__dirname, "..", "data", "funcion.json");

// LEER películas del json
function readFuncionesFromFile() {
    try {
        const data = fs.readFileSync(funcionesFilePath, 'utf8');
        //console.table(data);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading the functions from file:', error);
        return [];
    }
}

// ESCRIBIR películas en el json
function writeFuncionesToFile(funcion) {
    try {
        fs.writeFileSync(funcionesFilePath, JSON.stringify(funcion, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing functions to file:', error);
    }
}

// Obtener todos los películas
function getFunciones() {
    let data = readFuncionesFromFile();
    return data;
}

// Obtener un película por ID
function getFuncionById(uuid) {
    const funcion = readFuncionesFromFile();
    return funcion.find(funcion => funcion.uuid === uuid);
}

// Crear un nuevo película
function createFuncion(newFuncion) {
    const funcion = readFuncionesFromFile();
    newFuncion.uuid = generateUUID();
    funcion.push(newFuncion);
    writeFuncionesToFile(funcion);
    return newFuncion;
}

// Actualizar un película
function updateMovie(uuid, updatedFuncion) {
    const funcion = readFuncionesFromFile();
    const index = funcion.findIndex(funcion => funcion.uuid === uuid);
    if (index !== -1) {
        funcion[index] = { ...funcion[index], ...updatedFuncion};
        writeFuncionesToFile(funcion);
        return funcion[index];
    }

    return null;
}

// Borrar un película
function deleteFuncion(uuid) {
    const funcion = readFuncionesFromFile();
    const index = funcion.findIndex(funcion => funcion.uuid === uuid);
    if (index !== -1) {
        const deletedFuncion = funcion.splice(index, 1)[0];
        writeFuncionesToFile(funcion);
        return deletedFuncion;
    }
    return null;
}

// Encontrar un película mediante una consulta
// Método adicional para buscar películas por categoría y/o nombre
function findFuncion(query) {
    if (!query) return [];

    let [sucursal, titulo] = query.split(":").map(str => str.trim());

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

//Apartado para usuario

//Apartado para boleto

//Apartado para asiento

//Apartado para sala

//Apartado para reserva



module.exports = {
    getMovies,
    getMovieById,
    writeMoviesToFile,
    createMovie,
    updateMovie,
    deleteMovie,
    findMovie
};