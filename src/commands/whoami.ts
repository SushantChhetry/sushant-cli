import { resolveConfig } from '../config/resolve.js';
import { PROVIDER_METADATA } from '../config/providers.js';
import { runSetupWizard } from '../interactive/setupWizard.js';
import { redactSecret } from '../utils/redact.js';

export async function whoamiCommand(): Promise<void> {
  const resolved = await resolveConfig({ allowPrompt: false, runSetupWizard });

  if (!resolved) {
    console.log('Not logged in. Run `sushant login` to set up your credentials.');
    return;
  }

  const metadata = PROVIDER_METADATA[resolved.config.provider];
  console.log(`Provider: ${metadata.displayName}`);
  console.log(`Model: ${resolved.config.providerConfig.model ?? metadata.defaultModel}`);
  console.log(`API Key: ${redactSecret(resolved.config.providerConfig.apiKey)}`);
  console.log(`Source: ${resolved.source}`);
}
