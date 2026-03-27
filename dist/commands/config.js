import { PROVIDERS } from '../config/types.js';
import { PROVIDER_METADATA } from '../config/providers.js';
import { loadLocalConfig, saveLocalConfig } from '../config/store.js';
import { resolveConfig } from '../config/resolve.js';
import { runSetupWizard } from '../interactive/setupWizard.js';
import { redactSecret } from '../utils/redact.js';
export async function showConfigCommand() {
    const resolved = await resolveConfig({ allowPrompt: false, runSetupWizard });
    if (!resolved) {
        console.log('No configuration found. Run `sushant login` to create one.');
        return;
    }
    const providerMeta = PROVIDER_METADATA[resolved.config.provider];
    const safeView = {
        provider: resolved.config.provider,
        providerDisplayName: providerMeta.displayName,
        model: resolved.config.providerConfig.model ?? providerMeta.defaultModel,
        apiKey: redactSecret(resolved.config.providerConfig.apiKey),
        source: resolved.source,
    };
    console.log(JSON.stringify(safeView, null, 2));
}
export async function setConfigValueCommand(field, value) {
    const config = await loadLocalConfig();
    if (!config) {
        console.log('No local config to edit. Run `sushant login` first.');
        return;
    }
    if (field === 'provider') {
        if (!PROVIDERS.includes(value)) {
            const validOptions = PROVIDERS.join(', ');
            console.log(`Unsupported provider "${value}". Choose one of: ${validOptions}`);
            return;
        }
        config.provider = value;
        console.log(`Provider set to ${value}.`);
    }
    if (field === 'model') {
        config.providerConfig.model = value;
        console.log(`Model set to ${value}.`);
    }
    await saveLocalConfig(config);
}
