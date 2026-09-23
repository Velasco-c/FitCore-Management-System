export const progressRecordQueries = {
    create: `
        INSERT INTO progress_records
            (
                client_plan_id,
                record_date,
                weight_kg,
                body_fat_percentage,
                waist_cm,
                chest_cm,
                arm_cm,
                leg_cm,
                photo_url,
                comments
            )
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,

    findById: `
        SELECT
            id,
            client_plan_id,
            record_date,
            weight_kg,
            body_fat_percentage,
            waist_cm,
            chest_cm,
            arm_cm,
            leg_cm,
            photo_url,
            comments,
            created_at
        FROM progress_records
        WHERE id = ?
    `,

    findAll: `
        SELECT
            id,
            client_plan_id,
            record_date,
            weight_kg,
            body_fat_percentage,
            waist_cm,
            chest_cm,
            arm_cm,
            leg_cm,
            photo_url,
            comments,
            created_at
        FROM progress_records
        ORDER BY record_date DESC
    `,

    findByClientPlanId: `
        SELECT
            id,
            client_plan_id,
            record_date,
            weight_kg,
            body_fat_percentage,
            waist_cm,
            chest_cm,
            arm_cm,
            leg_cm,
            photo_url,
            comments,
            created_at
        FROM progress_records
        WHERE client_plan_id = ?
        ORDER BY record_date DESC
    `,

    findByClientPlanAndDate: `
        SELECT
            id,
            client_plan_id,
            record_date,
            weight_kg,
            body_fat_percentage,
            waist_cm,
            chest_cm,
            arm_cm,
            leg_cm,
            photo_url,
            comments,
            created_at
        FROM progress_records
        WHERE client_plan_id = ?
          AND record_date = ?
    `,

    update: `
        UPDATE progress_records
        SET
            record_date = ?,
            weight_kg = ?,
            body_fat_percentage = ?,
            waist_cm = ?,
            chest_cm = ?,
            arm_cm = ?,
            leg_cm = ?,
            photo_url = ?,
            comments = ?
        WHERE id = ?
    `
};