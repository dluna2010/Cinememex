async function fetchMovies() {
    try {
        const response = await fetch('http://127.0.0.1:3000/movies');
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

// Cargar la información de las salas desde el archivo JSON
fetch('../../data/sala.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON de salas');
        }
        return response.json();
    })
    .then(salas => {
        // Aquí puedes usar la información de salas
        // Asegúrate de que "salas" sea un arreglo con la información de las salas
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON de salas:', error);
    });

// Cargar la información de las sucursales desde el archivo JSON
fetch('../../data/sucursal.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON de sucursales');
        }
        return response.json();
    })
    .then(sucursales => {
        // Aquí puedes usar la información de sucursales
        // Asegúrate de que "sucursales" sea un arreglo con la información de las sucursales
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON de sucursales:', error);
    });

function renderMovieDetails(movie, funciones, salas, sucursales) {
    // Crear el contenedor principal para una película
    const movieContainer = document.createElement('div');
    movieContainer.className = 'container mt-1 movie_container';

    // Añadir el trailer de la película (Izquierda)
    const trailerContainer = document.createElement('div');
    trailerContainer.className = 'col-sm-12 col-md-12 col-lg-6 col-xl-6 iframe-container';
    trailerContainer.innerHTML = `
        <h4><strong>Trailer</strong></h4>
        <iframe width="560" height="315" src="${movie.trailerIframe}"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>`;
    movieContainer.appendChild(trailerContainer);

    // Añadir contenido informativo (Derecha)
    const infoContainer = document.createElement('div');
    infoContainer.className = 'col-sm-12 col-md-12 col-lg-5 col-xl-5 info-container';
    infoContainer.innerHTML = `
        <h3 class="movie-title">${movie.titulo}</h3>
        <p><strong>Sinopsis:</strong> ${movie.sinopsis}</p>
        <p><strong>Género:</strong> ${movie.genero}</p>
        <p><strong>Duración:</strong> ${movie.duration} min</p>
        <p><strong>Reparto:</strong> ${movie.reparto}</p>`;
    movieContainer.appendChild(infoContainer);

    // Horarios de las funciones por sucursal
    sucursales.forEach(sucursal => {
        const sucursalContainer = document.createElement('div');
        sucursalContainer.className = 'row mt-3 sucursal-container';
        sucursalContainer.innerHTML = `<h2>${sucursal.nombre}</h2>`;

        const horariosContainer = document.createElement('div');
        horariosContainer.className = 'col-12';
        horariosContainer.innerHTML = funciones
            .filter(funcion => funcion.idSucursal === sucursal.id)
            .map(funcion => {
                const sala = salas.find(sala => sala.id === funcion.idSala);
                return `
                    <p><strong>${sala.formato}: </strong>
                        <a style="color:white; text-decoration: none;" href="./boletos.html">
                            <button class="btn btn-primary btn-horario">${funcion.hora}</button>
                        </a>
                    </p>`;
            }).join('');
        sucursalContainer.appendChild(horariosContainer);
        movieContainer.appendChild(sucursalContainer);
    });

    return movieContainer;
}
