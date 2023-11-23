async function fetchMovies() {
    try {
        const response = await fetch('http://127.0.0.1:3001/api/movies');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch movies');
        }
        return data;
        // Si no se encuentran
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}

async function fetchSalas() {
    try {
        const response = await fetch('http://127.0.0.1:3001/api/salas');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch salas');
        }
        return data;
        // Si no se encuentran
    } catch (error) {
        console.error('Error fetching salas:', error);
        throw error;
    }
}

async function fetchSucursal() {
    try {
        const response = await fetch('http://127.0.0.1:3001/api/sucursal');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch sucursal');
        }
        return data;
        // Si no se encuentran
    } catch (error) {
        console.error('Error fetching sucursal:', error);
        throw error;
    }
}

async function fetchFunciones() {
    try {
        const response = await fetch('http://127.0.0.1:3001/api/funciones');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch funciones');
        }
        return data;
        // Si no se encuentran
    } catch (error) {
        console.error('Error fetching funciones:', error);
        throw error;
    }
}

async function showMovies() {
    const movies = await fetchMovies();
    const sucursales = await fetchSucursal();
    const salas = await fetchSalas();
    const funciones = await fetchFunciones();
    const moviesContainer = document.getElementById('movie_container');

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.className = 'container mt-1 movie_container';

        let movieContent = `
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 iframe-container">
                    <!-- Trailer de la Película (Izquierda) -->
                    <h4><strong>Trailer</strong></h4>
                    <iframe width="560" height="315" src="${movie.trailerIframe}"
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen></iframe>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-5 col-xl-5 info-container">
                    <!-- Contenido Informativo (Derecha) -->
                    <h3 class="movie-title">${movie.titulo}</h3>
                    <p><strong>Sinopsis:</strong> ${movie.sinopsis}</p>
                    <p><strong>Género:</strong> ${movie.genero}</p>
                    <p><strong>Duración:</strong> ${movie.duration} min</p>
                    <p><strong>Reparto:</strong> ${movie.reparto}</p>
                </div>
            </div>
        `;

        sucursales.forEach(sucursal => {
            if (sucursal && sucursal.uuid) {
                let sucursalContent = `
                    <div class="row mt-3 sucursal-container">
                        <h2>${sucursal.nombre}</h2>
                        <div class="col-12">
                `;

                let funcionesEncontradas = false;
                salas.filter(sala => sala && sala.idSucursal && sala.idSucursal.toString() === sucursal._id.toString())
                    .forEach(sala => {
                        let salaContent = `<p><strong>Sala ${sala.numeroDeSala}:</strong></p>`;

                        let funcionesEnSala = funciones.filter(funcion => funcion && funcion.idSala && funcion.idSala.toString() === sala._id.toString() && funcion.idPelicula.toString() === movie._id.toString());

                        if (funcionesEnSala.length > 0) {
                            funcionesEncontradas = true;
                            funcionesEnSala.forEach(funcion => {
                                salaContent += `
                                    <a style="color:white; text-decoration: none;" href="./boletos.html">
                                        <button class="btn btn-primary btn-horario">${funcion.fechaHora}</button>
                                    </a>
                                `;
                            });
                        }

                        sucursalContent += salaContent;
                    });

                if (!funcionesEncontradas) {
                    sucursalContent += `<p>No hay funciones programadas.</p>`;
                }

                sucursalContent += `</div></div>`;
                movieContent += sucursalContent;
            }
        });

        movieDiv.innerHTML = movieContent;
        moviesContainer.appendChild(movieDiv);
    });
}


/*async function showMovies() {
    const movies = await fetchMovies();
    const sucursales = await fetchSucursal();
    const salas = await fetchSalas();
    const funciones = await fetchFunciones();
    const moviesContainer = document.getElementById('movie_container');

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.className = 'container mt-1 movie_container';

        let movieContent = `
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 iframe-container">
                    <!-- Trailer de la Película (Izquierda) -->
                    <h4><strong>Trailer</strong></h4>
                    <iframe width="560" height="315" src="${movie.trailerIframe}"
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen></iframe>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-5 col-xl-5 info-container">
                    <!-- Contenido Informativo (Derecha) -->
                    <h3 class="movie-title">${movie.titulo}</h3>
                    <p><strong>Sinopsis:</strong> ${movie.sinopsis}</p>
                    <p><strong>Género:</strong> ${movie.genero}</p>
                    <p><strong>Duración:</strong> ${movie.duration} min</p>
                    <p><strong>Reparto:</strong> ${movie.reparto}</p>
                </div>
            </div>
        `;

        // Aquí se recorren las sucursales y funciones
        sucursales.forEach(sucursal => {
            let sucursalContent = `
                <div class="row mt-3 sucursal-container">
                    <h2>${sucursal.nombre}</h2>
                    <div class="col-12">
            `;

            funciones.forEach(funcion => {
                // Asumiendo que tienes un campo en 'funcion' que relaciona con 'sucursal' y 'movie'
                if (funcion.idSucursal === sucursal._id && funcion.idPelicula === movie._id) {
                    sucursalContent += `
                        <p><strong>Horario:</strong>
                            <a style="color:white; text-decoration: none;" href="./boletos.html">
                                <button class="btn btn-primary btn-horario">${funcion.fecha}</button>
                            </a>
                        </p>
                    `;
                }
            });

            sucursalContent += `</div></div>`;
            movieContent += sucursalContent;
        });

        movieDiv.innerHTML = movieContent;
        moviesContainer.appendChild(movieDiv);
    });
}*/


document.addEventListener('DOMContentLoaded', async () => {
    try {
        await showMovies();
        // Aquí también podrías llamar a funciones similares para mostrar salas y sucursales
    } catch (error) {
        console.error('Error loading data:', error);
    }
});