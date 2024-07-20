const { Pool } = require('pg');
const pool = require('../config/db_pgsql');
const queries = require('../queries/products.queries');

const getProductById = async (id) => {
    const client = await pool.connect();
    try {
        const data = await client.query(queries.getProductById, [id]);
        const product = data.rows[0];
        return product;
    } catch (err) {
        console.error('Error al obtener el producto por id:', err);
        throw err;
    } finally {
        client.release();
    }
};

const getProductsByFilters = async (category, provider, keyword, page, priceOrder, limit, offset) => {
    try {
        const client = await pool.connect();
        console.log('Executing query with params:', category, provider, keyword, limit, offset, priceOrder);
        const data = await client.query(queries.getProductsByFilters, [category, provider, keyword, limit, offset, priceOrder]);
        client.release();
        
        return {
            products: data.rows,
            totalCount: data.rows.length > 0 ? parseInt(data.rows[0].total_count) : 0
        };
    } catch (err) {
        console.error('Error al obtener los productos por filtro', err);
        throw err;
    }
};

const deleteProductById = async (id) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteProduct, [id]);
        result = data.rowCount;
        return result;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
};

const createProduct = async (productData) => {
    const { name, description, price, image, id_provider, id_category } = productData;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.createProduct, [name, description, price, image, id_provider, id_category]);
        console.log('Query result:', data);
        result = data.rows[0];
        return result;
    } catch (error) {
        console.error('Error in createProduct:', error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
};

const updateProduct = async (id, productData) => {
    const { description, price, image, category, provider, name } = productData;
    let client, result;
    try {
        client = await pool.connect();
        console.log('Executing update query with params:', [description, price, image, category, provider, name, id]);
        const data = await client.query(queries.updateProduct, [description, price, image, category, provider, name, id]);
        result = data.rows[0];
        console.log('Update query result:', result);
    } catch (err) {
        console.error('Error in updateProduct:', err);
        throw err;
    } finally {
        if (client) {
            client.release();
        }
    }
    return result;
};

module.exports = {
    getProductById,
    getProductsByFilters,
    deleteProductById,
    createProduct,
    updateProduct
};