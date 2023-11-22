// Clase de excepción personalizada para Función
class FuncionException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

// Clase Función
class Funcion {
    constructor(idFuncion, fechaHora, idPelicula, idSala) {
        this._idFuncion = idFuncion;
        this.fechaHora = fechaHora;
        this._idPelicula = idPelicula; // Relación con Película
        this._idSala = idSala; // Relación con Sala
    }

    // Setters y Getters con validaciones
    set idFuncion(value) {
        if (!value.trim()) throw new FuncionException("El ID de la función no puede estar vacío");
        this._idFuncion = value;
    }
    get idFuncion() {
        return this._idFuncion;
    }

    set fechaHora(value) {
        // Validación para fecha y hora
        if (!Date.parse(value)) throw new FuncionException("Fecha y hora inválidas");
        this._fechaHora = value;
    }
    get fechaHora() {
        return this._fechaHora;
    }

    set idPelicula(value) {
        if (!value.trim()) throw new FuncionException("El ID de la película no puede estar vacío");
        this._idPelicula = value;
    }
    get idPelicula() {
        return this._idPelicula;
    }

    set idSala(value) {
        if (!value.trim()) throw new FuncionException("El ID de la sala no puede estar vacío");
        this._idSala = value;
    }
    get idSala() {
        return this._idSala;
    }

    // Métodos estáticos
    static createFromJson(jsonValue) {
        let obj = JSON.parse(jsonValue);
        return new Funcion(obj.idFuncion, obj.fechaHora, obj.idPelicula, obj.idSala);
    }

    static createFromObject(obj) {
        id = generateUUID();
        this._fechaHora = fechaHora;
        this._idPelicula = idPelicula;
        this._idSala = idSala;
        let cleanObj = this.cleanObject(obj);
        return new Product(cleanObj.idFuncion, cleanObj.fechaHora, cleanObj.idPelicula, cleanObj.idSala);
    }

    static cleanObject(obj) {
        let cleanObj = {};
        const validKeys = ["idFuncion", "fechaHora", "idPelicula", "idSala"];
        for (let key of validKeys) {
            if (obj.hasOwnProperty(key)) {
                cleanObj[key] = obj[key];
            }
        }
        return cleanObj;
    }
}

module.exports = Funcion;