export const PROVIDERS = ['openai', 'anthropic'] as const;

export type ProviderName = (typeof PROVIDERS)[number];

export interface ProviderConfig {
  apiKey: string;
  model?: string;
}

export interface AppConfig {
  provider: ProviderName;
  providerConfig: ProviderConfig;
}

export interface ResolvedConfig {
  config: AppConfig;
  source: 'local' | 'env' | 'wizard';
}
