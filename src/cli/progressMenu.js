import inquirer from 'inquirer';

import {
    createProgressRecord,
    findProgressRecordById,
    findProgressRecordByClientPlanAndDate,
    findAllProgressRecords,
    updateProgressRecord
} from '../commands/progressCommands.js';

async function getProgressData() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'clientPlanId',
            message: 'ID de la asignación:'
        },
        {
            type: 'input',
            name: 'recordDate',
            message: 'Fecha del registro (YYYY-MM-DD):'
        },
        {
            type: 'input',
            name: 'weightKg',
            message: 'Peso (kg):'
        },
        {
            type: 'input',
            name: 'bodyFatPercentage',
            message: 'Grasa corporal (%):'
        },
        {
            type: 'input',
            name: 'waistCm',
            message: 'Cintura (cm):'
        },
        {
            type: 'input',
            name: 'chestCm',
            message: 'Pecho (cm):'
        },
        {
            type: 'input',
            name: 'armCm',
            message: 'Brazo (cm):'
        },
        {
            type: 'input',
            name: 'legCm',
            message: 'Pierna (cm):'
        },
        {
            type: 'input',
            name: 'photoUrl',
            message: 'URL de fotografía:'
        },
        {
            type: 'input',
            name: 'comments',
            message: 'Comentarios:'
        }
    ]);
}

async function create() {
    const data = await getProgressData();

    const record = await createProgressRecord(data);

    console.log('\nProgreso registrado correctamente.');
    console.table([record]);
}

async function findById() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID del registro:'
        }
    ]);

    const record = await findProgressRecordById(id);

    if (!record) {
        console.log('\nRegistro no encontrado.');
        return;
    }

    console.table([record]);
}

async function findByClientPlanAndDate() {
    const data = await inquirer.prompt([
        {
            type: 'input',
            name: 'clientPlanId',
            message: 'ID de la asignación:'
        },
        {
            type: 'input',
            name: 'recordDate',
            message: 'Fecha (YYYY-MM-DD):'
        }
    ]);

    const record =
        await findProgressRecordByClientPlanAndDate(
            data.clientPlanId,
            data.recordDate
        );

    if (!record) {
        console.log('\nRegistro no encontrado.');
        return;
    }

    console.table([record]);
}

async function findAll() {
    const records = await findAllProgressRecords();

    if (!records.length) {
        console.log('\nNo existen registros de progreso.');
        return;
    }

    console.table(records);
}

async function update() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID del registro:'
        }
    ]);

    const existingRecord = await findProgressRecordById(id);

    if (!existingRecord) {
        console.log('\nRegistro no encontrado.');
        return;
    }

    const data = await getProgressData();

    const record =
        await updateProgressRecord(id, data);

    console.log('\nRegistro actualizado correctamente.');
    console.table([record]);
}

export async function showProgressMenu() {
    let running = true;

    while (running) {
        const { option } = await inquirer.prompt([
            {
                type: 'select',
                name: 'option',
                message: 'Gestión de progreso físico:',
                choices: [
                    {
                        name: 'Registrar progreso',
                        value: 'create'
                    },
                    {
                        name: 'Consultar registro por ID',
                        value: 'findById'
                    },
                    {
                        name: 'Consultar por asignación y fecha',
                        value: 'findByClientPlanAndDate'
                    },
                    {
                        name: 'Listar registros',
                        value: 'findAll'
                    },
                    {
                        name: 'Actualizar registro',
                        value: 'update'
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

                case 'findByClientPlanAndDate':
                    await findByClientPlanAndDate();
                    break;

                case 'findAll':
                    await findAll();
                    break;

                case 'update':
                    await update();
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