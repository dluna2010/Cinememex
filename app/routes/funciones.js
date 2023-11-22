const express = require('express');
const router = express.Router();
const dataHandler = require('./función.js');  // Asumiendo que 'función.js' contiene tus data handlers

// Obtener todas las funciones
router.get('/funciones', (req, res) => {
    const funciones = dataHandler.getFunciones();
    res.json(funciones);
});

// Obtener una función por ID
router.get('/funciones/:id', (req, res) => {
    const id = req.params.id;
    const funcion = dataHandler.getFuncionById(id);
    if (funcion) {
        res.json(funcion);
    } else {
        res.status(404).send('Función no encontrada');
    }
});