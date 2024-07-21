const express = require('express');
const productsController = require("../controllers/products.controller");
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const checkAdmin = require('../middlewares/checkAdmin');
const { validateCreateProduct, validateUpdateProduct, validateDeleteProduct, validateGetProductsByFilters } = require('../validators/products.validators');

router.get('/id/:id', productsController.getProductById);
router.get('/page/', productsController.getProductsByFilters);
router.delete('/product/:id', checkAdmin, validateDeleteProduct, productsController.deleteProduct);
router.post('/product', checkAdmin, validateCreateProduct, productsController.createProduct);
router.put('/product/:id', checkAdmin, validateUpdateProduct, productsController.updateProduct);

module.exports = router;