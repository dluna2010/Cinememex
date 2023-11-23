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
function populateMovieDropdown(movies) {
    const dropdown = document.getElementById('movieDropdown');
    movies.forEach(movie => {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = movie.uuid;
        checkbox.name = 'movieOption';
        checkbox.value = movie.uuid;

        const label = document.createElement('label');
        label.htmlFor = movie.uuid;
        label.textContent = movie.titulo;

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        dropdown.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const movies = await fetchMovies();
        populateMovieDropdown(movies);

        const selectedMovieId = sessionStorage.getItem('selectedMovieId');
        const filteredMovies = selectedMovieId ? movies.filter(movie => movie.uuid === selectedMovieId) : movies;
        await showMovies(filteredMovies);

        // Reiniciar la selección del sessionStorage y del dropdown
        sessionStorage.removeItem('selectedMovieId');
        resetDropdown();

        // Manejar el cambio en el dropdown
        const movieDropdown = document.getElementById('movieDropdown');
        movieDropdown.addEventListener('change', async () => {
            const selectedMovies = Array.from(movieDropdown.querySelectorAll('input:checked')).map(input => input.value);
            const filteredMovies = selectedMovies.length > 0 ? movies.filter(movie => selectedMovies.includes(movie.uuid)) : movies;
            await showMovies(filteredMovies);
        });
    } catch (error) {
        console.error('Error loading data:', error);
    }
});

function resetDropdown() {
    const checkboxes = document.querySelectorAll('#movieDropdown input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
}

async function showMovies(filteredMovies) {
    const movies = filteredMovies;
    const sucursales = await fetchSucursal();
    const salas = await fetchSalas();
    const funciones = await fetchFunciones();
    const moviesContainer = document.getElementById('movie_container');

    console.log("Sucursales:");
    console.table(sucursales);
    console.log("Salas:");
    console.table(salas);
    console.log("Funciones:");
    console.table(funciones);

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
            let sucursalContent = `<div class="row mt-3 sucursal-container">
                                    <h2>${sucursal.nombre}</h2>
                                    <div class="col-12">`;

            let funcionesEncontradasEnSucursal = false;
            salas.filter(sala => sala.idSucursal === sucursal.uuid)
                .forEach(sala => {
                    let salaContent = `<p><strong>Sala ${sala.numeroDeSala}:</strong></p>`;
                    let funcionesEnSala = funciones.filter(funcion => funcion.idSala === sala.uuid && funcion.idPelicula === movie.uuid);

                    if (funcionesEnSala.length > 0) {
                        funcionesEncontradasEnSucursal = true;
                        funcionesEnSala.forEach(funcion => {
                            salaContent += `<a style="color:white; text-decoration: none;" href="./boletos.html">
                                                <button class="btn btn-primary btn-horario">${funcion.fechaHora}</button>
                                            </a>`;
                        });
                    }

                    sucursalContent += salaContent;
                });

            if (!funcionesEncontradasEnSucursal) {
                sucursalContent += `<p>No hay funciones programadas.</p>`;
            }

            sucursalContent += `</div></div>`;
            movieContent += sucursalContent;
        });

        movieDiv.innerHTML = movieContent;
        moviesContainer.appendChild(movieDiv);
    });
}