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
                // Si el usuario ha iniciado sesión, proceder con la lógica de guardar orden
                guardarOrden();
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
                    <p>Asientos: ${selectedFuncion.asientosString} </p>
                </div>
            </div>
        </div>
    `;

    pagoContainer.appendChild(pagoDiv);
});

function guardarOrden() {
    if (!sessionStorage.getItem('funcionSeleccionada') || !sessionStorage.getItem('cantidadBoletos')) {
        //alert('Información de la orden incompleta');
        return;
    }

    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    const selectedFuncion = JSON.parse(sessionStorage.getItem('funcionSeleccionada'));
    const cantidadDeBoletos = parseInt(sessionStorage.getItem('cantidadBoletos'));

    fetch(`http://localhost:3001/api/pedidos/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tituloPelicula: selectedFuncion.peliculaTitulo,
            posterUrl: selectedFuncion.posterUrl,
            nombreSucursal: selectedFuncion.sucursalNombre,
            funcion: selectedFuncion.horaFuncion,
            cantidadBoletos: cantidadDeBoletos,
            asientosSeleccionados: selectedFuncion.asientosString, //Cambiar esto
            emailUsuario: usuario.email
        })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.message || 'Error desconocido al guardar la orden');
                });
            }
            return response.json();
        })
        .then(data => {
            alert('Orden guardada con éxito');
            // Limpia todo el sessionStorage y luego almacena nuevamente el objeto del usuario
            sessionStorage.clear();
            sessionStorage.setItem('usuario', JSON.stringify(usuario));
            // Redireccionar a la página de confirmación de la orden
            window.location.href = 'confirmacion_pago.html';
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            alert('Error al guardar la orden: ' + error.message);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    const payButtons = document.querySelectorAll('.payment-button');
    const asientosSeleccionados = JSON.parse(sessionStorage.getItem('asientosSeleccionados')) || [];

    payButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();

            actualizarEstadoAsientos(asientosSeleccionados, (error, data) => {
                if (error) {
                    console.error('Error al actualizar asientos:', error);
                    //alert('Error al actualizar asientos: ' + error.message);
                    return;
                }

                guardarOrden();
            });
        });
    });
});

function actualizarEstadoAsientos(asientosSeleccionados, callback) {
    fetch('http://localhost:3001/api/asientos/actualizar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ asientosSeleccionados })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar los asientos');
        }
        return response.json();
    })
    .then(data => {
        callback(null, data);
    })
    .catch(error => {
        callback(error);
    });
}


window.onload = function() {
    var usuario = sessionStorage.getItem('usuario');
    if (usuario) {
        // Si hay un usuario en sessionStorage, muestra el botón Ver Perfil y oculta Iniciar Sesión
        document.getElementById('verPerfilBtn').style.display = 'block';
        document.getElementById('iniciarSesionBtn').style.display = 'none';
    } else {
        // Si no hay un usuario, muestra el botón Iniciar Sesión y oculta Ver Perfil
        document.getElementById('verPerfilBtn').style.display = 'none';
        document.getElementById('iniciarSesionBtn').style.display = 'block';
    }
};