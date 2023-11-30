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

// Agregar eventListener al botón "Horarios" pa limpiar la película
document.getElementById('horarios').addEventListener('click', () => {
    sessionStorage.clear(); // Limpiar sessionStorage
});

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-horario')) {
        // Capturamos los datos del botón presionado
        const funcionId = event.target.getAttribute('data-funcion-id');
        const funcionIdManual = event.target.getAttribute('data-funcion-id-manual');
        const peliculaTitulo = event.target.getAttribute('data-pelicula-titulo');
        const posterUrl = event.target.getAttribute('data-pelicula-posterurl');
        const horaFuncion = event.target.getAttribute('data-hora-funcion');
        const sucursalNombre = event.target.getAttribute('data-sucursal-nombre');
        const salaID = event.target.getAttribute('data-sala-id');
        //const asientosString = event.target.getAttribute('data-asientos-string');
        
        // Almacenamos los datos en el sessionStorage
        sessionStorage.setItem('funcionSeleccionada', JSON.stringify({
            funcionId,
            funcionIdManual,
            peliculaTitulo,
            posterUrl,
            horaFuncion,
            sucursalNombre,
            salaID
            //asientosString
        }));

        // Redirigir a la página de boletos
        window.location.href = './boletos.html';
    }
});

function populateMovieDropdown(movies, selectedMovieIds) {
    const dropdown = document.getElementById('movieDropdown');
    dropdown.innerHTML = ''; // Limpiar dropdown existente
    movies.forEach(movie => {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = movie.uuid;
        checkbox.name = 'movieOption';
        checkbox.value = movie.uuid;
        checkbox.checked = selectedMovieIds.includes(movie.uuid); // Marcar si la película está seleccionada

        const label = document.createElement('label');
        label.htmlFor = movie.uuid;
        label.textContent = movie.titulo;

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        dropdown.appendChild(listItem);
    });
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
                    let funcionesEnSala = funciones.filter(funcion => (funcion.idSala == sala.uuid && funcion.idPelícula == movie.uuid))
                        .sort((a, b) => {
                            // Asumiendo que fechaHora es un string en formato 'HH:MM', por ejemplo '13:30'
                            const horaA = a.fechaHora.split(':');
                            const horaB = b.fechaHora.split(':');
                            return horaA[0] - horaB[0] || horaA[1] - horaB[1];
                        });

                    if (funcionesEnSala.length > 0) {
                        funcionesEncontradasEnSucursal = true;
                        funcionesEnSala.forEach(funcion => {
                            salaContent += `<a style="color:white; text-decoration: none;" href="./boletos.html">
                                                <button class="btn btn-primary btn-horario" 
                                                        data-funcion-id="${funcion._id}" 
                                                        data-funcion-id-manual="${funcion.idFuncion}"
                                                        data-pelicula-titulo="${movie.titulo}"
                                                        data-pelicula-posterurl="${movie.posterUrl}"  
                                                        data-hora-funcion="${funcion.fechaHora}" 
                                                        data-sala-id="${funcion.idSala}"
                                                        data-sucursal-nombre="${sucursal.nombre}">${funcion.fechaHora}</button>
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

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const movies = await fetchMovies();
        let selectedMovieIds = sessionStorage.getItem('selectedMovieId') ? sessionStorage.getItem('selectedMovieId').split(',') : [];

        populateMovieDropdown(movies, selectedMovieIds);
        let filteredMovies = selectedMovieIds.length ? movies.filter(movie => selectedMovieIds.includes(movie.uuid)) : movies;
        await showMovies(filteredMovies);

        const movieDropdown = document.getElementById('movieDropdown');
        movieDropdown.addEventListener('change', () => {
            selectedMovieIds = Array.from(movieDropdown.querySelectorAll('input:checked')).map(input => input.value);
            sessionStorage.setItem('selectedMovieId', selectedMovieIds.join(','));
            // Recargar la página después de un breve retraso
            setTimeout(() => location.reload(), 100);
        });
    } catch (error) {
        console.error('Error loading data:', error);
    }
});

function resetDropdown() {
    const checkboxes = document.querySelectorAll('#movieDropdown input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
}