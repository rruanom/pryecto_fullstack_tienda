const express = require('express');
const router = express.Router();
const oldCartController = require('../controllers/oldCart.controller');
const checkAuth = require('../middlewares/checkAuth');
const { validateCreateUser, validateSaveCart, validateGetPreviousCarts } = require('../validators/oldCart.validators');

router.post('/create-user', checkAuth, validateCreateUser, oldCartController.createUser);
router.post('/', checkAuth, validateSaveCart, oldCartController.saveCart);
router.get('/:email', checkAuth, validateGetPreviousCarts, oldCartController.getPreviousCarts);

module.exports = router;