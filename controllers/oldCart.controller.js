const oldCartService = require('../services/oldCart.services');
const { validationResult } = require("express-validator");

async function createUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email } = req.body;
        await oldCartService.createUser(email);
        res.status(201).json({ message: 'Usuario creado con éxito en MongoDB' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario en MongoDB', error: error.message });
    }
}

async function saveCart(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, cart } = req.body;
        const savedCart = await oldCartService.saveCart(email, cart);
        res.status(201).json(savedCart);
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar el carrito', error: error.message });
    }
}

async function getPreviousCarts(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email } = req.params;
        const carts = await oldCartService.getPreviousCarts(email);
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los carritos anteriores', error: error.message });
    }
}

module.exports = {
    createUser,
    saveCart,
    getPreviousCarts
};