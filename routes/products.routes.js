const express = require('express');
const productsController = require("../controllers/products.controllers");
const router = express.Router();

router.get('/:page?', productsController.getTenProductsRandom);
router.get('/products/', productsController.getProductsByFilters);
router.delete('/product/:name?', productsController.deleteProduct)
router.post('/product', productsController.createProduct)
router.put('/product', productsController.updateProduct)

module.exports = router;