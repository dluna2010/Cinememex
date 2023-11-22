const express = require('express');
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
app.use("/", router);