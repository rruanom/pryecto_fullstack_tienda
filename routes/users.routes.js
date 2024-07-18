const express = require('express');
const usuariosController = require("../controllers/users.controller");
const router = express.Router();
//const { validateGetUserByEmail, validateCreateUser, validateUpdateUser, validateDeleteUser } = require("../validators/usuarios.validator");

router.get('/', usuariosController.getUsers);
router.put('/', usuariosController.updateUser);
router.delete('/', usuariosController.deleteUser);
router.post('/register', usuariosController.createUser);
router.post('/login', usuariosController.loginUser);
router.post('/logout', usuariosController.logoutUser);

module.exports = router;