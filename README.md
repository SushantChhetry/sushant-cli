# Sushant CLI

**Product judgment, encoded.**

A terminal-first CLI for product thinking, decision-making, and system design.

## Install

### One-liner (like Claude’s curl installer)

Requires [Node.js](https://nodejs.org) (npm on your `PATH`). Then:

```bash
curl -fsSL https://raw.githubusercontent.com/SushantChhetry/sushant-cli/main/scripts/install.sh | bash
```

Override the repo with `SUSHANT_CLI_REPO=YourOrg/your-fork` if you fork.

Claude Code’s default flow is a native script plus Homebrew; this is the closest parallel for a Node-based CLI—one command, no clone.

### npm (after you publish to the registry)

```bash
npm install -g sushant-cli
```

### npm from GitHub

```bash
npm install -g github:SushantChhetry/sushant-cli
```

The repo ships a prebuilt `dist/`, so this install does not run a TypeScript compile on your machine.

### Homebrew (maintainer/distributor flow)

Sushant now includes a Homebrew formula generator for taps:

```bash
npm run release:brew-formula
```

This writes `packaging/homebrew/sushant-cli.rb`, which can be committed to your tap repo and installed with `brew install <tap>/sushant-cli`.

### RPM (maintainer/distributor flow)

Sushant now includes RPM packaging files and a build helper:

```bash
npm run release:rpm
```

Requirements: `rpmbuild` + `nodejs`.

## First-run setup (new default)

Sushant CLI now uses a frictionless local setup flow:

1. Install globally.
2. Run `sushant`.
3. If no valid local config is found, Sushant launches a setup wizard.
4. Choose a provider, enter your API key securely, and optionally set a model.
5. Config is saved locally and reused on future runs.

```bash
sushant
```

## Supported providers

- OpenAI (`OPENAI_API_KEY`)
- Anthropic (`ANTHROPIC_API_KEY`)

The configuration model is provider-agnostic so additional providers can be added without changing the main auth shape.

## Authentication and config commands

- `sushant login` → run setup wizard explicitly
- `sushant logout` → remove local config
- `sushant whoami` → show current provider/model with redacted key
- `sushant config` → show safe redacted config
- `sushant config set provider <openai|anthropic>`
- `sushant config set model <model-name>`

## Credential resolution order

For AI-backed commands (`wwsd`, `breakdown`, `redflag`, `visualize`) and no-args interactive mode:

1. Local config file
2. Environment variables
3. Interactive setup wizard

If local config is malformed, the CLI guides you into repair through the same setup wizard.

## Local config storage

Config is stored in a user-level directory:

- macOS/Linux (XDG aware): `$XDG_CONFIG_HOME/sushant/config.json` or `~/.config/sushant/config.json`
- Windows: `%APPDATA%\\sushant\\config.json`

Example structure:

```json
{
  "provider": "openai",
  "providerConfig": {
    "apiKey": "SECRET",
    "model": "gpt-5-mini"
  }
}
```

## Environment variables (advanced / fallback)

Environment variables are still supported when no local config exists:

- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- Optional model overrides:
  - `OPENAI_MODEL`
  - `ANTHROPIC_MODEL`
  - `SUSHANT_MODEL` (generic fallback)

## Quick command examples

```bash
sushant
sushant login
sushant whoami
sushant wwsd "Should we automate tax intake via SMS?"
sushant redflag "AI agent that auto-submits claims"
sushant config
```

## Local development

```bash
npm install
npm run dev
npm run build
```

## Docs

- [Architecture](./docs/architecture.md)
- [Configuration](./docs/configuration.md)
- [Publishing](./docs/publishing.md)

## License

MIT
