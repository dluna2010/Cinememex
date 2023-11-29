document.addEventListener('DOMContentLoaded', function () {
    const selectedFuncion = JSON.parse(sessionStorage.getItem('funcionSeleccionada'));
    const cantidadDeBoletos = sessionStorage.getItem('cantidadBoletos');
    const asientosContainer = document.getElementById('movie-description');

    const seatsDiv = document.createElement('div');
    seatsDiv.className = 'container my-5';
    seatsDiv.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <img class="movie-image" src="${selectedFuncion.posterUrl}"
                        alt="${selectedFuncion.peliculaTitulo}">
                </div>
                <div class="col-md-8 movie-info">
                    <h2>Película: ${selectedFuncion.peliculaTitulo}</h2>
                    <p>Sucursal: ${selectedFuncion.sucursalNombre}</p>
                    <p>Fecha: 30 de noviembre de 2023</p>
                    <p>Función: ${selectedFuncion.horaFuncion}</p>
                    <p>Cantidad de Boletos: ${cantidadDeBoletos} </p>
                </div>
            </div>
        </div>
    `;

    asientosContainer.appendChild(seatsDiv);
});

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

document.addEventListener('DOMContentLoaded', function () {
    const seatsContainer = document.getElementById('seats');
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const numSeatsPerRow = 5;

    function createSeats() {
        rows.forEach(row => {
            const seatRow = document.createElement('div');
            seatRow.classList.add('seat-row');

            // Crear y agregar la letra de la fila
            const rowLabel = document.createElement('div');
            rowLabel.classList.add('row-label');
            rowLabel.textContent = row;
            seatRow.appendChild(rowLabel);

            for (let i = 1; i <= numSeatsPerRow; i++) {
                const seat = document.createElement('i');
                seat.classList.add('fas', 'fa-couch', 'seat');
                seat.dataset.row = row;
                seat.dataset.seatNumber = i;

                // Crear y agregar el número del asiento
                const seatNumber = document.createElement('span');
                seatNumber.classList.add('seat-number');
                seatNumber.textContent = i;
                seat.appendChild(seatNumber);

                /*if (Math.random() < 0.3) { // Ejemplo de asientos no disponibles
                    seat.classList.add('unavailable');
                }*/

                seat.addEventListener('click', toggleSeatSelection);
                seatRow.appendChild(seat);
            }

            seatsContainer.appendChild(seatRow);
        });
    }

    function toggleSeatSelection(event) {
        const seat = event.target.closest('.seat');
        if (!seat.classList.contains('unavailable')) {
            seat.classList.toggle('selected');
        }
    }

    createSeats();
});