const { generateUUID } = require("./util");

//Creación de la clase de excepción del película
class HorarioException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

//Creación de la clase película
class Horario {
    //Añadirle UUID y precio
    constructor(hora, minutos, categoría, precio) {
        this._uuid = generateUUID(); // Utilizamos el generate UUID
        this.hora = hora;
        this.minutos = minutos;
        this.categoría = categoría;
        this.precio = precio;
    }

    // Getters y Setters con validación y lanzamiento de excepciones.
    // Setter y Getter para uuid
    set uuid(value) {
        throw new HorarioException("El UUID es auto-generado");
    }

    get uuid() {
        return this._uuid;
    }

    // Setter y Getter para la hora
    set hora(value) {
        if (value < 0 && value <= 23) throw new HorarioException("La hora no puede ser negativa");
        this._hora = value;
    }

    get hora() {
        return this._hora;
    }

    // Setter y Getter para descriçión
    set minutos(value) {
        if (value < 0 && value <= 59) throw new HorarioException("Los minutos no pueden ser negativos");
        this._minutos = value;
    }

    get minutos() {
        return this._minutos;
    }

    // Setter y Getter para categoría
    set categoría(value) {
        if (!value.trim()) throw new HorarioException("La categoría no puede estar vacía");
        this._categoría = value;
    }

    get categoría() {
        return this._categoría;
    }

    // Setter y Getter para precio
    set precio(value) {
        if (value < 0) throw new HorarioException("El precio no puede ser negativo");
        this._precio = value;
    }

    get precio() {
        return this._precio;
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
        return new Product(cleanObj.uuid, cleanObj.hora, cleanObj.minutos, cleanObj.categoría, cleanObj.precio);
    }

    //Limpiar el objeto si tiene cosas extras no pertenecientes a Horario
    static cleanObject(obj) {
        let cleanObj = {};
        // Aquí se especifican solo las propiedades que pertenecen a la clase Horario
        const validKeys = ["uuid", "hora", "minutos", "categoría", "precio"];
        for (let key of validKeys) {
            if (obj.hasOwnProperty(key)) {
                cleanObj[key] = obj[key];
            }
        }
        return cleanObj;
    }
}

module.exports = Horario;