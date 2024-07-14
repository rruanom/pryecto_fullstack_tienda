const { Pool } = require('pg');
const pool = require('../config/db_pgsql');
const queries = require('../queries/products.queries');


const getProductsRandom = async () => {
    try {
        const client = await pool.connect();
        const data = await client.query(queries.geAllProductsRandom)
        return data.rows
    } catch (err) {
        console.error('Error al obtener los IDs de productos', err);
        throw err;
    }
}

const getTenProducts = async (idList) =>{
    let client;
    const firsTenProducts = idList.slice(0, 10)
    idList.splice(0, 10);
    client = await pool.connect();
    const data = await client.query(queries.get10Products, [firsTenProducts])
    return data.rows
}

module.exports = {
    getProductsRandom,
    getTenProducts
};