const pool = require('../config/db_pgsql');
const queries = require('../queries/providers.queries');

const getAllProviders = async () => {
    try {
        const client = await pool.connect();
        const data = await client.query(queries.getAllProviders);
        client.release();
        return data.rows;
    } catch (err) {
        console.error('Error al obtener los proveedores', err);
        throw err;
    }
};

const getProviderById = async (id) => {
    try {
        const client = await pool.connect();
        const data = await client.query(queries.getProviderById, [id]);
        client.release();
        return data.rows[0];
    } catch (err) {
        console.error('Error al obtener el proveedor', err);
        throw err;
    }
};

const createProvider = async (name, cif, address) => {
    try {
        const client = await pool.connect();
        const data = await client.query(queries.createProvider, [name, cif, address]);
        client.release();
        return data.rows[0];
    } catch (err) {
        console.error('Error al crear el proveedor', err);
        throw err;
    }
};

const updateProvider = async (id, name, cif, address) => {
    try {
        const client = await pool.connect();
        const data = await client.query(queries.updateProvider, [name, cif, address, id]);
        client.release();
        return data.rows[0];
    } catch (err) {
        console.error('Error al actualizar el proveedor', err);
        throw err;
    }
};

const deleteProvider = async (id) => {
    try {
        const client = await pool.connect();
        await client.query(queries.deleteProvider, [id]);
        client.release();
        return true;
    } catch (err) {
        console.error('Error al eliminar el proveedor', err);
        throw err;
    }
};

module.exports = {
    getAllProviders,
    getProviderById,
    createProvider,
    updateProvider,
    deleteProvider
};