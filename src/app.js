import { showMainMenu } from './cli/menu.js';
import { showClientMenu } from './cli/clientMenu.js';
import { showTrainingPlanMenu } from './cli/trainingPlanMenu.js';
import { showClientPlanMenu } from './cli/clientPlanMenu.js';
import { showContractMenu } from './cli/contractMenu.js';
import { showProgressMenu } from './cli/progressMenu.js';
import { showNutritionMenu } from './cli/nutritionMenu.js';
import { showFoodMenu } from './cli/foodMenu.js';
import { showFinancialMenu } from './cli/financialMenu.js';
import { showBackupMenu } from './cli/backupMenu.js';

async function main() {
    let running = true;

    while (running) {
        const option = await showMainMenu();

        try {
            switch (option) {
                case 'clients':
                    await showClientMenu();
                    break;

                case 'trainingPlans':
                    await showTrainingPlanMenu();
                    break;

                case 'clientPlans':
                    await showClientPlanMenu();
                    break;

                case 'contracts':
                    await showContractMenu();
                    break;

                case 'progress':
                    await showProgressMenu();
                    break;

                case 'nutrition':
                    await showNutritionMenu();
                    break;

                case 'foods':
                    await showFoodMenu();
                    break;

                case 'financial':
                    await showFinancialMenu();
                    break;

                case 'backups':
                    await showBackupMenu();
                    break;

                case 'exit':
                    running = false;
                    console.log('\nHasta luego.\n');
                    break;
            }
        } catch (error) {
            console.error(`\nError: ${error.message}`);
        }
    }
}

main().catch((error) => {
    console.error('\nError inesperado:', error);
    process.exit(1);
});