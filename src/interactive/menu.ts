import inquirer from 'inquirer';

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

export async function runInteractiveMenu(): Promise<void> {
  const { command } = await inquirer.prompt<{ command: (typeof MENU_CHOICES)[number]['value'] }>([
    {
      type: 'list',
      name: 'command',
      message: 'What do you want to run?',
      choices: MENU_CHOICES,
    },
  ]);

  if (command === 'exit') {
    console.log('Goodbye.');
    return;
  }

  console.log(`Selected: ${command}. Full interactive workflows are coming soon.`);
}
