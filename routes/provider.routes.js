const express = require('express');
const providersController = require("../controllers/providers.controller");
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const checkAdmin = require('../middlewares/checkAdmin');

router.get('/', providersController.getAllProviders);
router.get('/:id', providersController.getProviderById);
router.post('/', checkAdmin, providersController.createProvider);
router.put('/:id', checkAdmin, providersController.updateProvider);
router.delete('/:id', checkAdmin, providersController.deleteProvider);

module.exports = router;