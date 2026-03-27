# Architecture

Sushant CLI is organized into modular layers so auth/config and command UX can grow independently.

## 1. Command Layer (`src/index.ts`, `src/commands/*`)

Commander routes input into:

- AI-backed commands (`wwsd`, `breakdown`, `redflag`, `visualize`)
- Utility commands (`art`, `joke`, `flirt`)
- Auth/config commands (`login`, `logout`, `whoami`, `config`)

## 2. Configuration Layer (`src/config/*`)

- `types.ts`: provider-agnostic typed config contracts
- `providers.ts`: metadata per provider (display name, env var, default model)
- `store.ts`: cross-platform local storage read/write/remove + shape validation
- `resolve.ts`: credential resolution orchestration

Resolution priority:

1. Local config file
2. Environment variables
3. Interactive setup wizard

## 3. Interactive Layer (`src/interactive/*`)

- `setupWizard.ts`: first-run and repair-mode setup flow
- `menu.ts`: no-arg interactive mode entrypoint

No-arg behavior:

- if config exists/resolves, open interactive menu
- if config missing/invalid, run setup wizard first, then continue

## 4. Safety & Output Layer (`src/utils/*`)

- `redact.ts`: secret masking for safe terminal output

## Extensibility direction

The auth model avoids provider-specific assumptions so future additions (e.g., OpenRouter, OAuth, “Sign in with Sushant”) can be added without breaking config consumers.
