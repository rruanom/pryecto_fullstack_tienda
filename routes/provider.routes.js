const express = require('express');
const providersController = require("../controllers/providers.controller");
const router = express.Router();

router.get('/', providersController.getAllProviders);
router.get('/:id', providersController.getProviderById);
router.post('/', providersController.createProvider);
router.put('/:id', providersController.updateProvider);
router.delete('/:id', providersController.deleteProvider);

module.exports = router;