async function fetchAsientos() {
    try {
        const response = await fetch('http://127.0.0.1:3001/api/asientos');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch asientos');
        }
        return data;
        // Si no se encuentran
    } catch (error) {
        console.error('Error fetching asientos:', error);
        throw error;
    }
}

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

/*document.addEventListener('DOMContentLoaded', function () {
    const seatsContainer = document.getElementById('seats');
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const numSeatsPerRow = 5;

    var idFuncion

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
                }/

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
});*/

/*document.addEventListener('DOMContentLoaded', async function () {
    // Obtener la función seleccionada desde sessionStorage
    const selectedFuncionId = sessionStorage.getItem('funcionIdManual');
    
    if (!selectedFuncionId) {
        // Manejar el caso en que no se haya seleccionado ninguna función
        alert('Por favor, seleccione una función antes de visualizar los asientos.');
        return;
    }

    try {
        // Obtener los asientos correspondientes a la función seleccionada desde la API
        const response = await fetch(`/api/asientos?idFuncion=${selectedFuncionId}`);
        
        if (!response.ok) {
            throw new Error(`Error al obtener los asientos. Código de estado: ${response.status}`);
        }

        const asientos = await response.json();
        
        /* Lógica para mostrar los detalles de la función (puedes mantener esto como está)
        const selectedFuncion = JSON.parse(sessionStorage.getItem('funcionSeleccionada'));
        const cantidadDeBoletos = sessionStorage.getItem('cantidadBoletos');
        const asientosContainer = document.getElementById('movie-description');/
        
        // ... Resto de tu código para mostrar detalles de la función
        
        // Mostrar los asientos obtenidos de la API
        const seatsContainer = document.getElementById('seats');
        const rows = [...new Set(asientos.map(asiento => asiento.row))];
        const numSeatsPerRow = 5;

        function createSeats() {
            rows.forEach(row => {
                const seatRow = document.createElement('div');
                seatRow.classList.add('seat-row');
                seatRow.dataset.row = row;

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

                    const seatInfo = asientos.find(a => a.row === row && a.seatNumber === i);
                    if (seatInfo) {
                        if (seatInfo.isAvailable) {
                            seat.classList.add('available');
                        } else {
                            seat.classList.add('unavailable');
                        }
                    }

                    seat.addEventListener('click', toggleSeatSelection);
                    seatRow.appendChild(seat);
                }

                seatsContainer.appendChild(seatRow);
            });
        }

        function toggleSeatSelection(event) {
            const seat = event.target.closest('.seat');
            if (seat.classList.contains('available')) {
                seat.classList.toggle('selected');
            }
        }

        createSeats();
    } catch (error) {
        console.error('Error al obtener los asientos:', error);
    }
});*/

