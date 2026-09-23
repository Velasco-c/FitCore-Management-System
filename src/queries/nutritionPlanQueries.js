export const nutritionPlanQueries = {
    create: `
        INSERT INTO nutrition_plans
            (
                client_plan_id,
                name,
                description,
                daily_calorie_target,
                start_date,
                end_date,
                status
            )
        VALUES
            (?, ?, ?, ?, ?, ?, ?)
    `,

    findById: `
        SELECT
            id,
            client_plan_id,
            name,
            description,
            daily_calorie_target,
            start_date,
            end_date,
            status,
            created_at,
            updated_at
        FROM nutrition_plans
        WHERE id = ?
    `,

    findAll: `
        SELECT
            id,
            client_plan_id,
            name,
            description,
            daily_calorie_target,
            start_date,
            end_date,
            status,
            created_at,
            updated_at
        FROM nutrition_plans
        ORDER BY id
    `,

    findByClientPlanId: `
        SELECT
            id,
            client_plan_id,
            name,
            description,
            daily_calorie_target,
            start_date,
            end_date,
            status,
            created_at,
            updated_at
        FROM nutrition_plans
        WHERE client_plan_id = ?
        ORDER BY start_date DESC
    `,

    update: `
        UPDATE nutrition_plans
        SET
            name = ?,
            description = ?,
            daily_calorie_target = ?,
            start_date = ?,
            end_date = ?,
            status = ?
        WHERE id = ?
    `,

    updateStatus: `
        UPDATE nutrition_plans
        SET
            status = ?
        WHERE id = ?
    `
};