const express = require('express');
const productsController = require("../controllers/products.controller");
const router = express.Router();

router.get('/id/:id', productsController.getProductById);
router.get('/page/', productsController.getProductsByFilters);
router.delete('/product/:id', productsController.deleteProduct);
router.post('/product', productsController.createProduct);
router.put('/product/:id', productsController.updateProduct);

module.exports = router;