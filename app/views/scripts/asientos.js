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

document.addEventListener('DOMContentLoaded', async function () {
    const funcionSeleccionada = JSON.parse(sessionStorage.getItem('funcionSeleccionada'));
    const selectedFuncionId = funcionSeleccionada.funcionIdManual;

    if (!selectedFuncionId) {
        alert('Por favor, seleccione una función antes de visualizar los asientos.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:3001/api/asientos/por-id-funcion/${selectedFuncionId}`);
        if (!response.ok) {
            throw new Error(`Error al obtener los asientos. Código de estado: ${response.status}`);
        }

        const asientos = await response.json();
        const seatsContainer = document.getElementById('seats');
        let asientosSeleccionados = JSON.parse(sessionStorage.getItem('asientosSeleccionados')) || [];

        const columns = ['A', 'B', 'C', 'D', 'E'];
        const numSeatsPerColumn = 5;

        columns.forEach(column => {
            const seatRow = document.createElement('div');
            seatRow.classList.add('seat-row');

            const rowLabel = document.createElement('div');
            rowLabel.classList.add('row-label');
            rowLabel.textContent = column;
            seatRow.appendChild(rowLabel);

            for (let i = 1; i <= numSeatsPerColumn; i++) {
                const seatInfo = asientos.find(a => a.columna === column && a.numero === i.toString());

                if (seatInfo) {
                    const seat = document.createElement('i');
                    seat.classList.add('fa', 'fa-couch', 'seat');
                    seat.dataset.row = column;
                    seat.dataset.seatNumber = i;
                    seat.dataset.asientoId = seatInfo._id;

                    const seatNumber = document.createElement('span');
                    seatNumber.classList.add('seat-number');
                    seatNumber.textContent = i;
                    seat.appendChild(seatNumber);

                    if (seatInfo.estado === 'ocupado') {
                        seat.classList.add('unavailable');
                        seat.style.color = 'red';
                    } else {
                        seat.classList.add('available');
                        seat.style.color = 'grey';
                        if (asientosSeleccionados.includes(seatInfo._id)) {
                            seat.classList.add('selected');
                            seat.style.color = 'green';
                        }
                        seat.addEventListener('click', function() { toggleSeatSelection(seatInfo, seat); });
                    }
                    
                    seatRow.appendChild(seat);
                }
            }

            seatsContainer.appendChild(seatRow);
        });

    } catch (error) {
        console.error('Error al obtener los asientos:', error);
    }
});

function toggleSeatSelection(asiento, seatElement) {
    let asientosSeleccionados = JSON.parse(sessionStorage.getItem('asientosSeleccionados')) || [];
    const asientoId = asiento._id;
    const asientoCodigo = asiento.columna + asiento.numero; // Código del asiento, como "A1"
    

    if (!seatElement.classList.contains('unavailable')) {
        seatElement.classList.toggle('selected');
        seatElement.style.color = seatElement.classList.contains('selected') ? 'green' : 'grey';

        if (seatElement.classList.contains('selected')) {
            if (!asientosSeleccionados.includes(asientoId)) {
                asientosSeleccionados.push(asientoId);
            }
        } else {
            asientosSeleccionados = asientosSeleccionados.filter(id => id !== asientoId);
        }

        // Actualiza el sessionStorage
        sessionStorage.setItem('asientosSeleccionados', JSON.stringify(asientosSeleccionados));
        actualizarSeleccionEnFuncion(asientosSeleccionados); // Actualiza el objeto seleccionado
    }
}

function actualizarSeleccionEnFuncion(asientosSeleccionados) {
    const selectedFuncion = JSON.parse(sessionStorage.getItem('funcionSeleccionada'));
    // Convierte el arreglo en una cadena con formato "A1, A2, A3"
    const asientosString = asientosSeleccionados.join(', ');
    // Actualiza el objeto selectedFuncion
    selectedFuncion.asientosSeleccionados = asientosString;
    sessionStorage.setItem('funcionSeleccionada', JSON.stringify(selectedFuncion));
}