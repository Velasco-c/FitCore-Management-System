export const trainingPlanQueries = {
    create: `
        INSERT INTO training_plans
            (
                name,
                description,
                duration_weeks,
                physical_goals,
                level,
                price
            )
        VALUES
            (?, ?, ?, ?, ?, ?)
    `,

    findById: `
        SELECT
            id,
            name,
            description,
            duration_weeks,
            physical_goals,
            level,
            price,
            status,
            created_at,
            updated_at
        FROM training_plans
        WHERE id = ?
    `,

    findAll: `
        SELECT
            id,
            name,
            description,
            duration_weeks,
            physical_goals,
            level,
            price,
            status,
            created_at,
            updated_at
        FROM training_plans
        ORDER BY id
    `,

    findByName: `
        SELECT
            id,
            name,
            description,
            duration_weeks,
            physical_goals,
            level,
            price,
            status,
            created_at,
            updated_at
        FROM training_plans
        WHERE name = ?
    `,

    update: `
        UPDATE training_plans
        SET
            name = ?,
            description = ?,
            duration_weeks = ?,
            physical_goals = ?,
            level = ?,
            price = ?
        WHERE id = ?
    `,

    deactivate: `
        UPDATE training_plans
        SET
            status = 'INACTIVE'
        WHERE id = ?
    `
};