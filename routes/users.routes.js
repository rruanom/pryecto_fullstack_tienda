const express = require('express');
const usuariosController = require("../controllers/users.controller");
const router = express.Router();

router.get('/', usuariosController.getUsers);
router.put('/', usuariosController.updateUser);
router.delete('/', usuariosController.deleteUser);
router.post('/register', usuariosController.createUser);
router.post('/login', usuariosController.loginUser);
router.post('/logout', usuariosController.logoutUser);
router.get('/check-auth', usuariosController.checkAuthStatus); 

module.exports = router;