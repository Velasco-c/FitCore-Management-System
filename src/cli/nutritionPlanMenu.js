import inquirer from 'inquirer';

import {
    createNutritionPlan,
    findNutritionPlanById,
    findAllNutritionPlans,
    findNutritionPlansByClientPlan,
    updateNutritionPlan,
    updateNutritionPlanStatus
} from '../commands/nutritionPlanCommands.js';

async function getNutritionPlanData() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'clientPlanId',
            message: 'ID de la asignación:'
        },
        {
            type: 'input',
            name: 'name',
            message: 'Nombre del plan nutricional:'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Descripción:'
        },
        {
            type: 'input',
            name: 'dailyCalorieTarget',
            message: 'Objetivo diario de calorías:'
        },
        {
            type: 'input',
            name: 'startDate',
            message: 'Fecha de inicio (YYYY-MM-DD):'
        },
        {
            type: 'input',
            name: 'endDate',
            message: 'Fecha de finalización (YYYY-MM-DD):'
        },
        {
            type: 'select',
            name: 'status',
            message: 'Estado:',
            choices: [
                {
                    name: 'Activo',
                    value: 'ACTIVE'
                },
                {
                    name: 'Inactivo',
                    value: 'INACTIVE'
                },
                {
                    name: 'Finalizado',
                    value: 'COMPLETED'
                }
            ]
        }
    ]);
}

async function create() {
    const data = await getNutritionPlanData();

    const plan = await createNutritionPlan(data);

    console.log('\nPlan nutricional creado correctamente.');
    console.table([plan]);
}

async function findById() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID del plan nutricional:'
        }
    ]);

    const plan = await findNutritionPlanById(id);

    if (!plan) {
        console.log('\nPlan no encontrado.');
        return;
    }

    console.table([plan]);
}

async function findAll() {
    const plans = await findAllNutritionPlans();

    if (!plans.length) {
        console.log('\nNo existen planes nutricionales.');
        return;
    }

    console.table(plans);
}

async function findByClientPlan() {
    const { clientPlanId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'clientPlanId',
            message: 'ID de la asignación:'
        }
    ]);

    const plans =
        await findNutritionPlansByClientPlan(clientPlanId);

    if (!plans.length) {
        console.log('\nNo existen planes nutricionales.');
        return;
    }

    console.table(plans);
}

async function update() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID del plan nutricional:'
        }
    ]);

    const existingPlan = await findNutritionPlanById(id);

    if (!existingPlan) {
        console.log('\nPlan no encontrado.');
        return;
    }

    const data = await getNutritionPlanData();

    const plan = await updateNutritionPlan(id, data);

    console.log('\nPlan actualizado correctamente.');
    console.table([plan]);
}

async function updateStatus() {
    const { id, status } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID del plan nutricional:'
        },
        {
            type: 'select',
            name: 'status',
            message: 'Nuevo estado:',
            choices: [
                {
                    name: 'Activo',
                    value: 'ACTIVE'
                },
                {
                    name: 'Inactivo',
                    value: 'INACTIVE'
                },
                {
                    name: 'Finalizado',
                    value: 'COMPLETED'
                }
            ]
        }
    ]);

    await updateNutritionPlanStatus(id, status);

    console.log('\nEstado actualizado correctamente.');
}

export async function showNutritionPlanMenu() {
    let running = true;

    while (running) {
        const { option } = await inquirer.prompt([
            {
                type: 'select',
                name: 'option',
                message: 'Planes nutricionales:',
                choices: [
                    {
                        name: 'Crear plan',
                        value: 'create'
                    },
                    {
                        name: 'Consultar por ID',
                        value: 'findById'
                    },
                    {
                        name: 'Consultar por asignación',
                        value: 'findByClientPlan'
                    },
                    {
                        name: 'Listar planes',
                        value: 'findAll'
                    },
                    {
                        name: 'Actualizar plan',
                        value: 'update'
                    },
                    {
                        name: 'Cambiar estado',
                        value: 'updateStatus'
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

                case 'findByClientPlan':
                    await findByClientPlan();
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