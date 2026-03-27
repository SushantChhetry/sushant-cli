import { resolveConfig } from '../config/resolve.js';
import { runSetupWizard } from '../interactive/setupWizard.js';
const STRATEGIES = {
    wwsd: 'Frame the highest-leverage decision, compare options, and pick the fastest learning path.',
    breakdown: 'Split the problem into goals, constraints, assumptions, and next experiments with clear owners.',
    redflag: 'Surface failure modes, second-order effects, and assumptions most likely to break in production.',
    visualize: 'Describe the system shape, user flow, and architecture boundaries so teams can align quickly.',
};
export async function runAiCommand(command, input) {
    const resolved = await resolveConfig({ allowPrompt: true, runSetupWizard });
    if (!resolved) {
        console.log('Missing provider configuration. Run `sushant login` first.');
        return;
    }
    const strategy = STRATEGIES[command];
    const cleanedInput = input.trim();
    console.log(`\n${formatTitle(command)}\n`);
    console.log(`Input: ${cleanedInput}`);
    console.log(`Approach: ${strategy}`);
    console.log(`Provider: ${resolved.config.provider}`);
    console.log(`Model: ${resolved.config.providerConfig.model ?? 'default'}`);
    console.log('\n(Provider-backed completion will be wired in a follow-up phase.)');
}
function formatTitle(command) {
    return command === 'wwsd' ? 'WWSD' : command[0].toUpperCase() + command.slice(1);
}
