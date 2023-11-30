document.addEventListener('DOMContentLoaded', async () => {
    const usuario = sessionStorage.getItem('usuario');

    // Cambiar esta lógica para verificar si el usuario está autenticado
    if (!usuario) {
        // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
        window.location.href = './Inicio_sesión.html';
        return;
    }

    try {
        const emailUsuario = JSON.parse(usuario).email;
        const response = await fetch(`http://localhost:3001/api/pedidos/usuario/${emailUsuario}`);

        const pedidosContainer = document.querySelector('.movie_container');
        pedidosContainer.innerHTML = ''; // Limpiar el contenedor

        if (!response.ok && response.status === 404) {
            // Si no se encontraron pedidos, tratar como caso esperado
            pedidosContainer.innerHTML = `<h3> No se han realizado órdenes </h3>`;
        } else if (!response.ok) {
            // Otros errores de servidor
            throw new Error('Error al obtener las órdenes');
        } else {
            const responseData = await response.json();
            // Si hay pedidos, mostrarlos en la página
            let contador = 1;
            responseData.forEach(pedido => {
                const pedidoDiv = document.createElement('div');
                pedidoDiv.className = 'row';
                pedidoDiv.innerHTML = `
                    <div class="row">
                        <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 iframe-container">
                            <h4><strong>Órden ${contador}</strong></h4>
                            <div style="display: flex; justify-content: center;">
                                <img src="${pedido.posterUrl}" alt="${pedido.tituloPelicula}" class="img-fluid orders-img">
                            </div>
                        </div>

                        <!-- Contenido Informativo (Derecha) -->
                        <div class="col-sm-12 col-md-12 col-lg-5 col-xl-5 info-container">
                            <h3> Resumen de compra </h3>
                            <p><strong>Película:</strong> ${pedido.tituloPelicula}</p>
                            <p><strong>Sucursal:</strong> ${pedido.nombreSucursal}</p>
                            <p><strong>Fecha:</strong> 30 de noviembre de 2023</p>
                            <p><strong>Función:</strong> ${pedido.funcion}</p>
                            <p><strong>Boleto(s):</strong> ${pedido.cantidadBoletos} boletos</p>
                            <p><strong>Asiento(s):</strong> ${pedido.asientosSeleccionados}</p>
                        </div>
                    </div>
                `;
                pedidosContainer.appendChild(pedidoDiv);
                contador += 1;
            });
        }
    } catch (error) {
        console.error('Error:', error);
        document.querySelector('.movie_container').innerHTML = `<p>Error al cargar las órdenes: ${error.message}</p>`;
    }
});