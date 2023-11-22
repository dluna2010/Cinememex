const Usuario = require('../controllers/usuario');
const express = require('express');
const dataHandler_users = require('../controllers/data_handler_users');

const router = express.Router();

// Middleware de validación
//function validateAdmin(req, res, next) {
//    const authToken = req.headers['x-auth'];
//    if (authToken !== 'admin') {
//        res.status(403).json({ message: "Acceso no autorizado, no se cuenta con privilegios de administrador" });
//        return;
//    }
//    next();
//}

// Hacemos que use en TODAS las rutas :)
//router.use(validateAdmin);

// Obtener todos los usuarios
router.get('/', (req, res) => {
    try {
        const usuarios = dataHandler_users.getUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: "Error fetching usuarios", error: error.message });
    }
});
/*
// Ruta para crear un nuevo usuario
router.post('/', (req, res) => {
    try {
        const newUser = new Usuario(req.body.idUsuario, req.body.nombre, req.body.email, req.body.contraseñaEncriptada);
        const users = dataHandler.getUsers();
        users.push(newUser);
        dataHandler.writeUsersToFile(users);
        res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});

// Ruta para iniciar sesión
router.post('/login', (req, res) => {
    try {
        const { email, contraseña } = req.body;
        const users = dataHandler.getUsers();
        const userFound = users.find(user => user._email === email);

        if (userFound && userFound._contraseñaEncriptada === contraseña) {
            res.status(200).json({ message: 'Inicio de sesión exitoso', user: userFound });
        } else {
            res.status(401).json({ message: 'Usuario no encontrado o contraseña incorrecta' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});*/

// Otras rutas para usuarios, si son necesarias

module.exports = router;
