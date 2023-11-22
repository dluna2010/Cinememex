document.addEventListener('DOMContentLoaded', function() {
    const detallesPelicula = JSON.parse(sessionStorage.getItem('detallesPelicula'));
    const detallesHorario = JSON.parse(sessionStorage.getItem('detallesHorario'));

    if (!detallesPelicula || !detallesHorario) {
        // Manejar el caso en que no hay información disponible
        return;
    }

    mostrarInformacionPelicula(detallesPelicula);
    mostrarHorario(detallesHorario);

    const inputCantidadBoletos = document.getElementById('cantidad-boletos');
    const botonActualizar = document.getElementById('boton-actualizar');
    const botonEliminar = document.getElementById('boton-eliminar');

    botonActualizar.addEventListener('click', function() {
        actualizarCantidadBoletos(inputCantidadBoletos.value);
    });

    botonEliminar.addEventListener('click', function() {
        eliminarSeleccion();
    });
});

function mostrarInformacionPelicula(detallesPelicula) {
    // Código para mostrar la información de la película en la página
}

function mostrarHorario(detallesHorario) {
    // Código para mostrar la información del horario en la página
}

function actualizarCantidadBoletos(cantidad) {
    // Código para actualizar la cantidad de boletos
    // Esto podría involucrar actualizar la visualización y almacenar la cantidad en sessionStorage si es necesario
}

function eliminarSeleccion() {
    // Código para eliminar la selección de boletos y limpiar sessionStorage
    sessionStorage.removeItem('detallesPelicula');
    sessionStorage.removeItem('detallesHorario');
    // Redirigir a otra página o actualizar la página actual
}
