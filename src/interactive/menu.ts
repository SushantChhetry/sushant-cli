import inquirer from 'inquirer';
import { runAiCommand, type AiCommandName } from '../commands/ai.js';
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
] as const;

type MenuCommand = (typeof MENU_CHOICES)[number]['value'];

const AI_COMMANDS: readonly AiCommandName[] = ['wwsd', 'breakdown', 'redflag', 'visualize'];

export async function runInteractiveMenu(): Promise<void> {
  let keepRunning = true;

  while (keepRunning) {
    const { command } = await inquirer.prompt<{ command: MenuCommand }>([
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

    if (AI_COMMANDS.includes(command as AiCommandName)) {
      const { input } = await inquirer.prompt<{ input: string }>([
        {
          type: 'input',
          name: 'input',
          message: `Enter your prompt for ${command}:`,
          validate: (value: string) =>
            value.trim().length > 0 ? true : 'Please enter some input to continue.',
        },
      ]);

      await runAiCommand(command as AiCommandName, input);
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
