export const foodQueries = {
    create: `
        INSERT INTO foods
            (
                name,
                calories_per_100g,
                unit
            )
        VALUES
            (?, ?, ?)
    `,

    findById: `
        SELECT
            id,
            name,
            calories_per_100g,
            unit,
            status,
            created_at,
            updated_at
        FROM foods
        WHERE id = ?
    `,

    findAll: `
        SELECT
            id,
            name,
            calories_per_100g,
            unit,
            status,
            created_at,
            updated_at
        FROM foods
        ORDER BY id
    `,

    findByName: `
        SELECT
            id,
            name,
            calories_per_100g,
            unit,
            status,
            created_at,
            updated_at
        FROM foods
        WHERE name = ?
    `,

    update: `
        UPDATE foods
        SET
            name = ?,
            calories_per_100g = ?,
            unit = ?
        WHERE id = ?
    `,

    deactivate: `
        UPDATE foods
        SET
            status = 'INACTIVE'
        WHERE id = ?
    `
};