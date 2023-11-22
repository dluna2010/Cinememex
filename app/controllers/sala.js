const { generateUUID } = require("./util");

// Clase de excepción personalizada para Sala
class SalaException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

// Clase Sala
class Sala {
    constructor(uuid, numeroDeSala, capacidad, idSucursal) {
        this._uuid = generateUUID();
        this.numeroDeSala = numeroDeSala;
        this.capacidad = capacidad;
        this._idSucursal = idSucursal; // Relación con Sucursal
    }

    // Setters y Getters con validaciones
    set uuid(value) {
        if (!value.trim()) throw new SalaException("El ID de la sala no puede estar vacío");
        this._idSala = value;
    }
    get uuid() {
        return this._idSala;
    }

    set numeroDeSala(value) {
        if (value <= 0) throw new SalaException("El número de sala debe ser mayor que cero");
        this._numeroDeSala = value;
    }
    get numeroDeSala() {
        return this._numeroDeSala;
    }

    set capacidad(value) {
        if (value <= 0) throw new SalaException("La capacidad debe ser mayor que cero");
        this._capacidad = value;
    }
    get capacidad() {
        return this._capacidad;
    }

    set idSucursal(value) {
        if (!value.trim()) throw new SalaException("El ID de la sucursal no puede estar vacío");
        this._idSucursal = value;
    }
    get idSucursal() {
        return this._idSucursal;
    }

    // Métodos estáticos
    static createFromJson(jsonValue) {
        let obj = JSON.parse(jsonValue);
        return new Sala(obj.idSala, obj.numeroDeSala, obj.capacidad, obj.idSucursal);
    }

    static createFromObject(obj) {
        uuid = generateUUID();
        this._numeroDeSala = numeroDeSala;
        this._capacidad = capacidad;
        this._idSucursal = idSucursal;
        let cleanObj = this.cleanObject(obj);
        return new Product(cleanObj.uuid, cleanObj.numeroDeSala, cleanObj.capacidad, cleanObj.idSucursal);
    }

    static cleanObject(obj) {
        let cleanObj = {};
        const validKeys = ["idSala", "numeroDeSala", "capacidad", "idSucursal"];
        for (let key of validKeys) {
            if (obj.hasOwnProperty(key)) {
                cleanObj[key] = obj[key];
            }
        }
        return cleanObj;
    }
}

module.exports = Sala;