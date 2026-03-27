import { PROVIDER_METADATA } from './providers.js';
import { readLocalConfigState } from './store.js';
import type { AppConfig, ProviderName, ResolvedConfig } from './types.js';

export interface ResolveOptions {
  runSetupWizard: () => Promise<AppConfig>;
  allowPrompt?: boolean;
}

function resolveFromEnv(): AppConfig | null {
  for (const provider of Object.keys(PROVIDER_METADATA) as ProviderName[]) {
    const metadata = PROVIDER_METADATA[provider];
    const apiKey = process.env[metadata.envVar];
    if (!apiKey || apiKey.trim().length === 0) {
      continue;
    }

    const modelFromScopedVar = process.env[`${provider.toUpperCase()}_MODEL`];
    const modelFromGenericVar = process.env.SUSHANT_MODEL;

    return {
      provider,
      providerConfig: {
        apiKey,
        model: modelFromScopedVar || modelFromGenericVar || metadata.defaultModel,
      },
    };
  }

  return null;
}

export async function resolveConfig(options: ResolveOptions): Promise<ResolvedConfig | null> {
  const { allowPrompt = true, runSetupWizard } = options;

  const localState = await readLocalConfigState();
  if (localState.status === 'valid' && localState.config) {
    return { config: localState.config, source: 'local' };
  }

  const envConfig = resolveFromEnv();
  if (envConfig) {
    return { config: envConfig, source: 'env' };
  }

  if (!allowPrompt) {
    return null;
  }

  if (localState.status === 'invalid') {
    console.log('Your local Sushant config is incomplete or malformed. Let\'s repair it.');
  }

  const wizardConfig = await runSetupWizard();
  return { config: wizardConfig, source: 'wizard' };
}
