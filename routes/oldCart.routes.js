const express = require('express');
const router = express.Router();
const oldCartController = require('../controllers/oldCart.controller');

router.post('/create-user', oldCartController.createUser);
router.post('/', oldCartController.saveCart);
router.get('/:email', oldCartController.getPreviousCarts);

module.exports = router;