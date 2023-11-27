document.addEventListener('DOMContentLoaded', function () {
    const selectedFuncion = JSON.parse(sessionStorage.getItem('funcionSeleccionada'));
    const boletoContainer = document.getElementById('boleto-container');

    if (!selectedFuncion) {
        boletoContainer.innerHTML = '<h5>No hay función seleccionada.</h5>';
        return;
    }

    const movieDiv = document.createElement('div');
    movieDiv.className = 'container my-5';
    movieDiv.innerHTML = `
        <div class="movie-description">
            <div class="container my-5">
                <div class="row">
                    <div class="col-md-4">
                        <img src="${selectedFuncion.posterUrl}" alt="Película" class="img-fluid">
                    </div>
                    <div class="col-md-8 movie-info">
                        <h2 style="color: goldenrod;">${selectedFuncion.peliculaTitulo}</h2>
                        <p style="color: white;">Sucursal: ${selectedFuncion.sucursalNombre} </p>
                        <p style="color: white;">Fecha: 30 de noviembre de 2023</p>
                        <p style="color: white;">Función: ${selectedFuncion.horaFuncion} </p>

                        <div style="text-align: center; color: white;">
                            <h1>Selecciona tus boletos</h1>
                            <p>A continuación selecciona la cantidad de boletos que desea para la función</p>
                        </div>

                        <div style="text-align: center;">

                            <!-- Grupo de entrada para la cantidad -->
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Cantidad:</span>
                                </div>
                                <input type="number" class="form-control quantity-input" value="1" disabled>
                                <!-- Botones para editar cantidad -->
                                <button type="button" class="btn btn-primary btn-sm edit-btn">
                                    Editar
                                </button>
                                <button type="button" class="btn btn-success btn-sm confirm-btn" style="display: none;">
                                    <i class="fas fa-check confirm-edit-icon"></i>
                                </button>
                                <button type="button" class="btn btn-danger btn-sm cancel-btn" style="display: none;">
                                    <i class="fas fa-times cancel-edit-icon"></i>
                                </button>
                            </div>
                            <br>
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Precio:</span>
                                </div>
                                <input type="text" class="form-control" value="75" disabled>
                                <div class="input-group-append">
                                    <span class="input-group-text">MXN</span>
                                </div>
                            </div>
                            <br>
                            <h4 class="mt-0 mb-1">

                                <!-- Botón para eliminar producto -->
                                <button type="button" class="btn btn-danger btn-sm delete-btn">
                                    Borrar
                                </button>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    boletoContainer.appendChild(movieDiv);

    // Referencias a los elementos del DOM
    const thisQuantity = movieDiv.querySelector('.quantity-input');
    const confirmBtn = movieDiv.querySelector('.confirm-btn');
    const cancelBtn = movieDiv.querySelector('.cancel-btn');
    const editBtn = movieDiv.querySelector('.edit-btn');
    const precioTotalInput = movieDiv.querySelector('.precio-total');

    const precioPorBoleto = 75;
    let cantidadOriginal = 1; // Cantidad original de boletos

    // Función para actualizar el precio total
    function updatePrecioTotal(cantidad) {
        const precioTotal = cantidad * precioPorBoleto;
        precioTotalInput.value = precioTotal;
    }

    // Evento para editar la cantidad de boletos
    editBtn.addEventListener('click', function () {
        cantidadOriginal = parseInt(thisQuantity.value);
        thisQuantity.removeAttribute('disabled');
        editBtn.style.display = 'none';
        confirmBtn.style.display = 'inline-block';
        cancelBtn.style.display = 'inline-block';
    });

    // Confirmar la nueva cantidad
    confirmBtn.addEventListener('click', function () {
        const nuevaCantidad = parseInt(thisQuantity.value);

        if (nuevaCantidad <= 0) {
            alert('La cantidad de boletos debe ser mayor que cero.');
            thisQuantity.value = cantidadOriginal;
        } else {
            cantidadOriginal = nuevaCantidad;
            updatePrecioTotal(nuevaCantidad);
            sessionStorage.setItem('cantidadBoletos', nuevaCantidad);
        }

        thisQuantity.setAttribute('disabled', 'true');
        editBtn.style.display = 'inline-block';
        confirmBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
    });

    // Cancelar la edición y regresar al valor original
    cancelBtn.addEventListener('click', function () {
        thisQuantity.value = cantidadOriginal;
        updatePrecioTotal(cantidadOriginal);
        thisQuantity.setAttribute('disabled', 'true');
        editBtn.style.display = 'inline-block';
        confirmBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
    });

    // Aquí puedes agregar más lógica para manejar la edición de cantidad de boletos, precios, etc.
});

//const cartTotal = document.getElementById('total');

/*function showProductsInCart() {
    let boleto = JSON.parse(sessionStorage.getItem('boleto')) || {};
    const moviesInBoleto = document.getElementById('boleto-container'); // Contenedor para los productos en el carrito

    moviesInBoleto.innerHTML = '';

    if (Object.keys(boleto).length === 0) {
        boleto.innerHTML = '<h5>No hay nada en el boleto.</h5>';
        return;
    }

    Object.keys(boleto).forEach(uuid => {
        const boletoItem = boleto[uuid];
        const movie = boletoItem.movie;
        const funcion = boletoItem.funcion;


        if (!product || !product.titulo || !product.description || !product.imageUrl || !product.pricePerUnit) {
            console.error('Producto con UUID:', uuid, 'tiene datos incompletos o incorrectos:', product);
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
        </div>
        
        
        <!-- Resumen de compra -->
        <div class="movie-description">
            <div class="container my-5">
                <div class="row">
                    <div class="col-md-4">
                        <img src="${movie.posterUrl}" alt="Película" class="img-fluid">
                    </div>
                    <div class="col-md-8 movie-info">
                        <h2 style="color: goldenrod;">Película: ${movie.titulo}</h2>
                        <p style="color: white;">Sucursal: Mov7eZ Sania</p>
                        <p style="color: white;">Fecha: ${funcion.fechaHora}</p>
                        <p style="color: white;">Función: 3:15 PM</p>

                        <div style="text-align: center; color: white;">
                            <h1>Selecciona tus boletos</h1>
                            <p>A continuación selecciona la cantidad de boletos que desea para la función</p>
                        </div>

                        <div style="text-align: center;">
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
                                <input type="text" class="form-control" value="${funcion.pricePerUnit}" disabled>
                                <div class="input-group-append">
                                    <span class="input-group-text">MXN</span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
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

    //updateCartTotal();
}

function deleteProduct(productUUID) {
    let cart = JSON.parse(sessionStorage.getItem('cart'));
    delete cart[productUUID];
    sessionStorage.setItem('cart', JSON.stringify(cart));
}
/*
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
}*/