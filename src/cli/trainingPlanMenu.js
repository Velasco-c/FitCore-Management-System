import inquirer from 'inquirer';

import {
    createTrainingPlan,
    findTrainingPlanById,
    findTrainingPlanByName,
    findAllTrainingPlans,
    updateTrainingPlan,
    deactivateTrainingPlan
} from '../commands/trainingPlanCommands.js';

async function getTrainingPlanData() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Nombre del plan:'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Descripción:'
        },
        {
            type: 'input',
            name: 'durationWeeks',
            message: 'Duración en semanas:'
        },
        {
            type: 'input',
            name: 'physicalGoals',
            message: 'Objetivos físicos:'
        },
        {
            type: 'select',
            name: 'level',
            message: 'Nivel:',
            choices: [
                {
                    name: 'Principiante',
                    value: 'BEGINNER'
                },
                {
                    name: 'Intermedio',
                    value: 'INTERMEDIATE'
                },
                {
                    name: 'Avanzado',
                    value: 'ADVANCED'
                }
            ]
        },
        {
            type: 'input',
            name: 'price',
            message: 'Precio:'
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
                }
            ]
        }
    ]);
}

async function create() {
    const data = await getTrainingPlanData();

    const plan = await createTrainingPlan(data);

    console.log('\nPlan creado correctamente.');
    console.table([plan]);
}

async function findById() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID del plan:'
        }
    ]);

    const plan = await findTrainingPlanById(id);

    if (!plan) {
        console.log('\nPlan no encontrado.');
        return;
    }

    console.table([plan]);
}

async function findByName() {
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Nombre del plan:'
        }
    ]);

    const plan = await findTrainingPlanByName(name);

    if (!plan) {
        console.log('\nPlan no encontrado.');
        return;
    }

    console.table([plan]);
}

async function findAll() {
    const plans = await findAllTrainingPlans();

    if (!plans.length) {
        console.log('\nNo existen planes registrados.');
        return;
    }

    console.table(plans);
}

async function update() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID del plan a actualizar:'
        }
    ]);

    const existingPlan = await findTrainingPlanById(id);

    if (!existingPlan) {
        console.log('\nPlan no encontrado.');
        return;
    }

    const data = await getTrainingPlanData();

    const plan = await updateTrainingPlan(id, data);

    console.log('\nPlan actualizado correctamente.');
    console.table([plan]);
}

async function deactivate() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID del plan a desactivar:'
        }
    ]);

    const existingPlan = await findTrainingPlanById(id);

    if (!existingPlan) {
        console.log('\nPlan no encontrado.');
        return;
    }

    const { confirm } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: `¿Desea desactivar el plan "${existingPlan.name}"?`,
            default: false
        }
    ]);

    if (!confirm) {
        console.log('\nOperación cancelada.');
        return;
    }

    await deactivateTrainingPlan(id);

    console.log('\nPlan desactivado correctamente.');
}

export async function showTrainingPlanMenu() {
    let running = true;

    while (running) {
        const { option } = await inquirer.prompt([
            {
                type: 'select',
                name: 'option',
                message: 'Gestión de planes de entrenamiento:',
                choices: [
                    {
                        name: 'Crear plan',
                        value: 'create'
                    },
                    {
                        name: 'Consultar plan por ID',
                        value: 'findById'
                    },
                    {
                        name: 'Consultar plan por nombre',
                        value: 'findByName'
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
                        name: 'Desactivar plan',
                        value: 'deactivate'
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

                case 'findByName':
                    await findByName();
                    break;

                case 'findAll':
                    await findAll();
                    break;

                case 'update':
                    await update();
                    break;

                case 'deactivate':
                    await deactivate();
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