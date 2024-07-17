const express = require('express');
const usuariosController = require("../controllers/users.controller");
const router = express.Router();
//const { validateGetUserByEmail, validateCreateUser, validateUpdateUser, validateDeleteUser } = require("../validators/usuarios.validator");

router.get('/', usuariosController.getUsers);
router.post('/', usuariosController.createUser);
router.put('/', usuariosController.updateUser);
router.delete('/', usuariosController.deleteUser);
router.post('/registro', usuariosController.createUser);
router.post('/login', usuariosController.loginUser);

module.exports = router;