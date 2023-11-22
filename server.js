const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // para parsear application/json

// Conectar a la base de datos
mongoose.connect('mongodb+srv://admin:admin@cluster0.necdoj1.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Conectado a la base de datos MongoDB"))
.catch(err => console.error("No se pudo conectar a MongoDB", err));

// Esquema y modelo de usuario
const userSchema = new mongoose.Schema({
    idUsuario: {type: String, required: true},
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Ruta POST para crear un usuario
app.post('/api/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Ruta GET para obtener todos los usuarios o filtrar por correo
app.get('/api/users', async (req, res) => {
    try {
        let query = {};
        if (req.query.email) {
            // Filtrar por correo (exacto e insensible a mayúsculas y minúsculas)
            query.email = new RegExp("^" + req.query.email + "$", "i");
        }

        const users = await User.find(query);
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});


// Ruta GET para obtener un usuario por su ID
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});


// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


/*const express = require('express');
const cors = require('cors');
const router = require("./app/controllers/router");

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log("Mov7eZ corriendo en el puerto " + port);
});

app.use(express.json());
app.use(cors());
app.use('/static', express.static('static'));
app.use("/", router);*/