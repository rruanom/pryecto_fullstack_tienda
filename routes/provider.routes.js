const express = require('express');
const providersController = require("../controllers/providers.controller");
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const checkAdmin = require('../middlewares/checkAdmin');
const { validateCreateProvider, validateUpdateProvider, validateDeleteProvider } = require('../validators/providers.validators');

router.get('/', providersController.getAllProviders);
router.get('/:id', providersController.getProviderById);
router.post('/', checkAdmin, validateCreateProvider, providersController.createProvider);
router.put('/:id', checkAdmin, validateUpdateProvider, providersController.updateProvider);
router.delete('/:id', checkAdmin, validateDeleteProvider, providersController.deleteProvider);

module.exports = router;