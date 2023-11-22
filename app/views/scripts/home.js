// Variable para ver donde va el índice
let currentPageIndex = 0;

// Ir a buscar los películas en la base de datos
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

// Renderizar las cartitas de películas
function renderMovieCard(movie) {
    // Crear el div de la columna
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3';

    // Crear el div de la tarjeta
    const card = document.createElement('div');
    card.className = 'card';
    col.appendChild(card);

    // Agregar la imagen
    const img = document.createElement('img');
    img.src = movie.posterUrl; // Asumiendo que imageUrl es la propiedad que contiene la URL de la imagen
    img.alt = movie.titulo; // Asumiendo que title es la propiedad que contiene el título de la película
    img.className = 'card-img';
    card.appendChild(img);

    // Div para la sobreposición de la imagen
    const cardImgOverlay = document.createElement('div');
    cardImgOverlay.className = 'card-img-overlay';
    card.appendChild(cardImgOverlay);

    // Agregar el título
    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = movie.titulo;
    cardImgOverlay.appendChild(title);

    // Crear y agregar el botón
    const buttonLink = document.createElement('a');
    buttonLink.style = "color:black; text-decoration: none;";
    buttonLink.href = "./horarios.html"; // Enlace a la página de horarios
    const button = document.createElement('button');
    button.className = 'btn btn-primary ver-horario-button';
    button.textContent = 'Ver Horarios';
    button.setAttribute('data-movie-id', movie.uuid);
    buttonLink.appendChild(button);

    cardImgOverlay.appendChild(buttonLink);

    // Retornar el div de la columna
    return col;
}

// Renderizar todos los películas en la página
function renderMoviesPage(movies, pageIndex) {
    const moviesContainer = document.getElementById('cards_container');
    moviesContainer.innerHTML = '';  // Limpiar el container
    const start = pageIndex * 4; // Empezar en múltiplos de 4
    const end = start + 4; // Ir brincando de 4 en 4
    const moviesToRender = movies.slice(start, end);
    moviesToRender.forEach(movie => { //Agregar los películas
        const col = renderMovieCard(movie);
        moviesContainer.appendChild(col);
    });
}

// Función para que funcione (xD) la paginación
function handlePaginationClick(event, movies) {
    const pageIndex = parseInt(event.target.textContent) - 1;
    currentPageIndex = pageIndex;
    renderMoviesPage(movies, pageIndex);

    // Actualizar la página actual
    document.querySelectorAll('.pagination .page-item').forEach((item, index) => {
        item.classList.toggle('active', index === pageIndex + 1);
    });
}

// Ahora para los botones de next and previous
function handlePrevNextClick(event, movies, isNext) {
    currentPageIndex = isNext ? currentPageIndex + 1 : currentPageIndex - 1;
    renderMoviesPage(movies, currentPageIndex);

    // Actualizar la página actual
    document.querySelectorAll('.pagination .page-item').forEach((item, index) => {
        item.classList.toggle('active', index === currentPageIndex + 1);
    });
}

// Renderizar los películas cuando carga la página (o el contenido de DOM mejor dicho)
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const movies = await fetchMovies();
        renderMoviesPage(movies, 0);

        // Dejar lista la páginación
        document.querySelectorAll('.pagination .page-item').forEach((item, index) => {
            if (index === 0) {
                item.addEventListener('click', (event) => handlePrevNextClick(event, movies, false));
            } else if (index === 4) {
                item.addEventListener('click', (event) => handlePrevNextClick(event, movies, true));
            } else {
                item.addEventListener('click', (event) => handlePaginationClick(event, movies));
            }
        });
    } catch (error) {
        console.error('Error loading movies:', error);
    }
});

//Añadir a horarios
function addToHorarios(movie) {
    /* Casteamos la entrada a entero
    quantity = parseInt(quantity);
    
    // Verificamos que la cantidad sea un número válido y mayor que 0
    if (isNaN(quantity) || quantity <= 0) {
        alert('Por favor, ingresa una cantidad válida (mayor que 0).');
        // Cerramos el modal
        var quantityModal = bootstrap.Modal.getInstance(document.getElementById('quantityModal'));
        quantityModal.hide();
        document.querySelector(".modal-backdrop").remove();
        return; // Salimos de la función para no continuar con la adición al carrito
    }*/
    
    // Creamos nuestro boleto tipo objeto
    let object = JSON.parse(sessionStorage.getItem('object')) || {};
    const uuid = movie.uuid;
    
    /* Si ya existe en el carrito, sumamos la cantidad
    if (cart[uuid]) {
        cart[uuid].quantity += quantity;
        // Si no existe, lo agregamos
    } else {
        cart[uuid] = { movie, quantity };
    }*/
    
    // Lo almacenamos en el SessionStorage
    sessionStorage.setItem('object', JSON.stringify(object));
    // Si se almacenó correctamente, redirigimos al carrito
    if (object[uuid]) {
        window.location.href = "./horarios.html";
    }
}

// Listener del botón de AÑADIR A HORARIOS
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('ver-horario-button')) {
        // Obtiene el ID del película del botón que fue clickeado
        var movieId = event.target.getAttribute('data-movie-id');
        // Configura el ID del película en el campo oculto del modal
        document.getElementById('hiddenmovieIdInput').value = movieId;

        try {
            // Realizar la solicitud para obtener los datos del película usando el movie UUID
            const response = fetch(`http://localhost:3001/movies/${movieId}`);
            // Si no jala, no lo encuentra...
            if (!response.ok) {
                throw new Error('El película no pudo ser cargado');
            }
            const movie = response.json();
            
            // Llama a la función addToCart con el película y la cantidad seleccionada
            addToHorarios(movie);
        } catch (error) {
            // Manejamos el error por si truena de alguna otra manera
            console.error('Error al obtener el película:', error);
        }
        /* Abre el modal
        var quantityModal = new bootstrap.Modal(document.getElementById('quantityModal'));
        quantityModal.show();*/
    }
});

/*
// Listener del botón de confirmar del modal de añadir al carrito (declarado fuera de todo tipo de 
// listener por que también su buggean y explotan)
document.getElementById('confirmQuantityBtn').addEventListener('click', async function () {
    var quantity = document.getElementById('quantityInput').value;
    var movieId = document.getElementById('hiddenmovieIdInput').value;
    
    try {
        // Realizar la solicitud para obtener los datos del película usando el movie UUID
        const response = await fetch(`http://localhost:3000/movies/${movieId}`);
        // Si no jala, no lo encuentra...
        if (!response.ok) {
            throw new Error('El película no pudo ser cargado');
        }
        const movie = await response.json();
        
        // Llama a la función addToCart con el película y la cantidad seleccionada
        addToCart(movie, quantity);
        
        // Cierra el modal
        var quantityModal = bootstrap.Modal.getInstance(document.getElementById('quantityModal'));
        quantityModal.hide();
    } catch (error) {
        // Manejamos el error por si truena de alguna otra manera
        console.error('Error al obtener el película:', error);
    }
});

/*
document.getElementById('cancelQuantityBtn').addEventListener('click', async function () {
    // Hacer que jale el botón el modal #GraciasDorx :(
        document.querySelector(".modal-backdrop").remove();
    });

    document.getElementById('cross-close-modal').addEventListener('click', async function () {
        // Hacer que jale el botón el modal #GraciasDorx :(
    document.querySelector(".modal-backdrop").remove();
});*/