export const PROVIDER_METADATA = {
    openai: {
        name: 'openai',
        displayName: 'OpenAI',
        envVar: 'OPENAI_API_KEY',
        defaultModel: 'gpt-5-mini',
        helpText: 'Best for broad-purpose reasoning and generation.',
    },
    anthropic: {
        name: 'anthropic',
        displayName: 'Anthropic',
        envVar: 'ANTHROPIC_API_KEY',
        defaultModel: 'claude-3-7-sonnet-latest',
        helpText: 'Strong for long-form analysis and careful instruction following.',
    },
};
export function listProviders() {
    return Object.values(PROVIDER_METADATA);
}
