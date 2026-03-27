import { Command } from 'commander';
import { loginCommand } from './commands/login.js';
import { logoutCommand } from './commands/logout.js';
import { whoamiCommand } from './commands/whoami.js';
import { setConfigValueCommand, showConfigCommand } from './commands/config.js';
import { runInteractiveMenu } from './interactive/menu.js';
import { runAiCommand } from './commands/ai.js';
import { artCommand, jokeCommand, flirtCommand } from './commands/fun.js';
const program = new Command();
program
    .name('sushant')
    .description('Programmable product judgment in your terminal')
    .version('0.1.0');
program
    .command('wwsd')
    .description('What would Sushant do?')
    .argument('<input>')
    .action(async (input) => {
    await runAiCommand('wwsd', input);
});
program
    .command('breakdown')
    .description('Break down a messy problem into structure')
    .argument('<input>')
    .action(async (input) => {
    await runAiCommand('breakdown', input);
});
program
    .command('redflag')
    .description('Find risks and failure modes')
    .argument('<input>')
    .action(async (input) => {
    await runAiCommand('redflag', input);
});
program
    .command('visualize')
    .description('Visualize a product/system concept')
    .argument('<input>')
    .action(async (input) => {
    await runAiCommand('visualize', input);
});
program.command('art').description('Print random ASCII art').action(artCommand);
program.command('joke').description('Tell a random product joke').action(jokeCommand);
program.command('flirt').description('Generate a playful line').action(flirtCommand);
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
    await runInteractiveMenu();
}
