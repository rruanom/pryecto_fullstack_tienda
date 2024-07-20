const User = require('../models/oldCart.model');
const mongoose = require('mongoose');

async function createUser(email) {
    try {
        console.log("Attempting to create user in MongoDB with email:", email);
        const newUser = new User({ email, carts: [] });
        const savedUser = await newUser.save({ timeout: 15000 }); // Aumentado a 15 segundos
        console.log("User created successfully in MongoDB:", savedUser);
        return savedUser;
    } catch (error) {
        console.error("Error creating user in MongoDB:", error);
        if (error instanceof mongoose.Error.MongooseServerSelectionError) {
            throw new Error("Unable to connect to MongoDB. Please try again later.");
        }
        throw error;
    }
}

async function saveCart(email, cart) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    user.carts.push({ products: cart });
    if (user.carts.length > 10) {
        user.carts.shift(); // Elimina el carrito más antiguo si hay más de 10
    }
    return user.save();
}

async function getPreviousCarts(email) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    return user.carts.sort((a, b) => b.date - a.date).slice(0, 10);
}

module.exports = {
    createUser,
    saveCart,
    getPreviousCarts
};