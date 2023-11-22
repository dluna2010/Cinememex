
const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://admin:admin@cluster0.necdoj1.mongodb.net/';
let db = mongoose.connection;

db.on("Connecting", () => {
    console.log("Conectando...");
    console.log(mongoose.connection.readyState); //State 2: Connecting
})

db.on("Connected", () => {
    console.log("!Conectado exitosamente!");
    console.log(mongoose.connection.readyState); //State 2: Connecting
})

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongoose;