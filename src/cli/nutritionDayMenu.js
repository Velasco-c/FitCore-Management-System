import inquirer from 'inquirer';

import {
    createNutritionDay,
    findNutritionDayById,
    findAllNutritionDays,
    findNutritionDayByPlanAndDate,
    updateNutritionDay
} from '../commands/nutritionDayCommands.js';

async function getNutritionDayData() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'nutritionPlanId',
            message: 'ID del plan nutricional:',
            filter: value => Number(value)
        },
        {
            type: 'input',
            name: 'dayDate',
            message: 'Fecha del día (YYYY-MM-DD):'
        },
        {
            type: 'input',
            name: 'notes',
            message: 'Notas:'
        }
    ]);
}

async function create() {
    const data = await getNutritionDayData();

    const day = await createNutritionDay(data);

    console.log('\nDía nutricional creado correctamente.');
    console.table([day]);
}

async function findById() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID del día nutricional:',
            filter: value => Number(value)
        }
    ]);

    const day = await findNutritionDayById(id);

    if (!day) {
        console.log('\nDía no encontrado.');
        return;
    }

    console.table([day]);
}

async function findAll() {
    const days = await findAllNutritionDays();

    if (!days.length) {
        console.log('\nNo existen días nutricionales.');
        return;
    }

    console.table(days);
}

async function findByPlanAndDate() {
    const data = await inquirer.prompt([
        {
            type: 'input',
            name: 'nutritionPlanId',
            message: 'ID del plan nutricional:',
            filter: value => Number(value)
        },
        {
            type: 'input',
            name: 'dayDate',
            message: 'Fecha (YYYY-MM-DD):'
        }
    ]);

    const day =
        await findNutritionDayByPlanAndDate(
            data.nutritionPlanId,
            data.dayDate
        );

    if (!day) {
        console.log('\nDía no encontrado.');
        return;
    }

    console.table([day]);
}

async function update() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID del día nutricional:',
            filter: value => Number(value)
        }
    ]);

    const existingDay = await findNutritionDayById(id);

    if (!existingDay) {
        console.log('\nDía no encontrado.');
        return;
    }

    const data = await getNutritionDayData();

    const day = await updateNutritionDay(id, data);

    console.log('\nDía actualizado correctamente.');
    console.table([day]);
}

export async function showNutritionDayMenu() {
    let running = true;

    while (running) {
        const { option } = await inquirer.prompt([
            {
                type: 'select',
                name: 'option',
                message: 'Días nutricionales:',
                choices: [
                    {
                        name: 'Crear día',
                        value: 'create'
                    },
                    {
                        name: 'Consultar por ID',
                        value: 'findById'
                    },
                    {
                        name: 'Consultar por plan y fecha',
                        value: 'findByPlanAndDate'
                    },
                    {
                        name: 'Listar días',
                        value: 'findAll'
                    },
                    {
                        name: 'Actualizar día',
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

                case 'findByPlanAndDate':
                    await findByPlanAndDate();
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