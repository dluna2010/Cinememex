// Clase de excepción personalizada para Boleto
class BoletoException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

// Clase Boleto
class Boleto {
    constructor(idBoleto, idReserva, idAsiento) {
        this._idBoleto = idBoleto;
        this._idReserva = idReserva; // Relación con Reserva
        this._idAsiento = idAsiento; // Relación con Asiento
    }

    // Setters y Getters con validaciones
    set idBoleto(value) {
        if (!value.trim()) throw new BoletoException("El ID del boleto no puede estar vacío");
        this._idBoleto = value;
    }
    get idBoleto() {
        return this._idBoleto;
    }

    set idReserva(value) {
        if (!value.trim()) throw new BoletoException("El ID de la reserva no puede estar vacío");
        this._idReserva = value;
    }
    get idReserva() {
        return this._idReserva;
    }

    set idAsiento(value) {
        if (!value.trim()) throw new BoletoException("El ID del asiento no puede estar vacío");
        this._idAsiento = value;
    }
    get idAsiento() {
        return this._idAsiento;
    }

    // Métodos estáticos
    static createFromJson(jsonValue) {
        let obj = JSON.parse(jsonValue);
        return new Boleto(obj.idBoleto, obj.idReserva, obj.idAsiento);
    }

    static createFromObject(obj) {
        idBoleto = generateUUID();
        this._idReserva = idReserva;
        this._idAsiento = idAsiento;
        let cleanObj = this.cleanObject(obj);
        return new Product(cleanObj.idBoleto, cleanObj.idReserva, cleanObj.idAsiento);
    }

    static cleanObject(obj) {
        let cleanObj = {};
        const validKeys = ["idBoleto", "idReserva", "idAsiento"];
        for (let key of validKeys) {
            if (obj.hasOwnProperty(key)) {
                cleanObj[key] = obj[key];
            }
        }
        return cleanObj;
    }
}

module.exports = Boleto;