const { Pool } = require('pg');
const pool = require('../config/db_pgsql');
const queries = require('../queries/products.queries');


/* const getTenProductsRandom = async (offset) => {
    try {
        const client = await pool.connect();
        const {rows} = await client.query(queries.getTenProductsRandom, [offset])
        console.log(rows)
        return rows
    } catch (err) {
        console.error('Error al obtener los IDs de productos', err);
        throw err;
    }
} */

const getProductsByFilters = async (category, provider, keyword, page) => {
    try {
        const client = await pool.connect();
        const limit = 10;
        const offset = (page - 1) * limit;
        const data = await client.query(queries.getProductsByFilters, [category, provider, keyword, limit, offset]);
        const list = data.rows;
        client.release(); // Don't forget to release the client
        return list;
    } catch (err) {
        console.error('Error al obtener los productos por filtro', err);
        throw err;
    }
}
const deleteProductByName = async (name) =>{
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

const createProduct = async (name, description, price, image, provider, category) =>{
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.createProduct, [name, description, price, image, provider, category]);
        console.log(data)
        result = data.rows;
        return result
    } catch (error) {
        console.log(error);
        throw error;
    ;
};
}

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
    //getTenProductsRandom,
    getProductsByFilters,
    deleteProductByName,
    createProduct,
    updateProduct
};