document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById("movie_container");
    const usuario = sessionStorage.getItem('usuario');
    //Cambiar esta lógica a si el usuario no hay realizado órdenes
    if (!usuario) {
        // Manejar el caso en que no hay un usuario en sessionStorage
        document.querySelector('.movie_container').innerHTML = `<h4> No se han realizado órdenes </h4>`;
        return;
    }

    try {
        const emailUsuario = JSON.parse(usuario).email;
        const response = await fetch(`http://localhost:3001/api/pedidos/usuario/${emailUsuario}`);
        if (!response.ok) {
            throw new Error('Error al obtener las órdenes');
        }
        const pedidos = await response.json();

        if (pedidos.length === 0) {
            // Si no hay pedidos para el usuario
            document.querySelector('.movie_container').innerHTML = `<p>No se han realizado órdenes</p>`;
            return;
        }

        // Si hay pedidos, mostrarlos en la página
        const pedidosContainer = document.querySelector('.movie_container');
        pedidosContainer.innerHTML = ''; // Limpiar el contenedor
        pedidos.forEach(pedido => {
            let contador = 1;
            const pedidoDiv = document.createElement('div');
            pedidoDiv.className = 'row';
            pedidoDiv.innerHTML = `
                                    <div class="row">
                                        <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 iframe-container">
                                            <h4><strong>Órden ${contador} </strong></h4>
                                            <div style="display: flex; justify-content: center;">
                                                <img src="${pedido.posterUrl}" alt="${pedido.tituloPelicula}" class="img-fluid">
                                            </div>
                                        </div>

                                        <!-- Contenido Informativo (Derecha) -->
                                        <div class="col-sm-12 col-md-12 col-lg-5 col-xl-5 info-container">
                                            <h3> Resumen de compra </h3>
                                            <p><strong>Película:</strong>  ${pedido.tituloPelicula} </p>
                                            <p><strong>Sucursal:</strong> ${pedido.nombreSucursal} </p>
                                            <p><strong>Fecha:</strong> 30 de noviembre de 2023 </p>
                                            <p><strong>Función:</strong> ${pedido.funcion} </p>
                                            <p><strong>Boleto(s):</strong> ${pedido.cantidadBoletos} boletos </p>
                                            <p><strong>Asiento(s):</strong> ${pedido.asientosSeleccionados} </p>
                                        </div>
                                    </div>
                                `;
            pedidosContainer.appendChild(pedidoDiv);
            contador +=1;
        });
    } catch (error) {
        console.error('Error:', error);
        document.querySelector('.movie_container').innerHTML = `<p>Error al cargar las órdenes: ${error.message}</p>`;
    }
});