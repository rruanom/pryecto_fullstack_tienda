const express = require('express');
const usuariosController = require("../controllers/users.controller");
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const checkAdmin = require('../middlewares/checkAdmin');

router.get('/', usuariosController.getUsers);
router.put('/', checkAdmin, usuariosController.updateUser);
router.delete('/', checkAdmin, usuariosController.deleteUser);
router.post('/register', usuariosController.createUser);
router.post('/login', usuariosController.loginUser);
router.post('/logout', checkAuth, usuariosController.logoutUser);
router.get('/check-auth', usuariosController.checkAuthStatus); 

module.exports = router;