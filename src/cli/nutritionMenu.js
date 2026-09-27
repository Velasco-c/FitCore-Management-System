import inquirer from 'inquirer';

import { showNutritionPlanMenu } from './nutritionPlanMenu.js';
import { showNutritionDayMenu } from './nutritionDayMenu.js';
import { showNutritionDayFoodMenu } from './nutritionDayFoodMenu.js';

export async function showNutritionMenu() {
    let running = true;

    while (running) {
        const { option } = await inquirer.prompt([
            {
                type: 'select',
                name: 'option',
                message: 'Gestión de nutrición:',
                choices: [
                    {
                        name: 'Planes nutricionales',
                        value: 'plans'
                    },
                    {
                        name: 'Días nutricionales',
                        value: 'days'
                    },
                    {
                        name: 'Alimentos del día',
                        value: 'foods'
                    },
                    {
                        name: 'Volver',
                        value: 'back'
                    }
                ]
            }
        ]);

        switch (option) {
            case 'plans':
                await showNutritionPlanMenu();
                break;

            case 'days':
                await showNutritionDayMenu();
                break;

            case 'foods':
                await showNutritionDayFoodMenu();
                break;

            case 'back':
                running = false;
                break;
        }
    }
}