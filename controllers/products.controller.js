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
        const { id } = req.params;
        console.log('Deleting product with ID:', id);
        const result = await product.deleteProductById(id);
        if (result > 0) {
            console.log(`Se ha borrado el producto con ID ${id}`);
            return res.status(200).json({ success: `Se ha borrado el producto con ID ${id}` });
        } else {
            return res.status(404).json({ error: `No se encontró el producto con ID ${id}` });
        }
    } catch (error) {
        console.error('Error al borrar el producto:', error);
        res.status(500).json({ error: error.message });
    }
};

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
    try {
        const { id } = req.params;
        const { description, price, image, category, provider, name } = req.body;
        console.log('Updating product:', { id, description, price, image, category, provider, name });
        
        const updatedProduct = await product.updateProduct(id, {
            description,
            price,
            image,
            category,
            provider,
            name
        });

        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found or not updated' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

module.exports = {
    getProductById,
    getProductsByFilters,
    deleteProduct,
    createProduct,
    updateProduct
};