export const financialTransactionQueries = {
    create: `
        INSERT INTO financial_transactions
            (
                client_plan_id,
                type,
                category,
                amount,
                transaction_date,
                payment_method,
                description,
                reference,
                status
            )
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,

    findById: `
        SELECT
            id,
            client_plan_id,
            type,
            category,
            amount,
            transaction_date,
            payment_method,
            description,
            reference,
            status,
            created_at
        FROM financial_transactions
        WHERE id = ?
    `,

    findAll: `
        SELECT
            id,
            client_plan_id,
            type,
            category,
            amount,
            transaction_date,
            payment_method,
            description,
            reference,
            status,
            created_at
        FROM financial_transactions
        ORDER BY transaction_date DESC
    `,

    findByClientPlanId: `
        SELECT
            id,
            client_plan_id,
            type,
            category,
            amount,
            transaction_date,
            payment_method,
            description,
            reference,
            status,
            created_at
        FROM financial_transactions
        WHERE client_plan_id = ?
        ORDER BY transaction_date DESC
    `,

    findByType: `
        SELECT
            id,
            client_plan_id,
            type,
            category,
            amount,
            transaction_date,
            payment_method,
            description,
            reference,
            status,
            created_at
        FROM financial_transactions
        WHERE type = ?
        ORDER BY transaction_date DESC
    `,

    updateStatus: `
        UPDATE financial_transactions
        SET
            status = ?
        WHERE id = ?
    `
};