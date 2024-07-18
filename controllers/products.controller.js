const product = require('../models/products.model');
const { validationResult } = require("express-validator");

const getProductById = async (req, res) => {
    const {id} = req.params
    try {
        const result = await product.getProductById(id);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching product' });
    }
}

const getProductsByFilters = async (req, res) => {
    const { category = '', provider = '', keyword = '', page = 1, priceOrder = '', limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    console.log('Received request with params:', { category, provider, keyword, page, priceOrder, limit });

    try {
        const result = await product.getProductsByFilters(category, provider, keyword, parseInt(page), priceOrder, parseInt(limit), offset);
        res.json({
            products: result.products,
            totalCount: result.totalCount,
            currentPage: parseInt(page),
            totalPages: Math.ceil(result.totalCount / limit)
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching products' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const name = req.params.name
        console.log('name', name)
        await product.deleteProductByName(name)
        console.log(`Se ha borrado el producto ${name}`)
        return res.status(200).json({ succes: `Se ha borrado el producto ${name}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createProduct = async (req, res) => {
    try {
      const { name, price, description, id_category, id_provider, image } = req.body;
      console.log('Received product data:', { name, price, description, id_category, id_provider, image });
      
      const newProduct = await product.createProduct({ name, description, price, image, id_provider, id_category });
      
      console.log('New product created:', newProduct);
      
      if (newProduct) {
        res.status(201).json(newProduct);
      } else {
        res.status(500).json({ message: 'Product was not created' });
      }
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Error creating product', error: error.message });
    }
  };

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
    getProductById,
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