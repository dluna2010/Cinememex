const express = require('express');
const dataHandler = require('../controllers/data_handler');
const ShoppingCart = require('../controllers/shopping_cart');

const router = express.Router();

// Obtener todos los productos
router.get('/', (req, res) => {
    try {
        const products = dataHandler.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
});

// Crear una instancia de ShoppingCart
const cart = new ShoppingCart();

// Agregar productos al carrito (por IDs)
router.post('/cart', (req, res) => {
    const productIds = req.body;
    if (!Array.isArray(productIds)) {
        res.status(400).json({ message: "Body should be an array of product IDs" });
        return;
    }
    try {
        const products = productIds.map(id => dataHandler.getProductById(id)).filter(product => product);
        if (products.length !== productIds.length) {
            res.status(404).json({ message: "Some products were not found" });
            return;
        }

        // Añadir productos al carrito de compras
        products.forEach(product => cart.addItem(product, 1));  // Uno como cantidad default

        // Regresar el contenido del carrito
        res.json(cart.getAllItems());
    } catch (error) {
        res.status(500).json({ message: "Error fetching products for cart", error: error.message });
    }
});

// Obtener producto por ID
router.get('/:id', (req, res) => {
    try {
        const product = dataHandler.getProductById(req.params.id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }
});

// Buscar producto por nombre o categoría
router.get('/search/:query', (req, res) => {
    const query = req.params.query;
    const products = dataHandler.findProduct(query);
    res.json(products);
});

module.exports = router;