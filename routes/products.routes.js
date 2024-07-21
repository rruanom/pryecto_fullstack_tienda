const express = require('express');
const productsController = require("../controllers/products.controller");
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const checkAdmin = require('../middlewares/checkAdmin');

router.get('/id/:id', productsController.getProductById);
router.get('/page/', productsController.getProductsByFilters);
router.delete('/product/:id', checkAdmin, productsController.deleteProduct);
router.post('/product', checkAdmin, productsController.createProduct);
router.put('/product/:id', checkAdmin, productsController.updateProduct);

module.exports = router;