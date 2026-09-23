export const nutritionDayFoodQueries = {
    create: `
        INSERT INTO nutrition_day_foods
            (
                nutrition_day_id,
                food_id,
                meal_type,
                quantity,
                estimated_calories,
                notes
            )
        VALUES
            (?, ?, ?, ?, ?, ?)
    `,

    findById: `
        SELECT
            id,
            nutrition_day_id,
            food_id,
            meal_type,
            quantity,
            estimated_calories,
            notes
        FROM nutrition_day_foods
        WHERE id = ?
    `,

    findAll: `
        SELECT
            id,
            nutrition_day_id,
            food_id,
            meal_type,
            quantity,
            estimated_calories,
            notes
        FROM nutrition_day_foods
        ORDER BY id
    `,

    findByNutritionDayId: `
        SELECT
            id,
            nutrition_day_id,
            food_id,
            meal_type,
            quantity,
            estimated_calories,
            notes
        FROM nutrition_day_foods
        WHERE nutrition_day_id = ?
        ORDER BY id
    `,

    findByFoodId: `
        SELECT
            id,
            nutrition_day_id,
            food_id,
            meal_type,
            quantity,
            estimated_calories,
            notes
        FROM nutrition_day_foods
        WHERE food_id = ?
        ORDER BY id
    `,

    update: `
        UPDATE nutrition_day_foods
        SET
            food_id = ?,
            meal_type = ?,
            quantity = ?,
            estimated_calories = ?,
            notes = ?
        WHERE id = ?
    `
};