import { Command } from 'commander';
import { loginCommand } from './commands/login.js';
import { logoutCommand } from './commands/logout.js';
import { whoamiCommand } from './commands/whoami.js';
import { setConfigValueCommand, showConfigCommand } from './commands/config.js';
import { resolveConfig } from './config/resolve.js';
import { runSetupWizard } from './interactive/setupWizard.js';
import { runInteractiveMenu } from './interactive/menu.js';

const program = new Command();

program
  .name('sushant')
  .description('Programmable product judgment in your terminal')
  .version('0.1.0');

async function ensureAuth(): Promise<void> {
  await resolveConfig({ runSetupWizard, allowPrompt: true });
}

function aiPlaceholder(commandName: string, input: string): void {
  console.log(`${commandName}: ${input}`);
  console.log('AI responses will use your configured provider and model in a follow-up phase.');
}

program
  .command('wwsd')
  .description('What would Sushant do?')
  .argument('<input>')
  .action(async (input) => {
    await ensureAuth();
    aiPlaceholder('WWSD', input);
  });

program
  .command('breakdown')
  .description('Break down a messy problem into structure')
  .argument('<input>')
  .action(async (input) => {
    await ensureAuth();
    aiPlaceholder('Breakdown', input);
  });

program
  .command('redflag')
  .description('Find risks and failure modes')
  .argument('<input>')
  .action(async (input) => {
    await ensureAuth();
    aiPlaceholder('Redflag', input);
  });

program
  .command('visualize')
  .description('Visualize a product/system concept')
  .argument('<input>')
  .action(async (input) => {
    await ensureAuth();
    aiPlaceholder('Visualize', input);
  });

program.command('art').action(() => console.log('Random ASCII art coming soon'));
program.command('joke').action(() => console.log('Random joke coming soon'));
program.command('flirt').action(() => console.log('Random flirt line coming soon'));

program.command('login').description('Run setup wizard and save local credentials').action(loginCommand);
program.command('logout').description('Remove local credentials/config').action(logoutCommand);
program.command('whoami').description('Show provider/model and redacted auth status').action(whoamiCommand);

const configCommand = program.command('config').description('Inspect or edit local Sushant config');
configCommand.action(showConfigCommand);

configCommand
  .command('set')
  .description('Set a local config value')
  .argument('<field>', 'provider|model')
  .argument('<value>')
  .action(async (field, value) => {
    if (field !== 'provider' && field !== 'model') {
      console.log('Supported fields: provider, model');
      return;
    }

    await setConfigValueCommand(field, value);
  });

await program.parseAsync();

if (!process.argv.slice(2).length) {
  await ensureAuth();
  await runInteractiveMenu();
}
