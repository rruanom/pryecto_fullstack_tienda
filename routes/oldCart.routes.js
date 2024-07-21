const express = require('express');
const router = express.Router();
const oldCartController = require('../controllers/oldCart.controller');
const checkAuth = require('../middlewares/checkAuth');

router.post('/create-user', checkAuth, oldCartController.createUser);
router.post('/', checkAuth, oldCartController.saveCart);
router.get('/:email', checkAuth, oldCartController.getPreviousCarts);

module.exports = router;