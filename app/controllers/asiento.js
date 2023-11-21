// Clase de excepción personalizada para Asiento
class AsientoException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

// Clase Asiento
class Asiento {
    constructor(idAsiento, numeroAsiento, estado, idSala) {
        this._idAsiento = idAsiento;
        this._numeroAsiento = numeroAsiento;
        this._estado = estado; // Disponible/Ocupado
        this._idSala = idSala; // Relación con Sala
    }

    // Setters y Getters con validaciones
    set idAsiento(value) {
        if (!value.trim()) throw new AsientoException("El ID del asiento no puede estar vacío");
        this._idAsiento = value;
    }
    get idAsiento() {
        return this._idAsiento;
    }

    set numeroAsiento(value) {
        if (value <= 0) throw new AsientoException("El número del asiento debe ser mayor que cero");
        this._numeroAsiento = value;
    }
    get numeroAsiento() {
        return this._numeroAsiento;
    }

    set estado(value) {
        const validStates = ['Disponible', 'Ocupado'];
        if (!validStates.includes(value)) throw new AsientoException("Estado inválido. Debe ser 'Disponible' o 'Ocupado'");
        this._estado = value;
    }
    get estado() {
        return this._estado;
    }

    set idSala(value) {
        if (!value.trim()) throw new AsientoException("El ID de la sala no puede estar vacío");
        this._idSala = value;
    }
    get idSala() {
        return this._idSala;
    }

    // Métodos estáticos
    static createFromJson(jsonValue) {
        let obj = JSON.parse(jsonValue);
        return new Asiento(obj.idAsiento, obj.numeroAsiento, obj.estado, obj.idSala);
    }

    static createFromObject(obj) {
        idAsiento = generateUUID();
        this._numeroAsiento = numeroAsiento;
        this._estado = estado;
        this._idSala = idSala;
        let cleanObj = this.cleanObject(obj);
        return new Product(cleanObj.idAsiento, cleanObj.numeroAsiento, cleanObj.estado, cleanObj.idSala);
    }

    static cleanObject(obj) {
        let cleanObj = {};
        const validKeys = ["idAsiento", "numeroAsiento", "estado", "idSala"];
        for (let key of validKeys) {
            if (obj.hasOwnProperty(key)) {
                cleanObj[key] = obj[key];
            }
        }
        return cleanObj;
    }
}

module.exports = Asiento;