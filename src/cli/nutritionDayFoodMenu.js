import inquirer from 'inquirer';

import {
    createNutritionDayFood,
    findNutritionDayFoodById,
    findNutritionDayFoods,
    findAllNutritionDayFoods,
    updateNutritionDayFood,
    deleteNutritionDayFood
} from '../commands/nutritionDayFoodCommands.js';

async function getData({ isUpdate = false } = {}) {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'nutritionDayId',
            message: 'ID del día nutricional:',
            when: () => !isUpdate,
            filter: value => Number(value)
        },
        {
            type: 'input',
            name: 'foodId',
            message: 'ID del alimento:',
            filter: value => Number(value)
        },
        {
            type: 'select',
            name: 'mealType',
            message: 'Tipo de comida:',
            choices: [
                {
                    name: 'Desayuno',
                    value: 'BREAKFAST'
                },
                {
                    name: 'Snack',
                    value: 'SNACK'
                },
                {
                    name: 'Almuerzo',
                    value: 'LUNCH'
                },
                {
                    name: 'Cena',
                    value: 'DINNER'
                }
            ]
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'Cantidad:',
            filter: value => Number(value)
        },
        {
            type: 'input',
            name: 'estimatedCalories',
            message: 'Calorías estimadas (opcional):',
            filter: value => value ? Number(value) : null
        },
        {
            type: 'input',
            name: 'notes',
            message: 'Notas:'
        }
    ]);
}

async function create() {
    const data = await getData();

    const relation =
        await createNutritionDayFood(data);

    console.log('\nAlimento agregado correctamente.');
    console.table([relation]);
}

async function findById() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID de la relación:',
            filter: value => Number(value)
        }
    ]);

    const relation =
        await findNutritionDayFoodById(id);

    if (!relation) {
        console.log('\nRelación no encontrada.');
        return;
    }

    console.table([relation]);
}

async function findByDay() {
    const { nutritionDayId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'nutritionDayId',
            message: 'ID del día nutricional:'
        }
    ]);

    const relations =
        await findNutritionDayFoods(nutritionDayId);

    if (!relations.length) {
        console.log('\nNo existen alimentos para ese día.');
        return;
    }

    console.table(relations);
}

async function findAll() {
    const relations =
        await findAllNutritionDayFoods();

    if (!relations.length) {
        console.log('\nNo existen relaciones registradas.');
        return;
    }

    console.table(relations);
}

async function update() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID de la relación:',
            filter: value => Number(value)
        }
    ]);

    const existing =
        await findNutritionDayFoodById(id);

    if (!existing) {
        console.log('\nRelación no encontrada.');
        return;
    }

    const data = await getData({ isUpdate: true });

    const relation =
        await updateNutritionDayFood(id, data);

    console.log('\nRelación actualizada correctamente.');
    console.table([relation]);
}

async function remove() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID de la relación:',
            filter: value => Number(value)
        }
    ]);

    const existing =
        await findNutritionDayFoodById(id);

    if (!existing) {
        console.log('\nRelación no encontrada.');
        return;
    }

    const { confirm } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: '¿Desea eliminar esta relación?',
            default: false
        }
    ]);

    if (!confirm) {
        console.log('\nOperación cancelada.');
        return;
    }

    await deleteNutritionDayFood(id);

    console.log('\nRelación eliminada correctamente.');
}

export async function showNutritionDayFoodMenu() {
    let running = true;

    while (running) {
        const { option } = await inquirer.prompt([
            {
                type: 'select',
                name: 'option',
                message: 'Alimentos del día:',
                choices: [
                    {
                        name: 'Agregar alimento',
                        value: 'create'
                    },
                    {
                        name: 'Consultar por ID',
                        value: 'findById'
                    },
                    {
                        name: 'Consultar alimentos de un día',
                        value: 'findByDay'
                    },
                    {
                        name: 'Listar relaciones',
                        value: 'findAll'
                    },
                    {
                        name: 'Actualizar relación',
                        value: 'update'
                    },
                    {
                        name: 'Eliminar relación',
                        value: 'delete'
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

                case 'findByDay':
                    await findByDay();
                    break;

                case 'findAll':
                    await findAll();
                    break;

                case 'update':
                    await update();
                    break;

                case 'delete':
                    await remove();
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