const queries = {
    getAllCategories: `
      SELECT * FROM categories
      ORDER BY id_category ASC
    `,
    getCategoryById: `
      SELECT * FROM categories
      WHERE id_category = $1
    `,
    createCategory: `
      INSERT INTO categories (name)
      VALUES ($1)
      RETURNING *
    `,
    updateCategory: `
      UPDATE categories
      SET name = $1
      WHERE id_category = $2
      RETURNING *
    `,
    deleteCategory: `
      DELETE FROM categories
      WHERE id_category = $1
      RETURNING *
    `
  };
  
  module.exports = queries;