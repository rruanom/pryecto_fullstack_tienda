const product = require('../models/products.models');
const { validationResult } = require("express-validator");

let id_productList=[];

const getTenProductsRandom = async (req, res) => {
    try{
        if (id_productList.lenght < 10){
        console.log(id_productList);
        id_productList = await product.getProductsRandom();
        console.log(id_productList)
        };
        const tenProductsRandom = await product.getTenProducts(id_productList);
        console.log(tenProductsRandom)
        return res.status(200).json(tenProductsRandom);
    } catch (error){
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getTenProductsRandom
};