const { Pool } = require('pg');
const pool = require('../config/db_pgsql');
const queries = require('../queries/categories.queries');

const getAllCategories = async () => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.getAllCategories);
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

const getCategoryById = async (id) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.getCategoryById, [id]);
    result = data.rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

const createCategory = async (name) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.createCategory, [name]);
    result = data.rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

const updateCategory = async (id, name) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.updateCategory, [name, id]);
    result = data.rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

const deleteCategory = async (id) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.deleteCategory, [id]);
    result = data.rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};