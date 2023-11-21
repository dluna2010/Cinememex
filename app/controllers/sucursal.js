const { generateUUID } = require("./util");

// Clase de excepción personalizada para Sucursal
class SucursalException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

// Clase Sucursal
class Sucursal {
    constructor(uuid, nombre, ubicacion, numeroDeSalas) {
        this._uuiid = generateUUID();
        this._nombre = nombre;
        this._ubicacion = ubicacion;
        this._numeroDeSalas = numeroDeSalas;
    }

    // Setters y Getters con validaciones
    set uuid(value) {
        throw new SucursalException("El ID es auto-generado");
    }
    get uuid() {
        return this._id;
    }

    set nombre(value) {
        if (!value.trim()) throw new SucursalException("El nombre no puede estar vacío");
        this._nombre = value;
    }
    get nombre() {
        return this._nombre;
    }

    set ubicacion(value) {
        if (!value.trim()) throw new SucursalException("La ubicación no puede estar vacía");
        this._ubicacion = value;
    }
    get ubicacion() {
        return this._ubicacion;
    }

    set numeroDeSalas(value) {
        if (value <= 0) throw new SucursalException("El número de salas debe ser mayor que cero");
        this._numeroDeSalas = value;
    }
    get numeroDeSalas() {
        return this._numeroDeSalas;
    }

    // Métodos estáticos
    static createFromJson(jsonValue) {
        let obj = JSON.parse(jsonValue);
        return new Sucursal(obj.id, obj.nombre, obj.ubicacion, obj.numeroDeSalas);
    }

    static createFromObject(obj) {
        uuid = generateUUID();
        this._nombre = nombre;
        this._ubicacion = ubicacion;
        this._numeroDeSalas = numeroDeSalas;
        let cleanObj = this.cleanObject(obj);
        return new Product(cleanObj.uuid, cleanObj.nombre, cleanObj.ubicacion, cleanObj.numeroDeSalas);
    }

    static cleanObject(obj) {
        let cleanObj = {};
        const validKeys = ["id", "nombre", "ubicacion", "numeroDeSalas"];
        for (let key of validKeys) {
            if (obj.hasOwnProperty(key)) {
                cleanObj[key] = obj[key];
            }
        }
        return cleanObj;
    }
}

module.exports = Sucursal;