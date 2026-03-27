import inquirer from 'inquirer';
import { listProviders } from '../config/providers.js';
import { saveLocalConfig } from '../config/store.js';
import type { AppConfig, ProviderName } from '../config/types.js';

export async function runSetupWizard(): Promise<AppConfig> {
  const providers = listProviders();

  console.log('\nWelcome to Sushant CLI. Let\'s get your AI provider configured.\n');

  const { provider } = await inquirer.prompt<{ provider: ProviderName }>([
    {
      type: 'list',
      name: 'provider',
      message: 'Choose your provider:',
      choices: providers.map((item) => ({
        name: `${item.displayName} (${item.envVar})`,
        value: item.name,
        description: item.helpText,
      })),
    },
  ]);

  const selected = providers.find((item) => item.name === provider);
  if (!selected) {
    throw new Error('Invalid provider selected');
  }

  const { apiKey, customModel, model } = await inquirer.prompt<{
    apiKey: string;
    customModel: boolean;
    model: string;
  }>([
    {
      type: 'password',
      name: 'apiKey',
      message: `${selected.displayName} API key:`,
      mask: '*',
      validate: (value: string) =>
        value.trim().length > 0 ? true : 'API key is required to continue.',
    },
    {
      type: 'confirm',
      name: 'customModel',
      message: `Use default model (${selected.defaultModel})?`,
      default: true,
      filter: (value: boolean) => !value,
    },
    {
      type: 'input',
      name: 'model',
      message: 'Enter a default model name:',
      when: (answers) => answers.customModel,
      validate: (value: string) => (value.trim().length > 0 ? true : 'Model cannot be empty.'),
    },
  ]);

  const config: AppConfig = {
    provider,
    providerConfig: {
      apiKey: apiKey.trim(),
      model: customModel ? model.trim() : selected.defaultModel,
    },
  };

  await saveLocalConfig(config);
  console.log('\nSaved local config. You\'re ready to go.\n');
  return config;
}
