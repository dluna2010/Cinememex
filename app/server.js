const express = require('express');
const fs = require('fs');
const router = require("./app/controllers/router");
const cors = require('cors');

const app = express();
const port = 3001;

//let products = JSON.parse(fs.readFileSync("./app/data/products.json", "utf-8"));

app.listen(port, () => {
    console.log("Mov7eZ corriendo en el puerto " + port);
});

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    res.send("Mov7eZ  Cinema Offical Website");
    console.log("Entro a la raíz");
});

app.use('/static', express.static('static'));

app.use("/", router);