export const contractQueries = {
    create: `
        INSERT INTO contracts
            (
                client_plan_id,
                contract_number,
                conditions,
                start_date,
                end_date,
                price,
                status
            )
        VALUES
            (?, ?, ?, ?, ?, ?, ?)
    `,

    findById: `
        SELECT
            id,
            client_plan_id,
            contract_number,
            conditions,
            start_date,
            end_date,
            price,
            status,
            created_at,
            updated_at
        FROM contracts
        WHERE id = ?
    `,

    findAll: `
        SELECT
            id,
            client_plan_id,
            contract_number,
            conditions,
            start_date,
            end_date,
            price,
            status,
            created_at,
            updated_at
        FROM contracts
        ORDER BY id
    `,

    findByClientPlanId: `
        SELECT
            id,
            client_plan_id,
            contract_number,
            conditions,
            start_date,
            end_date,
            price,
            status,
            created_at,
            updated_at
        FROM contracts
        WHERE client_plan_id = ?
    `,

    findByNumber: `
        SELECT
            id,
            client_plan_id,
            contract_number,
            conditions,
            start_date,
            end_date,
            price,
            status,
            created_at,
            updated_at
        FROM contracts
        WHERE contract_number = ?
    `,

    update: `
        UPDATE contracts
        SET
            contract_number = ?,
            conditions = ?,
            start_date = ?,
            end_date = ?,
            price = ?,
            status = ?
        WHERE id = ?
    `,

    updateStatus: `
        UPDATE contracts
        SET
            status = ?
        WHERE id = ?
    `
};