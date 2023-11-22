const fs = require('fs');
const path = require("path");

const { generateUUID } = require("./util");

//-----------------------------------------------------------------------------------------------------------------------------------------------
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

// Obtener todas las películas
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
//-----------------------------------------------------------------------------------------------------------------------------------------------
//Apartado para sucursal
const sucursalesFilePath = path.join(__dirname, "..", "data", "sucursal.json");

// LEER sucursales del json
function readSucursalesFromFile() {
    try {
        const data = fs.readFileSync(sucursalesFilePath, 'utf8');
        //console.table(data);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading the sucursales from file:', error);
        return [];
    }
}

// ESCRIBIR sucursales en el json
function writeSucursalesToFile(sucursal) {
    try {
        fs.writeFileSync(sucursalesesFilePath, JSON.stringify(sucursal, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing sucursales to file:', error);
    }
}

// Obtener todos los sucursales
function getSucursales() {
    let data = readSucursalesFromFile();
    return data;
}

// Obtener una sucursal por ID
function getSucursalById(uuid) {
    const sucursales = readSucursalesFromFile();
    return sucursales.find(sucursal => sucursal.uuid === uuid);
}

// Crear un nueva sucursal
function createSucursal(newSucursal) {
    const sucursal = readSucursalesFromFile();
    sucursal.push(newSucursal);
    writeSucursalesToFile(sucursal);
    return newSucursal;
}

// Actualizar una sucursal
function updateSucursal(uuid, updatedSucursal) {
    const sucursal = readSucursalesFromFile();
    const index = sucursales.findIndex(sucursal => sucursal.uuid === uuid);
    if (index !== -1) {
        sucursales[index] = { ...sucursales[index], ...updatedSucursal};
        writeSucursalesToFile(sucursales);
        return sucursales[index];
    }

    return null;
}

// Borrar una funcion
function deleteSucursal(uuid) {
    const sucursal = readSucursalesFromFile();
    const index = sucursal.findIndex(sucursal => sucursal.uuid === uuid);
    if (index !== -1) {
        const deletedSucursal = sucursal.splice(index, 1)[0];
        writeSucursalesToFile(sucursal);
        return deletedSucursal;
    }
    return null;
}

//-----------------------------------------------------------------------------------------------------------------------------------------------
//Apartado para funcion
const funcionesFilePath = path.join(__dirname, "..", "data", "funcion.json");

// LEER funciones del json
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

// ESCRIBIR funciones en el json
function writeFuncionesToFile(funcion) {
    try {
        fs.writeFileSync(funcionesFilePath, JSON.stringify(funcion, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing functions to file:', error);
    }
}

// Obtener todos los funciones
function getFunciones() {
    let data = readFuncionesFromFile();
    return data;
}

// Obtener una funcion por ID
function getFuncionById(uuid) {
    const funcion = readFuncionesFromFile();
    return funcion.find(funcion => funcion.uuid === uuid);
}

// Crear un nueva funcion
function createFuncion(newFuncion) {
    const funcion = readFuncionesFromFile();
    newFuncion.uuid = generateUUID();
    funcion.push(newFuncion);
    writeFuncionesToFile(funcion);
    return newFuncion;
}

// Actualizar una función
function updateFuncion(uuid, updatedFuncion) {
    const funcion = readFuncionesFromFile();
    const index = funcion.findIndex(funcion => funcion.uuid === uuid);
    if (index !== -1) {
        funcion[index] = { ...funcion[index], ...updatedFuncion};
        writeFuncionesToFile(funcion);
        return funcion[index];
    }

    return null;
}

// Borrar una funcion
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



//-----------------------------------------------------------------------------------------------------------------------------------------------
//Apartado para Boleto
const boletosFilePath = path.join(__dirname, "..", "data", "boleto.json");

// LEER boletos del json
function readBoletosFromFile() {
    try {
        const data = fs.readFileSync(boletosFilePath, 'utf8');
        //console.table(data);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading the boletos from file:', error);
        return [];
    }
}

// ESCRIBIR boletos en el json
function writeBoletosToFile(boletos) {
    try {
        fs.writeFileSync(boletosFilePath, JSON.stringify(boletos, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing boletos to file:', error);
    }
}

// Obtener todos los boletos
function getBoletos() {
    let data = readBoletosFromFile();
    return data;
}

// Obtener un boleto por ID
function getBoletoById(idBoleto) {
    const boletos = readBoletosFromFile();
    return boletos.find(boleto => boleto.idBoleto === idBoleto);
}

// Crear un nuevo boleto
function createBoleto(newBoleto) {
    const boleto = readBoletosFromFile();
    boleto.push(newBoleto);
    writeBoletosToFile(boleto);
    return newBoleto;
}

// Actualizar un boleto
function updateBoleto(idBoleto, updatedBoleto) {
    const boletos = readBoletosFromFile();
    const index = boletos.findIndex(boleto => boleto.idBoleto === idBoleto);
    if (index !== -1) {
        boletos[index] = { ...boletos[index], ...updatedBoleto};
        writeBoletosToFile(boletos);
        return boletos[index];
    }

    return null;
}

// Borrar un boleto
function deleteBoleto(idBoleto) {
    const boletos = readBoletosFromFile();
    const index = boletos.findIndex(boleto => boleto.idBoleto === idBoleto);
    if (index !== -1) {
        const deletedBoleto = boletos.splice(index, 1)[0];
        writeBoletosToFile(boletos);
        return deletedBoleto;
    }
    return null;
}

//-----------------------------------------------------------------------------------------------------------------------------------------------
//Apartado para Asiento
const asientosFilePath = path.join(__dirname, "..", "data", "asiento.json");

// LEER asientos del json
function readAsientosFromFile() {
    try {
        const data = fs.readFileSync(asientosFilePath, 'utf8');
        //console.table(data);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading the asientos from file:', error);
        return [];
    }
}

// ESCRIBIR asientos en el json
function writeAsientosToFile(asientos) {
    try {
        fs.writeFileSync(asientosFilePath, JSON.stringify(asientos, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing asientos to file:', error);
    }
}

// Obtener todos los asientos
function getAsientos() {
    let data = readAsientosFromFile();
    return data;
}

// Obtener un asiento por ID
function getAsientoById(idAsiento) {
    const asientos = readAsientosFromFile();
    return asientos.find(asiento => asiento.idAsiento === idAsiento);
}

// Crear un nuevo asiento
function createAsiento(newAsiento) {
    const asiento = readAsientosFromFile();
    asiento.push(newAsiento);
    writeAsientosToFile(asiento);
    return newAsiento;
}

// Actualizar un asiento
function updateAsiento(idAsiento, updatedAsiento) {
    const asientos = readAsientosFromFile();
    const index = asientos.findIndex(asiento => asiento.idAsiento === idAsiento);
    if (index !== -1) {
        asientos[index] = { ...asientos[index], ...updatedAsiento};
        writeAsientosToFile(asientos);
        return asientos[index];
    }

    return null;
}

// Borrar un asiento
function deleteAsiento(idAsiento) {
    const asientos = readAsientosFromFile();
    const index = asientos.findIndex(boleto => boleto.idAsiento === idAsiento);
    if (index !== -1) {
        const deletedAsiento = asientos.splice(index, 1)[0];
        writeAsientosToFile(asientos);
        return deletedAsiento;
    }
    return null;
}

//-----------------------------------------------------------------------------------------------------------------------------------------------
//Apartado para Sala
const salasFilePath = path.join(__dirname, "..", "data", "sala.json");

// LEER salas del json
function readSalasFromFile() {
    try {
        const data = fs.readFileSync(salasFilePath, 'utf8');
        //console.table(data);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading the salas from file:', error);
        return [];
    }
}

// ESCRIBIR salas en el json
function writeSalasToFile(salas) {
    try {
        fs.writeFileSync(salasFilePath, JSON.stringify(salas, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing salas to file:', error);
    }
}

// Obtener todos los salas
function getSalas() {
    let data = readSalasFromFile();
    return data;
}

// Obtener una sala por ID
function getSalaById(uuid) {
    const salas = readSalasFromFile();
    return salas.find(sala => sala.uuid === uuid);
}

// Crear una nueva sala
function createSala(newSala) {
    const sala = readSalasFromFile();
    sala.push(newSala);
    writeSalasToFile(sala);
    return newSala;
}

// Actualizar una sala
function updateSala(uuid, updatedSala) {
    const salas = readSalasFromFile();
    const index = salas.findIndex(sala => sala.uuid === uuid);
    if (index !== -1) {
        salas[index] = { ...salas[index], ...updatedSala};
        writeSalasToFile(salas);
        return salas[index];
    }

    return null;
}

// Borrar una sala
function deleteSala(uuid) {
    const salas = readSalasFromFile();
    const index = salas.findIndex(sala => sala.uuid === uuid);
    if (index !== -1) {
        const deletedSala = salas.splice(index, 1)[0];
        writeSalasToFile(salas);
        return deletedSala;
    }
    return null;
}

//-----------------------------------------------------------------------------------------------------------------------------------------------
//Apartado para Reserva
const reservasFilePath = path.join(__dirname, "..", "data", "reserva.json");

// LEER reservas del json
function readReservasFromFile() {
    try {
        const data = fs.readFileSync(reservasFilePath, 'utf8');
        //console.table(data);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading the reservas from file:', error);
        return [];
    }
}

// ESCRIBIR reservas en el json
function writeReservasToFile(reservas) {
    try {
        fs.writeFileSync(reservasFilePath, JSON.stringify(reservas, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing reservas to file:', error);
    }
}

// Obtener todos las reservas
function getReservas() {
    let data = readReservasFromFile();
    return data;
}

// Obtener una reserva por ID
function getReservaById(idReserva) {
    const reservas = readSalasFromFile();
    return reservas.find(reserva => reserva.idReserva === idReserva);
}

// Crear una nueva reserva
function createReserva(newReserva) {
    const reserva = readReservasFromFile();
    sala.push(newReserva);
    writeReservasToFile(reserva);
    return newReserva;
}

// Actualizar una reserva
function updateReserva(idReserva, updatedReserva) {
    const reservas = readReservasFromFile();
    const index = reservas.findIndex(reserva => reserva.idReserva === idReserva);
    if (index !== -1) {
        reservas[index] = { ...reservas[index], ...updatedReserva};
        writeReservasToFile(reservas);
        return reservas[index];
    }

    return null;
}

// Borrar una reserva
function deleteReserva(idReserva) {
    const reservas = readReservasFromFile();
    const index = reservas.findIndex(reserva => reserva.idReserva === idReserva);
    if (index !== -1) {
        const deletedReserva = reservas.splice(index, 1)[0];
        writeReservasToFile(reservas);
        return deletedReserva;
    }
    return null;
}

//-----------------------------------------------------------------------------------------------------------------------------------------------
module.exports = {
    // Funciones de Movie
    getMovies,
    getMovieById,
    writeMoviesToFile,
    createMovie,
    updateMovie,
    deleteMovie,
    findMovie,
    // Funciones de Función
    getFunciones,
    getFuncionById,
    writeFuncionesToFile,
    createFuncion,
    updateFuncion,
    deleteFuncion,
    // Funciones de Sucursal
    getSucursales,
    getSucursalById,
    writeSucursalesToFile,
    createSucursal,
    updateSucursal,
    deleteSucursal,
    // Funciones de Boleto
    getBoletos,
    getBoletoById,
    writeBoletosToFile,
    createBoleto,
    updateBoleto,
    deleteBoleto,
    // Funciones de Asiento
    getAsientos,
    getAsientoById,
    writeAsientosToFile,
    createAsiento,
    updateAsiento,
    deleteAsiento, 
    // Funciones de Sala
    getSalas,
    getSalaById,
    writeSalasToFile,
    createSala,
    updateSala,
    deleteSala,
    // Funciones de Reserva
    getReservas,
    getReservaById,
    writeReservasToFile,
    createReserva,
    updateReserva,
    deleteReserva
};