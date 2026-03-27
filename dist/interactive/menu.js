import inquirer from 'inquirer';
import { runAiCommand } from '../commands/ai.js';
import { artCommand, flirtCommand, jokeCommand } from '../commands/fun.js';
const MENU_CHOICES = [
    { name: 'WWSD', value: 'wwsd' },
    { name: 'Breakdown', value: 'breakdown' },
    { name: 'Redflag', value: 'redflag' },
    { name: 'Visualize', value: 'visualize' },
    { name: 'Art', value: 'art' },
    { name: 'Joke', value: 'joke' },
    { name: 'Flirt', value: 'flirt' },
    { name: 'Exit', value: 'exit' },
];
const AI_COMMANDS = ['wwsd', 'breakdown', 'redflag', 'visualize'];
export async function runInteractiveMenu() {
    let keepRunning = true;
    while (keepRunning) {
        const { command } = await inquirer.prompt([
            {
                type: 'list',
                name: 'command',
                message: 'What do you want to run?',
                choices: MENU_CHOICES,
            },
        ]);
        if (command === 'exit') {
            console.log('Goodbye.');
            keepRunning = false;
            continue;
        }
        if (AI_COMMANDS.includes(command)) {
            const { input } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'input',
                    message: `Enter your prompt for ${command}:`,
                    validate: (value) => value.trim().length > 0 ? true : 'Please enter some input to continue.',
                },
            ]);
            await runAiCommand(command, input);
            continue;
        }
        if (command === 'art') {
            artCommand();
            continue;
        }
        if (command === 'joke') {
            jokeCommand();
            continue;
        }
        flirtCommand();
    }
}
