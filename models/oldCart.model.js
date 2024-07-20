const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: [{
        id_product: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    carts: [cartSchema]
});

module.exports = mongoose.model('User', userSchema);