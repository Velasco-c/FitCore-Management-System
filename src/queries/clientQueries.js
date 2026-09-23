export const clientQueries = {
    create: `
        INSERT INTO clients
            (
                first_name,
                last_name,
                email,
                phone,
                birth_date,
                gender
            )
        VALUES
            (?, ?, ?, ?, ?, ?)
    `,

    findById: `
        SELECT
            id,
            first_name,
            last_name,
            email,
            phone,
            birth_date,
            gender,
            status,
            created_at,
            updated_at
        FROM clients
        WHERE id = ?
    `,

    findAll: `
        SELECT
            id,
            first_name,
            last_name,
            email,
            phone,
            birth_date,
            gender,
            status,
            created_at,
            updated_at
        FROM clients
        ORDER BY id
    `,

    findByEmail: `
        SELECT
            id,
            first_name,
            last_name,
            email,
            phone,
            birth_date,
            gender,
            status,
            created_at,
            updated_at
        FROM clients
        WHERE email = ?
    `,

    update: `
        UPDATE clients
        SET
            first_name = ?,
            last_name = ?,
            email = ?,
            phone = ?,
            birth_date = ?,
            gender = ?
        WHERE id = ?
    `,

    deactivate: `
        UPDATE clients
        SET
            status = 'INACTIVE'
        WHERE id = ?
    `
};