document.addEventListener('DOMContentLoaded', async function () {
    /* Obtener la función seleccionada desde sessionStorage
    const selectedFuncion = sessionStorage.getItem('funcionSeleccionada');
    const selectedFuncionId = sessionStorage.getItem('funcionIdManual');
    console.log(selectedFuncion);
    console.log(selectedFuncionId);*/

    const funcionSeleccionada = JSON.parse(sessionStorage.getItem('funcionSeleccionada'));
    const selectedFuncionId = funcionSeleccionada.funcionIdManual;
    console.log(selectedFuncionId);
    
    if (!selectedFuncionId) {
        // Manejar el caso en que no se haya seleccionado ninguna función
        alert('Por favor, seleccione una función antes de visualizar los asientos.');
        return;
    }

    // Obtener los asientos seleccionados del sessionStorage
    const asientosSeleccionados = JSON.parse(sessionStorage.getItem('asientosSeleccionados')) || [];

    try {
        // Obtener los asientos correspondientes a la función seleccionada desde la API
        const response = await fetch(`http://127.0.0.1:3001/api/asientos/por-id-funcion/${selectedFuncionId}`);
        
        if (!response.ok) {
            throw new Error(`Error al obtener los asientos. Código de estado: ${response.status}`);
        }

        const asientos = await response.json();
        
        /* Lógica para mostrar los detalles de la función (puedes mantener esto como está)
        const selectedFuncion = JSON.parse(sessionStorage.getItem('funcionSeleccionada'));
        const cantidadDeBoletos = sessionStorage.getItem('cantidadBoletos');
        const asientosContainer = document.getElementById('movie-description');*/
        
        // ... Resto de tu código para mostrar detalles de la función
        
        // Mostrar los asientos obtenidos de la API y los asientos seleccionados
        const seatsContainer = document.getElementById('seats');
        const rows = [...new Set(asientos.map(asiento => asiento.row))];
        const numSeatsPerRow = 5;

        /*function createSeats() {
            rows.forEach(row => {
                const seatRow = document.createElement('div');
                seatRow.classList.add('seat-row');
                seatRow.dataset.row = row;

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

                    const seatInfo = asientos.find(a => a.row === row && a.seatNumber === i);
                    if (seatInfo) {
                        if (seatInfo.isAvailable) {
                            seat.classList.add('available');
                        } else {
                            seat.classList.add('unavailable');
                        }

                        // Comprobar si el asiento está seleccionado y marcarlo
                        if (asientosSeleccionados.some(s => s.row === row && s.seatNumber === i)) {
                            seat.classList.add('selected');
                        }
                    }

                    seat.addEventListener('click', toggleSeatSelection);
                    seatRow.appendChild(seat);
                }

                seatsContainer.appendChild(seatRow);
            });
        }*/

        function createSeats() {
            const columns = ['A', 'B', 'C', 'D', 'E', 'F']; // Las columnas representan las filas en este caso
        
            columns.forEach(column => {
                const seatsInColumn = asientos.filter(asiento => asiento.columna === column);
        
                if (seatsInColumn.length > 0) {
                    // Ordenar los asientos en esta columna por número
                    seatsInColumn.sort((a, b) => a.numero - b.numero);
        
                    const seatRow = document.createElement('div');
                    seatRow.classList.add('seat-row');
        
                    // Crear y agregar la letra de la fila (columna)
                    const rowLabel = document.createElement('div');
                    rowLabel.classList.add('row-label');
                    rowLabel.textContent = column;
                    seatRow.appendChild(rowLabel);
        
                    seatsInColumn.forEach(seatInfo => {
                        const seat = document.createElement('i');
                        seat.classList.add('fas', 'fa-couch', 'seat');
                        seat.dataset.row = seatInfo.columna; // Usar el valor de columna como fila
                        seat.dataset.seatNumber = seatInfo.numero;

                        //Crear y agregar el número del asiento
                        const seatNumber = document.createElement('div');
                        seatNumber.classList.add('seat-number');
                        seatNumber.textContent = seatInfo.numero;
                        seat.appendChild(seatNumber);
        
                        if (seatInfo.estado === 'Disponible') {
                            seat.classList.add('available');
                        } else {
                            seat.classList.add('unavailable');
                        }
        
                        // Comprobar si el asiento está seleccionado y marcarlo
                        if (asientosSeleccionados.some(s => s.row === column && s.seatNumber === seatInfo.numero)) {
                            seat.classList.add('selected');
                        }
        
                        seat.addEventListener('click', toggleSeatSelection);
        
                        seatRow.appendChild(seat);
                    });
        
                    seatsContainer.appendChild(seatRow); // Agregar la fila al contenedor
                }
            });
        }

        function toggleSeatSelection(event) {
            const seat = event.target.closest('.seat');
            if (seat.classList.contains('available')) {
                seat.classList.toggle('selected');

                // Actualizar la lista de asientos seleccionados en sessionStorage
                updateSelectedSeats();
            }
        }

        function updateSelectedSeats() {
            const selectedSeats = [];
            const selectedSeatElements = document.querySelectorAll('.seat.selected');
            
            selectedSeatElements.forEach(seatElement => {
                selectedSeats.push({
                    row: seatElement.dataset.row,
                    seatNumber: seatElement.dataset.seatNumber
                });
            });
            
            // Guardar la lista de asientos seleccionados en sessionStorage
            sessionStorage.setItem('asientosSeleccionados', JSON.stringify(selectedSeats));
        }

        createSeats();
    } catch (error) {
        console.error('Error al obtener los asientos:', error);
    }
});
