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

function guardarOrden(orden) {
    fetch('http://localhost:3001/api/pedidos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tituloPelicula: orden.funcion.peliculaTitulo,
            nombreSucursal: orden.funcion.sucursalNombre,
            funcion: orden.funcion.horaFuncion,
            cantidadBoletos: orden.cantidadDeBoletos,
            asientosSeleccionados: orden.funcion.asientosSeleccionados, // Asegúrate de tener esta información en orden.funcion
            emailUsuario: JSON.parse(orden.usuario).email // Asumiendo que el email está en el objeto de usuario
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al guardar la orden');
            }
            return response.json();
        })
        .then(data => {
            console.log('Orden guardada:', data);
            // Reiniciar sessionStorage manteniendo solo el objeto de usuario
            const usuario = sessionStorage.getItem('usuario');
            sessionStorage.clear();
            sessionStorage.setItem('usuario', usuario);

            // Redirigir a otra página o mostrar mensaje de éxito
            alert('Orden guardada con éxito');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al guardar la orden: ' + error.message);
        });
}