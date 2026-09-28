import inquirer from 'inquirer';

import {
    createFood,
    findFoodById,
    findAllFoods,
    updateFood,
    deactivateFood
} from '../commands/foodCommands.js';

async function getFoodData() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Nombre del alimento:'
        },
        {
            type: 'input',
            name: 'caloriesPer100g',
            message: 'Calorías por 100g:',
            filter: value => value ? Number(value) : null
        },
        {
            type: 'input',
            name: 'unit',
            message: 'Unidad:',
            default: 'g'
        }
    ]);
}

async function create() {
    const data = await getFoodData();

    const food = await createFood(data);

    console.log('\nAlimento creado correctamente.');
    console.table([food]);
}

async function findById() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID del alimento:',
            filter: value => Number(value)
        }
    ]);

    const food = await findFoodById(id);

    if (!food) {
        console.log('\nAlimento no encontrado.');
        return;
    }

    console.table([food]);
}

async function findAll() {
    const foods = await findAllFoods();

    if (!foods.length) {
        console.log('\nNo existen alimentos registrados.');
        return;
    }

    console.table(foods);
}

async function update() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID del alimento:',
            filter: value => Number(value)
        }
    ]);

    const existingFood = await findFoodById(id);

    if (!existingFood) {
        console.log('\nAlimento no encontrado.');
        return;
    }

    const data = await getFoodData();

    const food = await updateFood(id, data);

    console.log('\nAlimento actualizado correctamente.');
    console.table([food]);
}

async function deactivate() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID del alimento:',
            filter: value => Number(value)
        }
    ]);

    const existingFood = await findFoodById(id);

    if (!existingFood) {
        console.log('\nAlimento no encontrado.');
        return;
    }

    const { confirm } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: `¿Desea desactivar "${existingFood.name}"?`,
            default: false
        }
    ]);

    if (!confirm) {
        console.log('\nOperación cancelada.');
        return;
    }

    await deactivateFood(id);

    console.log('\nAlimento desactivado correctamente.');
}

export async function showFoodMenu() {
    let running = true;

    while (running) {
        const { option } = await inquirer.prompt([
            {
                type: 'select',
                name: 'option',
                message: 'Gestión de alimentos:',
                choices: [
                    {
                        name: 'Registrar alimento',
                        value: 'create'
                    },
                    {
                        name: 'Consultar alimento',
                        value: 'findById'
                    },
                    {
                        name: 'Listar alimentos',
                        value: 'findAll'
                    },
                    {
                        name: 'Actualizar alimento',
                        value: 'update'
                    },
                    {
                        name: 'Desactivar alimento',
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