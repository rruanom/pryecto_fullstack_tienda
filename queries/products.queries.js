const queries = {
    getProductsByFilters:`
    SELECT *
    FROM (
    SELECT *, c.name AS category_name
    FROM products p
    JOIN categories c ON p.id_category = c.id_category
    WHERE LOWER(c.name) LIKE LOWER('%' || $1 || '%')
    ) AS byCategory
    JOIN (
    SELECT *, prov.name AS provider_name
    FROM products p
    JOIN providers prov ON p.id_provider = prov.id_provider
    WHERE LOWER(prov.name) LIKE LOWER('%' || $2 || '%')
    ) AS byProvider ON byCategory.id_product = byProvider.id_product
    WHERE LOWER(byProvider.provider_name) LIKE LOWER('%' || $3 || '%')
    ORDER BY RANDOM()
    LIMIT 10 OFFSET $1;`,
    //para hacer la paginacion de 10 en 10 en Home de manera aleatoria
    getTenProductsRandom: `
    SELECT p.name, p.image, p.price, p.id_category,
       prov.name AS provider, c.name AS category
    FROM products p
    JOIN providers prov ON p.id_provider = prov.id_provider
    JOIN categories c ON p.id_category = c.id_category
    ORDER BY RANDOM()
    LIMIT 10 OFFSET $1;
    `,
    updateProducts:
    `SET
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