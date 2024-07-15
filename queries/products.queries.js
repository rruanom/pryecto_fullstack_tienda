const queries = {
    getProductsByFilters:`
    SELECT *
    FROM (
    SELECT p.*, c.name AS category_name
    FROM products p
    JOIN categories c ON p.id_category = c.id_category
    WHERE LOWER(c.name) LIKE LOWER('%' || $1 || '%')
    ) AS byCategory
    JOIN (
    SELECT p.*, prov.name AS provider_name
    FROM products p
    JOIN providers prov ON p.id_provider = prov.id_provider
    WHERE LOWER(prov.name) LIKE LOWER('%' || $2 || '%')
    ) AS byProvider ON byCategory.id_product = byProvider.id_product
    WHERE LOWER(byProvider.provider_name) LIKE LOWER('%' || $3 || '%');`,
    //para hacer la paginacion de 10 en 10 en Home
    geAllProductsRandom:`
    SELECT id_product 
    FROM products 
    ORDER BY RANDOM();
    `,
    get10Products: `
    SELECT *
    FROM products
    WHERE id_product IN ($1, $2, $3, $3, $4, $5, $6, $7, $8, $9, $10);`,
    updateProduct: `
    UPDATE products
    SET
    description = COALESCE($1, description),
    price = COALESCE($2, price),
    image = COALESCE($3, image),
    id_category = COALESCE((SELECT id_category FROM categories WHERE name = $4), id_category),
    id_provider = COALESCE((SELECT id_provider FROM providers WHERE name = $5), id_provider)
    WHERE name = $6;`,
    deleteProduct: `
    DELETE FROM products
    WHERE name = $1
    RETURNING *;`,
    createProduct:`
    INSERT INTO products (name, description, price, image, id_provider, id_category)
    SELECT $1, $2, $3, $4, p.id_provider, c.id_category
    FROM providers p
    JOIN categories c ON p.name = $5 AND c.name = $6
    RETURNING *
    `
}

module.exports = queries;