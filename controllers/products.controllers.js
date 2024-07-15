const product = require('../models/products.models');
const { validationResult } = require("express-validator");

let id_productList = [];

const getTenProductsRandom = async (req, res) => {
    try {
        if (id_productList.length < 10) {
            id_productList = await product.getProductsRandom();
        };
        const tenProductsRandom = await product.getTenProducts([...id_productList]);
        return res.status(200).json(tenProductsRandom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductsByFilters = async (req, res) => {
    try {
        const category = req.body.category || "%"; 
        console.log('category', category)
        const provider = req.body.provider || "%";
        console.log('provider', provider)
        const keyword = req.params.keyword || "%";
        console.log('keyword', keyword)
        const products = await product.getProductsByFilters(category, provider, keyword); // Llamar a la función con el nombre obtenido
        return res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteProduct= async (req,res) =>{
    try{
        const name = req.params.name
        console.log('name', name)
        await product.deleteProductByName(name)
        console.log(`Se ha borrado el producto ${name}`)
        return res.status(200).json({succes: `Se ha borrado el producto ${name}`});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createProduct = async (req,res) => {
    try{
        const {name, description, price, image, provider, category} = req.body
        await product.createProduct(name, description, price, image, provider, category)
        console.log(`se ha creador el producto ${name}`)
        return res.status(200).json({succes: `Se ha creador el producto ${name}`});
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateProduct = async (req, res) => {
    const modifiedProduct = req.body;
    console.log('modifiedProduct', modifiedProduct)
    try {
        const response = await product.updateProduct(modifiedProduct);
        res.status(201).json({
            "items_updated": response,
            data: modifiedProduct
        });
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

module.exports = {
    getTenProductsRandom,
    getProductsByFilters,
    deleteProduct,
    createProduct,
    updateProduct
};

/*create product: 
{
"name": "puerros", 
"description": "manojo de puerros de murcia", 
"price": "3", 
"image": "https://st5.depositphotos.com/9648566/66723/i/450/depositphotos_667231348-stock-photo-may-2022-ukraine-city-kyiv.jpg", 
"provider": "Verduras del Campo S.A.", 
"category":"Arroz, legumbres y pasta"
}*/

/*
update product
{
"description": "puñadito de puerros de murcia", 
"price": "2", 
"image": "https://st5.depositphotos.com/9648566/66723/i/450/depositphotos_667231348-stock-photo-may-2022-ukraine-city-kyiv.jpg", 
"provider": "Verduras del Campo S.A.", 
"category":"Arroz, legumbres y pasta",
"name": "puerros"
}
*/