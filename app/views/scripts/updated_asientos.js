
async function fetchAsientos() {
    try {
        const response = await fetch('http://127.0.0.1:3001/api/asientos');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch asientos');
        }
        return data;
    } catch (error) {
        console.error('Error fetching asientos:', error);
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    const asientos = await fetchAsientos();
    const contenedorAsientos = document.getElementById('contenedor-asientos');

    asientos.forEach(asiento => {
        const asientoElement = document.createElement('div');
        asientoElement.classList.add('asiento');
        asientoElement.id = `asiento-${asiento._id}`;

        if (asiento.estado === 'ocupado') {
            asientoElement.style.backgroundColor = 'red';
        } else {
            asientoElement.style.backgroundColor = 'grey';
        }

        asientoElement.addEventListener('click', () => {
            if (asiento.estado === 'disponible') {
                asiento.estado = 'seleccionado';
                asientoElement.style.backgroundColor = 'green';
                // Aquí puedes añadir el asiento a una lista de asientos seleccionados.
            }
            // Otras condiciones pueden ir aquí, por ejemplo, para deseleccionar un asiento.
        });

        contenedorAsientos.appendChild(asientoElement);
    });

    // Aquí necesitarás agregar la lógica para confirmar la orden.
    // Una vez confirmada, deberás cambiar el estado de los asientos seleccionados a 'ocupado' y actualizar la base de datos.
    // Si la orden no se completa, deberás devolver los asientos a 'disponible'.
});
