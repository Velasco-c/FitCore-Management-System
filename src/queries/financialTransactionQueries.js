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

    update: `
    UPDATE financial_transactions
    SET
        client_plan_id = ?,
        type = ?,
        category = ?,
        amount = ?,
        transaction_date = ?,
        payment_method = ?,
        description = ?,
        reference = ?,
        status = ?
    WHERE id = ?
    `,

    updateStatus: `
        UPDATE financial_transactions
        SET
            status = ?
        WHERE id = ?
    `,
    generateMonthlyReport: `
        SELECT 
            SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END) AS total_income,
            SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) AS total_expense,
            (SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END) - 
            SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END)) AS net_balance
        FROM financial_transactions
        WHERE YEAR(transaction_date) = ? AND MONTH(transaction_date) = ?
        AND (? IS NULL OR client_plan_id = ?);
        `
    };