import { runSetupWizard } from '../interactive/setupWizard.js';
export async function loginCommand() {
    await runSetupWizard();
}
