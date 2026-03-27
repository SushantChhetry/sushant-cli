import { runSetupWizard } from '../interactive/setupWizard.js';

export async function loginCommand(): Promise<void> {
  await runSetupWizard();
}
