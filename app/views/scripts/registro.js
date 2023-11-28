document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.register-form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Recoger los datos del formulario
        const userData = {
            nombre: document.getElementById('firstName').value,  // Cambiado de 'nombre' a 'firstName'
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        // Verificar si las contraseñas coinciden
        if (userData.password !== document.getElementById('confirmPassword').value) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Enviar solicitud POST al servidor
        fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        })
        .then(response => response.json())  // Asegúrate de parsear la respuesta como JSON
        .then(data => {
            if (data.message === 'Registro exitoso') {
                alert('Registro exitoso');
                window.location.href = './Inicio_sesión.html';
            } else {
                throw new Error(data.message);  // Lanza un error con el mensaje de la respuesta
            }
        })
        .catch((error) => {
            alert('Registro fallido: ' + error.message);
        });

    });
});