export const nutritionDayQueries = {
    create: `
        INSERT INTO nutrition_days
            (
                nutrition_plan_id,
                day_date,
                notes
            )
        VALUES
            (?, ?, ?)
    `,

    findById: `
        SELECT
            id,
            nutrition_plan_id,
            day_date,
            notes
        FROM nutrition_days
        WHERE id = ?
    `,

    findAll: `
        SELECT
            id,
            nutrition_plan_id,
            day_date,
            notes
        FROM nutrition_days
        ORDER BY day_date
    `,

    findByNutritionPlanId: `
        SELECT
            id,
            nutrition_plan_id,
            day_date,
            notes
        FROM nutrition_days
        WHERE nutrition_plan_id = ?
        ORDER BY day_date
    `,

    findByPlanAndDate: `
        SELECT
            id,
            nutrition_plan_id,
            day_date,
            notes
        FROM nutrition_days
        WHERE nutrition_plan_id = ?
          AND day_date = ?
    `,

    update: `
        UPDATE nutrition_days
        SET
            day_date = ?,
            notes = ?
        WHERE id = ?
    `
};