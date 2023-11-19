const { generateUUID } = require("./util");

//Creación de la clase de excepción del película
class SucursalException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

//Creación de la clase película
// Añadirle UUID a este coso
class Sucursal {
    constructor(nombre, descripción, ubicación) {
        this._uuid = generateUUID(); // Utilizamos el generate UUID
        this.nombre = nombre;
        this.descripción = descripción;
        this.ubicación = ubicación;
    }

    // Getters y Setters con validación y lanzamiento de excepciones.
    // Setter y Getter para uuid
    set uuid(value) {
        throw new SucursalException("El UUID es auto-generado");
    }

    get uuid() {
        return this._uuid;
    }

    // Setter y Getter para nombre
    set nombre(value) {
        if (!value.trim()) throw new SucursalException("El nombre no puede estar vacío");
        this._nombre = value;
    }

    get nombre() {
        return this._nombre;
    }

    // Setter y Getter para descriçión
    set descripción(value) {
        if (!value.trim()) throw new SucursalException("La descripción no puede estar vacía");
        this._descripción = value;
    }

    get descripción() {
        return this._descripción;
    }

    // Setter y Getter para ubicación
    set ubicación(value) {
        if (!value.trim()) throw new SucursalException("La ubicación no puede estar vacía");
        this._ubicación = value;
    }

    get ubicación() {
        return this._ubicación;
    }

    // Métodos estáticos
    //Crear Sucursal desde String JSON
    static createFromJson(jsonValue) {
        let obj = JSON.parse(jsonValue);
        return this.createFromObject(obj);
    }

    //Crear Sucursal desde objeto
    static createFromObject(obj) {
        let cleanObj = this.cleanObject(obj);
        return new Product(cleanObj.uuid, cleanObj.nombre, cleanObj.descripción, cleanObj.ubicación);
    }

    //Limpiar el objeto si tiene cosas extras no pertenecientes a Sucursal
    static cleanObject(obj) {
        let cleanObj = {};
        // Aquí se especifican solo las propiedades que pertenecen a la clase Sucursal
        const validKeys = ["uuid", "nombre", "descripción", "ubicación"]
        for (let key of validKeys) {
            if (obj.hasOwnProperty(key)) {
                cleanObj[key] = obj[key];
            }
        }
        return cleanObj;
    }
}

module.exports = Sucursal;