const queries = {
    getProductsByName: `
    SELECT * 
    FROM products 
    WHERE name LIKE $1';`,
    //para hacer la paginacion de 10 en 10 en Home
    geAllProductsRandom:`
    SELECT id_product 
    FROM products 
    ORDER BY RAND();
    `,
    get10Products: `
    SELECT *
    FROM products
    WHERE product_id IN ($1, $2, $3, $3, $4, $5, $6, $7, $8, $9, $10);`,
    getProductByProvider:`
    SELECT *
    FROM products p
    JOIN providers pr ON p.provider_id = pr.provider_id
    WHERE pr.name ILIKE $1;
    `,
     getProductByCategory:`
    SELECT *
    FROM products p
    JOIN categories c ON p.category_id = c.category_id
    WHERE c.name ILIKE $1;`,
    updateProduct: `
    UPDATE products
    SET
        description = COALESCE($1, description),
        price = COALESCE($2, price),
        image = COALESCE($3, image),
        category_id = COALESCE($4, category),
        provider_id = COALESCE($5, provider_id)
    WHERE name = $6;`,
    deleteProduct: `
    DELETE FROM products
    WHERE name = $1
    RETURNING *;`,
    createProduct:`
    INSERT INTO products (name, description, price, provider_id, category_id, image)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `
}

module.exports = queries;