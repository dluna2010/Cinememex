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

async function fetchSalas() {
    try {
        const response = await fetch('http://127.0.0.1:3000/sala');
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
        const response = await fetch('http://127.0.0.1:3000/sucursal');
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
        const response = await fetch('http://127.0.0.1:3000/funciones');
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

const moviesInHorarios = document.getElementById('movie_container')
//const cartTotal = document.getElementById('total');

/*
function showMoviesInHorarios() {
    let object = JSON.parse(sessionStorage.getItem('object')) || {};
    const moviesInHorarios = document.getElementById('movie_container'); // Contenedor para los productos en el carrito

    moviesInHorarios.innerHTML = '';

    if (Object.keys(object).length === 0) {
        moviesInHorarios.innerHTML = '<h5>No hay película seleccionada.</h5>';
        return;
    }

    Object.keys(object).forEach(uuid => {
        const objectItem = object[uuid];
        const movie = objectItem.movie;
        //const quantity = cartItem.quantity;

        if (!movie || !movie.titulo || !movie.sinopsis || !movie.posterUrl) {
            console.error('Producto con UUID:', uuid, 'tiene datos incompletos o incorrectos:', movie);
            return; 
        }

        const productDiv = document.createElement('div');
        productDiv.className = "col-12 col-sm-10 col-md-8 col-lg-8 col-xl-8";
        productDiv.innerHTML = `
        <div class="p-3 border rounded my-2">
            <div class="row">
                <!-- Columna para los detalles del producto, más grande en pantallas pequeñas y medianas -->
                <div class="col-12 col-md-8 col-lg-9">
                    <h4 class="mt-0 mb-1">
                        ${product.title}
                        <!-- Botón para eliminar producto -->
                        <button type="button" class="btn btn-danger btn-sm delete-btn">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </h4>
                    <p>${product.description}</p>
                    <!-- Grupo de entrada para la cantidad -->
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Cantidad:</span>
                        </div>
                        <input type="number" class="form-control quantity-input" value="${quantity}" disabled>
                        <!-- Botones para editar cantidad -->
                        <button type="button" class="btn btn-primary btn-sm edit-btn">
                            <i class="fas fa-pencil-alt edit-icon"></i>
                        </button>
                        <button type="button" class="btn btn-success btn-sm confirm-btn" style="display: none;">
                            <i class="fas fa-check confirm-edit-icon"></i>
                        </button>
                        <button type="button" class="btn btn-danger btn-sm cancel-btn" style="display: none;">
                            <i class="fas fa-times cancel-edit-icon"></i>
                        </button>
                    </div>
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Precio:</span>
                        </div>
                        <input type="text" class="form-control" value="${product.pricePerUnit}" disabled>
                        <div class="input-group-append">
                            <span class="input-group-text">MXN</span>
                        </div>
                    </div>
                </div>
                <!-- Columna para la imagen del producto, se ajusta en diferentes tamaños de pantalla -->
                <div class="col-12 col-md-4 col-lg-3">
                    <img src="${product.imageUrl}" class="img-fluid float-md-right" alt="${product.title}" style="max-width: 120px; height: auto;">
                </div>
            </div>
        </div>`;


        productsInCart.appendChild(productDiv);

        const thisQuantity = productDiv.querySelector('.quantity-input');
        const confirmBtn = productDiv.querySelector('.confirm-btn');
        const cancelBtn = productDiv.querySelector('.cancel-btn');
        const editBtn = productDiv.querySelector('.edit-btn');
        const deleteBtn = productDiv.querySelector('.delete-btn');

        editBtn.addEventListener('click', function () {
            let originalQuantity = cart[uuid].quantity;
            thisQuantity.removeAttribute('disabled');
            editBtn.style.display = 'none';
            confirmBtn.style.display = 'inline-block';
            cancelBtn.style.display = 'inline-block';

            confirmBtn.addEventListener('click', function () {
            const newQuantity = parseInt(thisQuantity.value);
            if (newQuantity <= 0) {
                deleteProduct(uuid);
                productDiv.remove();
            } else {
                cart[uuid].quantity = newQuantity;
                sessionStorage.setItem('cart', JSON.stringify(cart));
            }

            thisQuantity.setAttribute('disabled', 'true');
            editBtn.style.display = 'inline-block';
            confirmBtn.style.display = 'none';
            cancelBtn.style.display = 'none';
            updateCartTotal();
        });

        cancelBtn.addEventListener('click', function () {
            thisQuantity.value = originalQuantity;
            thisQuantity.setAttribute('disabled', 'true');
            editBtn.style.display = 'inline-block';
            confirmBtn.style.display = 'none';
            cancelBtn.style.display = 'none';
        });
    });

        deleteBtn.addEventListener('click', function () {
            deleteProduct(uuid);
            productDiv.remove();
            updateCartTotal();
        });
    });

    updateCartTotal();
}

function deleteProduct(productUUID) {
    let cart = JSON.parse(sessionStorage.getItem('cart'));
    delete cart[productUUID];
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartTotal() {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || {};
    let total = 0;
    const cartItemsContainer = document.getElementById('cart-items');

    if (!cartItemsContainer) {
        console.error('No se encontró el contenedor de desglose de productos.');
        return;
    }

    cartItemsContainer.innerHTML = '';

    Object.values(cart).forEach(item => {
        const productTotal = item.product.pricePerUnit * item.quantity;
        total += productTotal;

        const productTotalDiv = document.createElement('div');
        productTotalDiv.className = 'mb-2';
        productTotalDiv.innerHTML = `<strong> ${item.product.title}: </strong> ${item.quantity} x $${item.product.pricePerUnit.toFixed(2)} MXN = $${productTotal.toFixed(2)} MXN`;
        cartItemsContainer.appendChild(productTotalDiv);
    });

    const totalElement = document.getElementById('cart-total-text');
    if (totalElement) {
        totalElement.textContent = `Total: $${total.toFixed(2)} MXN`;
    } else {
        console.error('No se encontró el elemento');
    }

    if (Object.keys(cart).length === 0) {
        document.getElementById('cart-container').innerHTML = '<h5>No hay productos en el carrito.</h5>';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    showMoviesInHorarios();
}); 
*/














function renderMovieDetails(movie, funciones, salas, sucursales) {
    // Crear el contenedor principal para una película
    const movieContainer = document.getElementById("movie_container")

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

function renderHorariosPage(products, pageIndex) {
    const productsContainer = document.getElementById('movie_container');
    productsContainer.innerHTML = '';  
    const start = pageIndex * 1; 
    const end = start + 1; 
    const productsToRender = products.slice(start, end);
    productsToRender.forEach(product => { 
        const col = renderMovieDetails(product);
        productsContainer.appendChild(col);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    renderMovieDetails();
}); 

document.querySelectorAll('.btn-horario').forEach(btn => {
    btn.addEventListener('click', function() {
        const peliculaId = this.getAttribute('data-pelicula-id');
        const horarioId = this.getAttribute('data-horario-id');
        
        // Aquí se asume que tienes una función que puede obtener los detalles de la película y el horario
        const detallesPelicula = obtenerDetallesPelicula(peliculaId);
        const detallesHorario = obtenerDetallesHorario(horarioId);

        sessionStorage.setItem('detallesPelicula', JSON.stringify(detallesPelicula));
        sessionStorage.setItem('detallesHorario', JSON.stringify(detallesHorario));
        window.location.href = 'boletos.html';
    });
});

function obtenerDetallesPelicula(peliculaId) {
    // Implementación para obtener detalles de la película, por ejemplo, desde movies.json
    // Esto puede variar según cómo estés cargando o almacenando estos datos
}

function obtenerDetallesHorario(horarioId) {
    // Implementación similar para obtener detalles del horario desde funcion.json
}

