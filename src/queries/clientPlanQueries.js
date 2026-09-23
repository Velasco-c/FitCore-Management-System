export const clientPlanQueries = {
    create: `
        INSERT INTO client_plans
            (
                client_id,
                training_plan_id,
                previous_client_plan_id,
                start_date,
                end_date,
                status,
                agreed_price,
                goal,
                cancelled_at,
                cancellation_reason
            )
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,

    findById: `
        SELECT
            id,
            client_id,
            training_plan_id,
            previous_client_plan_id,
            start_date,
            end_date,
            status,
            agreed_price,
            goal,
            cancelled_at,
            cancellation_reason,
            created_at,
            updated_at
        FROM client_plans
        WHERE id = ?
    `,

    findAll: `
        SELECT
            id,
            client_id,
            training_plan_id,
            previous_client_plan_id,
            start_date,
            end_date,
            status,
            agreed_price,
            goal,
            cancelled_at,
            cancellation_reason,
            created_at,
            updated_at
        FROM client_plans
        ORDER BY id
    `,

    findByClientId: `
        SELECT
            id,
            client_id,
            training_plan_id,
            previous_client_plan_id,
            start_date,
            end_date,
            status,
            agreed_price,
            goal,
            cancelled_at,
            cancellation_reason,
            created_at,
            updated_at
        FROM client_plans
        WHERE client_id = ?
        ORDER BY start_date DESC
    `,

    findActiveByClientId: `
        SELECT
            id,
            client_id,
            training_plan_id,
            previous_client_plan_id,
            start_date,
            end_date,
            status,
            agreed_price,
            goal,
            cancelled_at,
            cancellation_reason,
            created_at,
            updated_at
        FROM client_plans
        WHERE client_id = ?
          AND status = 'ACTIVE'
    `,

    update: `
        UPDATE client_plans
        SET
            training_plan_id = ?,
            previous_client_plan_id = ?,
            start_date = ?,
            end_date = ?,
            status = ?,
            agreed_price = ?,
            goal = ?,
            cancelled_at = ?,
            cancellation_reason = ?
        WHERE id = ?
    `,

    cancel: `
        UPDATE client_plans
        SET
            status = 'CANCELLED',
            cancelled_at = ?,
            cancellation_reason = ?
        WHERE id = ?
    `
};