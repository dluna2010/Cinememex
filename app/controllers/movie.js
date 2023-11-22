const mongoose = require('mongoose');

// Esquema de Mongoose para la película
const movieSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    sinopsis: {
        type: String,
        required: true,
        trim: true
    },
    posterUrl: {
        type: String,
        required: true,
        trim: true
    },
    genero: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: Number,
        required: true,
        min: 0
    },
    reparto: {
        type: String,
        required: true,
        trim: true
    },
    trailerIframe: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

// Crear el modelo Mongoose utilizando el esquema definido
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;


/*const { generateUUID } = require("./util");

//Creación de la clase de excepción del película
class MovieException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

//Creación de la clase película
class Movie {
    constructor(titulo, sinopsis, posterUrl, genero, duration, reparto, trailerIframe) {
        this._uuid = generateUUID(); // Utilizamos el generate UUID
        this.titulo = titulo;
        this.sinopsis = sinopsis;
        this.posterUrl = posterUrl;
        this.genero = genero;
        this.duration = duration;
        this.reparto = reparto;
        this.trailerIframe = trailerIframe;
    }

    // Getters y Setters con validación y lanzamiento de excepciones.
    // Setter y Getter para uuid
    set uuid(value) {
        throw new MovieException("El UUID es auto-generado");
    }

    get uuid() {
        return this._uuid;
    }

    // Setter y Getter para título
    set titulo(value) {
        if (!value.trim()) throw new MovieException("El título no puede estar vacío");
        this._titulo = value;
    }

    get titulo() {
        return this._titulo;
    }

    // Setter y Getter para descriçión
    set sinopsis(value) {
        if (!value.trim()) throw new MovieException("La sinopsis no puede estar vacía");
        this._sinopsis = value;
    }

    get sinopsis() {
        return this._sinopsis;
    }

    // Setter y Getter para posterUrl
    set posterUrl(value) {
        if (!value.trim()) throw new MovieException("El URL del poster no puede estar vacío");
        this._posterUrl = value;
    }

    get posterUrl() {
        return this._posterUrl;
    }

    // Setter y Getter para genero
    set genero(value) {
        if (!value.trim()) throw new MovieException("El género no puede estar vacío");
        this._genero = value;
    }

    get genero() {
        return this._genero;
    }

    // Setter y Getter para reparto
    set reparto(value) {
        if (!value.trim()) throw new MovieException("El reparto no puede estar vacío");
        this._reparto = value;
    }

    get reparto() {
        return this._reparto;
    }

    // Setter y Getter para duration
    set duration(value) {
        if (value < 0) throw new MovieException("La duración no puede ser negativa");
        this._duration = value;
    }

    get duration() {
        return this._duration;
    }

    // Setter y Getter para trailerIframe
    set trailerIframe(value) {
        if (!value.trim()) throw new MovieException("El iFrame del trailer no puede estar vacío");
        this._trailerIframe = value;
    }

    get trailerIframe() {
        return this._trailerIframe;
    }

    // Métodos estáticos
    //Crear película desde String JSON
    static createFromJson(jsonValue) {
        let obj = JSON.parse(jsonValue);
        return this.createFromObject(obj);
    }

    //Crear película desde objeto
    static createFromObject(obj) {
        let cleanObj = this.cleanObject(obj);
        return new Product(cleanObj.uuid, cleanObj.titulo, cleanObj.sinopsis, cleanObj.posterUrl, cleanObj.genero, cleanObj.reparto, cleanObj.duration, cleanObj.trailerIframe);
    }

    //Limpiar el objeto si tiene cosas extras no pertenecientes a Movie
    static cleanObject(obj) {
        let cleanObj = {};
        // Aquí se especifican solo las propiedades que pertenecen a la clase Movie
        const validKeys = ["uuid", "titulo", "sinopsis", "posterUrl", "genero", "reparto", "duration", "trailerIframe"];
        for (let key of validKeys) {
            if (obj.hasOwnProperty(key)) {
                cleanObj[key] = obj[key];
            }
        }
        return cleanObj;
    }
}

module.exports = Movie;*/