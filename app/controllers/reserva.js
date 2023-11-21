// Clase de excepción personalizada para Reserva
class ReservaException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

// Clase Reserva
class Reserva {
    constructor(idReserva, idUsuario, idFuncion, cantidadBoletos, precioTotal) {
        this._idReserva = idReserva;
        this._idUsuario = idUsuario; // Relación con Usuario
        this._idFuncion = idFuncion; // Relación con Función
        this._cantidadBoletos = cantidadBoletos;
        this._precioTotal = precioTotal;
    }

    // Setters y Getters con validaciones
    set idReserva(value) {
        if (!value.trim()) throw new ReservaException("El ID de la reserva no puede estar vacío");
        this._idReserva = value;
    }
    get idReserva() {
        return this._idReserva;
    }

    set idUsuario(value) {
        if (!value.trim()) throw new ReservaException("El ID de usuario no puede estar vacío");
        this._idUsuario = value;
    }
    get idUsuario() {
        return this._idUsuario;
    }

    set idFuncion(value) {
        if (!value.trim()) throw new ReservaException("El ID de la función no puede estar vacío");
        this._idFuncion = value;
    }
    get idFuncion() {
        return this._idFuncion;
    }

    set cantidadBoletos(value) {
        if (value <= 0) throw new ReservaException("La cantidad de boletos debe ser mayor que cero");
        this._cantidadBoletos = value;
    }
    get cantidadBoletos() {
        return this._cantidadBoletos;
    }

    set precioTotal(value) {
        if (value <= 0) throw new ReservaException("El precio total debe ser mayor que cero");
        this._precioTotal = value;
    }
    get precioTotal() {
        return this._precioTotal;
    }

    // Métodos estáticos
    static createFromJson(jsonValue) {
        let obj = JSON.parse(jsonValue);
        return new Reserva(obj.idReserva, obj.idUsuario, obj.idFuncion, obj.cantidadBoletos, obj.precioTotal);
    }

    static createFromObject(obj) {
        idReserva = generateUUID();
        this._idUsuario = idUsuario;
        this._idFuncion = idFuncion;
        this._cantidadBoletos = cantidadBoletos;
        this._precioTotal = precioTotal;
        let cleanObj = this.cleanObject(obj);
        return new Product(cleanObj.idReserva, cleanObj.idUsuario, cleanObj.idFuncion, cleanObj.cantidadBoletos, cleanObj.precioTotal);
    }

    static cleanObject(obj) {
        let cleanObj = {};
        const validKeys = ["idReserva", "idUsuario", "idFuncion", "cantidadBoletos", "precioTotal"];
        for (let key of validKeys) {
            if (obj.hasOwnProperty(key)) {
                cleanObj[key] = obj[key];
            }
        }
        return cleanObj;
    }
}

module.exports = Reserva;