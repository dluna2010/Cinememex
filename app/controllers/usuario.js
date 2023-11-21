// Clase de excepción personalizada para Usuario
class UsuarioException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

// Clase Usuario
class Usuario {
    constructor(idUsuario, nombre, email, contraseñaEncriptada) {
        this._idUsuario = idUsuario;
        this._nombre = nombre;
        this._email = email;
        this._contraseñaEncriptada = contraseñaEncriptada;
    }

    // Setters y Getters con validaciones
    set idUsuario(value) {
        if (!value.trim()) throw new UsuarioException("El ID de usuario no puede estar vacío");
        this._idUsuario = value;
    }
    get idUsuario() {
        return this._idUsuario;
    }

    set nombre(value) {
        if (!value.trim()) throw new UsuarioException("El nombre no puede estar vacío");
        this._nombre = value;
    }
    get nombre() {
        return this._nombre;
    }

    set email(value) {
        if (!value.trim()) throw new UsuarioException("El email no puede estar vacío");
        this._email = value;
    }
    get email() {
        return this._email;
    }

    set contraseñaEncriptada(value) {
        // Aquí podrías agregar validaciones adicionales para la contraseña
        this._contraseñaEncriptada = value;
    }
    get contraseñaEncriptada() {
        return this._contraseñaEncriptada;
    }

    // Métodos estáticos
    static createFromJson(jsonValue) {
        let obj = JSON.parse(jsonValue);
        return new Usuario(obj.idUsuario, obj.nombre, obj.email, obj.contraseñaEncriptada);
    }

    static createFromObject(obj) {
        idUsuario = generateUUID();
        this._nombre = nombre;
        this._email = email;
        this._contraseñaEncriptada = contraseñaEncriptada;
        let cleanObj = this.cleanObject(obj);
        return new Product(cleanObj.idUsuario, cleanObj.nombre, cleanObj.email, cleanObj.contraseñaEncriptada);
    }

    static cleanObject(obj) {
        let cleanObj = {};
        const validKeys = ["idUsuario", "nombre", "email", "contraseñaEncriptada"];
        for (let key of validKeys) {
            if (obj.hasOwnProperty(key)) {
                cleanObj[key] = obj[key];
            }
        }
        return cleanObj;
    }
}

module.exports = Usuario;