const { Pool } = require('pg');
const pool = require('../config/db_pgsql');
const queries = require('../queries/products.queries');

const getProductById = async (id) => {
    const client = await pool.connect();
    try {
        const data = await client.query(queries.getProductById, [id]);
        const product = data.rows[0]; // Asumiendo que id es único, devolvemos solo el primer resultado
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

const deleteProductByName = async (name) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteProduct, [name]);
        result = data.rowCount;
        return result
    } catch (error) {
        console.log(error);
        throw error;
        ;
    };
}

const createProduct = async (productData) => {
    const { name, description, price, image, id_provider, id_category } = productData;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.createProduct, [name, description, price, image, id_provider, id_category]);
        console.log('Query result:', data);
        result = data.rows[0]; // Cambiado de data.rows a data.rows[0]
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

const updateProduct = async (product) => {
    const { description, price, image, category, provider, name } = product;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.updateProduct, [description, price, image, category, provider, name]);
        result = data.rows;
        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }

};

module.exports = {
    getProductById,
    getProductsByFilters,
    deleteProductByName,
    createProduct,
    updateProduct
};