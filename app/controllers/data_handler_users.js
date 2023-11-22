const fs = require('fs');
const path = require("path");

//-----------------------------------------------------------------------------------------------------------------------------------------------
//Apartado para Usuario
const usuariosFilePath = path.join(__dirname, "..", "data", "usuario.json");

// LEER usuarios del json
function readUsuariosFromFile() {
    try {
        const data = fs.readFileSync(usuariosFilePath, 'utf8');
        //console.table(data);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading the sucursales from file:', error);
        return [];
    }
}

// ESCRIBIR usuarios en el json
function writeUsuariosToFile(usuarios) {
    try {
        fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing sucursales to file:', error);
    }
}

// Obtener todos los usuarios
function getUsuarios() {
    let data = readUsuariosFromFile();
    return data;
}

// Obtener un usuario por ID
function getUsuarioById(idUsuario) {
    const usuarios = readUsuariosFromFile();
    return usuarios.find(usuario => usuario.idUsuario === idUsuario);
}

// Crear un nuevo usuario
function createUsuario(newUsuario) {
    const usuario = readUsuariosFromFile();
    usuario.push(newUsuario);
    writeUsuariosToFile(usuario);
    return newUsuario;
}

// Actualizar un usuario
function updateUsuario(idUsuario, updatedUsuario) {
    const usuarios = readUsuariosFromFile();
    const index = usuarios.findIndex(usuario => usuario.idUsuario === idUsuario);
    if (index !== -1) {
        usuarios[index] = { ...usuarios[index], ...updatedUsuario};
        writeUsuariosToFile(usuarios);
        return usuarios[index];
    }

    return null;
}

// Borrar un usuario
function deleteUsuario(idUsuario) {
    const usuarios = readFuncionesFromFile();
    const index = usuarios.findIndex(usuario => usuario.idUsuario === idUsuario);
    if (index !== -1) {
        const deletedUsuario = usuarios.splice(index, 1)[0];
        writeUsuariosToFile(usuarios);
        return deletedUsuario;
    }
    return null;
}

module.exports = {
// Funciones de Usuario
getUsuarios,
getUsuarioById,
writeUsuariosToFile,
createUsuario,
updateUsuario,
deleteUsuario,
};