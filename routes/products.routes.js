const express = require('express');
const productsController = require("../controllers/products.controllers");
const router = express.Router();

router.get('/', productsController.getTenProductsRandom);
router.get('/products/:keyword?', productsController.getProductsByFilters);
router.delete('/product/:name?', productsController.deleteProduct)
router.post('/product', productsController.createProduct)

module.exports = router;