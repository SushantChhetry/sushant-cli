import { Command } from 'commander';

const program = new Command();

program
  .name('sushant')
  .description('Programmable product judgment in your terminal')
  .version('0.1.0');

program
  .command('wwsd')
  .argument('<input>')
  .action((input) => {
    console.log(`WWSD: ${input}`);
  });

program
  .command('art')
  .action(() => {
    console.log('Random ASCII art coming soon');
  });

program.parse();

if (!process.argv.slice(2).length) {
  console.log('Run sushant --help');
}
