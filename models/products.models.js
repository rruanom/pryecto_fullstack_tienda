const { Pool } = require('pg');
const pool = require('../config/db_pgsql');
const queries = require('../queries/products.queries');


const getProductsRandom = async () => {
    try {
        const client = await pool.connect();
        const data = await client.query(queries.geAllProductsRandom)
        const list = data.rows
        const ids = list.map(item => item.id_product)
        return ids
    } catch (err) {
        console.error('Error al obtener los IDs de productos', err);
        throw err;
    }
}

const getTenProducts = async (idList) => {
    try {
        let client;
        const firstTenProducts = idList.slice(0, 10)
        idList.splice(0, 10);
        client = await pool.connect();
        const data = await client.query(queries.get10Products, firstTenProducts)
        return data.rows
    } catch (err) {
        console.error('Error al obtener los 10 productos', err);
        throw err;
    }
}

const getProductsByFilters = async (category, provider, keyword) => {
    try {
        const client = await pool.connect();
        const data = await client.query(queries.getProductsByFilters, [category, provider, keyword])
        const list = data.rows
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
    getProductsRandom,
    getTenProducts,
    getProductsByFilters,
    deleteProductByName,
    createProduct,
    updateProduct
};