# Configuration & Authentication

## Goals

- First-run setup with no `.env` requirement.
- Provider-agnostic credential model.
- Safe local storage and redacted display.

## Provider model

The CLI stores a single active provider with provider-specific credentials:

```ts
interface AppConfig {
  provider: 'openai' | 'anthropic';
  providerConfig: {
    apiKey: string;
    model?: string;
  };
}
```

This shape is intentionally extensible for future providers and future auth methods (OAuth/session tokens).

## Where config is stored

- macOS/Linux: `$XDG_CONFIG_HOME/sushant/config.json` or `~/.config/sushant/config.json`
- Windows: `%APPDATA%\\sushant\\config.json`

## Resolution order

When an AI-backed operation needs credentials:

1. **Local config** (preferred)
2. **Environment variables** (`OPENAI_API_KEY` / `ANTHROPIC_API_KEY`)
3. **Interactive setup wizard**

If local config is present but invalid, the wizard runs in repair mode.

## Commands

- `sushant login`: run setup wizard and persist config
- `sushant logout`: delete local config file
- `sushant whoami`: display active provider, model, redacted key, and source
- `sushant config`: print redacted resolved config
- `sushant config set provider <value>`
- `sushant config set model <value>`

## Secret safety

- API keys are collected via masked input.
- Output never prints full keys.
- Config display uses redacted form such as `sk-****abcd`.
- Writes are done directly to the config path and secrets are never logged.
