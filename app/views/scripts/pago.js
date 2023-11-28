document.addEventListener('DOMContentLoaded', function () {
    const usuario = sessionStorage.getItem('usuario');
    const modal = new bootstrap.Modal(document.getElementById('iniciarSesionModal'));
    const payButtons = document.querySelectorAll('.payment-button');

    payButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault(); // Previene la navegación del enlace
            if (!usuario) {
                modal.show();
            } else {
                // Si el usuario ha iniciado sesión, redirige a la página de confirmación
                window.location.href = 'confirmacion_pago.html';
            }
        });
    });

    const selectedFuncion = JSON.parse(sessionStorage.getItem('funcionSeleccionada'));
    const cantidadDeBoletos = sessionStorage.getItem('cantidadBoletos');
    const pagoContainer = document.getElementById('movie-description');

    const pagoDiv = document.createElement('div');
    pagoDiv.className = 'container my-5';
    pagoDiv.innerHTML = `
                        <div class="container">
                            <div class="row">
                                    <div class="col-md-4">
                                        <img class="movie-image" src="${selectedFuncion.posterUrl}" alt="${selectedFuncion.peliculaTitulo}">
                                    </div>
                                    <div class="col-md-8 movie-info">
                                        <h2>Película: ${selectedFuncion.peliculaTitulo}</h2>
                                        <p>Sucursal: ${selectedFuncion.sucursalNombre}</p>
                                        <p>Fecha: 30 de noviembre de 2023</p>
                                        <p>Función: ${selectedFuncion.horaFuncion}</p>
                                        <p>Cantidad de Boletos: ${cantidadDeBoletos} </p>
                                        <p>Asientos: (Al chile no se wey, regresate) </p>
                                    </div>
                            </div>
                        </div>
                        `;

    pagoContainer.appendChild(pagoDiv);

    // Llamada a la función para guardar la orden (si el usuario ha iniciado sesión)
    if (usuario) {
        guardarOrden({
            usuario: JSON.parse(usuario),
            funcion: selectedFuncion,
            cantidadDeBoletos: cantidadDeBoletos
        });
    }
});