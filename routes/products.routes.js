const express = require('express');
const productsController = require("../controllers/products.controller");
const router = express.Router();

router.get('/id/:id', productsController.getProductById)
router.get('/page/', productsController.getProductsByFilters);
router.delete('/product/:name?', productsController.deleteProduct)
router.post('/product', productsController.createProduct)
router.put('/product', productsController.updateProduct)

module.exports = router;