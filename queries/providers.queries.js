const queries = {
    getAllProviders: `
    SELECT *
    FROM providers
    ORDER BY name;
    `,

    getProviderById: `
    SELECT *
    FROM providers
    WHERE id = $1;
    `,

    createProvider: `
    INSERT INTO providers (name, cif, address)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,

    updateProvider: `
    UPDATE providers
    SET
        name = COALESCE($1, name),
        cif = COALESCE($2, cif),
        address = COALESCE($3, address)
    WHERE id = $4
    RETURNING *;
    `,

    deleteProvider: `
    DELETE FROM providers
    WHERE id = $1
    RETURNING *;
    `,

    getProviderByName: `
    SELECT *
    FROM providers
    WHERE name = $1;
    `
}

module.exports = queries;