import inquirer from 'inquirer';
import { generateFinancialReport } from '../commands/financialCommands.js';


import {
    createFinancialTransaction,
    findFinancialTransactionById,
    findAllFinancialTransactions,
    updateFinancialTransaction,
    updateFinancialTransactionStatus
} from '../commands/financialCommands.js';

async function getFinancialData() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'clientPlanId',
            message: 'ID de la asignación (opcional):',
            filter: value => value ? Number(value) : null
        },
        {
            type: 'select',
            name: 'type',
            message: 'Tipo de transacción:',
            choices: [
                {
                    name: 'Ingreso',
                    value: 'INCOME'
                },
                {
                    name: 'Egreso',
                    value: 'EXPENSE'
                }
            ]
        },
        {
            type: 'select',
            name: 'category',
            message: 'Categoría:',
            choices: [
                {
                    name: 'Membresía',
                    value: 'MEMBERSHIP'
                },
                {
                    name: 'Sesión personal',
                    value: 'PERSONAL_SESSION'
                },
                {
                    name: 'Servicios',
                    value: 'SERVICES'
                },
                {
                    name: 'Suplementos',
                    value: 'SUPPLEMENTS'
                },
                {
                    name: 'Operación',
                    value: 'OPERATING'
                },
                {
                    name: 'Otro',
                    value: 'OTHER'
                }
            ]
        },
        {
            type: 'input',
            name: 'amount',
            message: 'Monto:',
            filter: value => Number(value)
        },
        {
            type: 'input',
            name: 'transactionDate',
            message: 'Fecha y hora (YYYY-MM-DD HH:mm:ss):'
        },
        {
            type: 'select',
            name: 'paymentMethod',
            message: 'Método de pago:',
            choices: [
                {
                    name: 'Efectivo',
                    value: 'CASH'
                },
                {
                    name: 'Tarjeta',
                    value: 'CARD'
                },
                {
                    name: 'Transferencia',
                    value: 'TRANSFER'
                },
                {
                    name: 'Otro',
                    value: 'OTHER'
                },
                {
                    name: 'No especificado',
                    value: null
                }
            ]
        },
        {
            type: 'input',
            name: 'description',
            message: 'Descripción:'
        },
        {
            type: 'input',
            name: 'reference',
            message: 'Referencia:'
        },
        {
            type: 'select',
            name: 'status',
            message: 'Estado:',
            choices: [
                {
                    name: 'Pendiente',
                    value: 'PENDING'
                },
                {
                    name: 'Completada',
                    value: 'COMPLETED'
                },
                {
                    name: 'Cancelada',
                    value: 'CANCELLED'
                }
            ]
        }
    ]);
}

async function create() {
    const data = await getFinancialData();

    const transaction =
        await createFinancialTransaction(data);

    console.log('\nTransacción registrada correctamente.');
    console.table([transaction]);
}

async function findById() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID de la transacción:'
        }
    ]);

    const transaction =
        await findFinancialTransactionById(id);

    if (!transaction) {
        console.log('\nTransacción no encontrada.');
        return;
    }

    console.table([transaction]);
}

async function findAll() {
    const transactions =
        await findAllFinancialTransactions();

    if (!transactions.length) {
        console.log('\nNo existen transacciones.');
        return;
    }

    console.table(transactions);
}

async function update() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID de la transacción:'
        }
    ]);

    const existing =
        await findFinancialTransactionById(id);

    if (!existing) {
        console.log('\nTransacción no encontrada.');
        return;
    }

    const data = await getFinancialData();

    const transaction =
        await updateFinancialTransaction(id, data);

    console.log('\nTransacción actualizada correctamente.');
    console.table([transaction]);
}

async function updateStatus() {
    const { id, status } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID de la transacción:'
        },
        {
            type: 'select',
            name: 'status',
            message: 'Nuevo estado:',
            choices: [
                {
                    name: 'Pendiente',
                    value: 'PENDING'
                },
                {
                    name: 'Completada',
                    value: 'COMPLETED'
                },
                {
                    name: 'Cancelada',
                    value: 'CANCELLED'
                }
            ]
        }
    ]);

    await updateFinancialTransactionStatus(id, status);

    console.log('\nEstado actualizado correctamente.');
}

async function generateReport() {
    const { year, month, clientPlanId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'year',
            message: 'Año del reporte (YYYY):',
            validate: value => !isNaN(value) && value.length === 4
        },
        {
            type: 'input',
            name: 'month',
            message: 'Mes del reporte (MM):',
            validate: value => !isNaN(value) && value >= 1 && value <= 12
        },
        {
            type: 'input',
            name: 'clientPlanId',
            message: 'ID del cliente (opcional):',
            filter: value => value ? Number(value) : null
        }
    ]);

    const report = await generateFinancialReport(year, month, clientPlanId);

    console.log('\\nReporte Financiero:');
    console.table(report);
};

export async function showFinancialMenu() {
    let running = true;

    while (running) {
        const { option } = await inquirer.prompt([
            {
                type: 'select',
                name: 'option',
                message: 'Gestión financiera:',
                choices: [
                    {
                        name: 'Registrar transacción',
                        value: 'create'
                    },
                    {
                        name: 'Consultar transacción',
                        value: 'findById'
                    },
                    {
                        name: 'Listar transacciones',
                        value: 'findAll'
                    },
                    {
                        name: 'Actualizar transacción',
                        value: 'update'
                    },
                    {
                        name: 'Cambiar estado',
                        value: 'updateStatus'
                    },
                    {
                        name: 'Generar reporte financiero',
                        value: 'generateReport'
                    },
                    {
                        name: 'Volver',
                        value: 'back'
                    }
                ]
            }
        ]);

        try {
            switch (option) {
                case 'create':
                    await create();
                    break;

                case 'findById':
                    await findById();
                    break;

                case 'findAll':
                    await findAll();
                    break;

                case 'update':
                    await update();
                    break;

                case 'updateStatus':
                    await updateStatus();
                    break;

                case 'generateReport':
                    await generateReport();
                    break;

                case 'back':
                    running = false;
                    break;
            }
        } catch (error) {
            console.error(`\nError: ${error.message}`);
        }

        if (running) {
            await inquirer.prompt([
                {
                    type: 'input',
                    name: 'continue',
                    message: 'Presione ENTER para continuar.'
                }
            ]);
        }
    }
}