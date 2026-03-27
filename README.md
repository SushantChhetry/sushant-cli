# Sushant CLI

**Product judgment, encoded.**

A terminal-first CLI for product thinking, decision-making, and system design.

It combines serious commands like `wwsd`, `redflag`, `breakdown`, and `visualize` with randomized personality commands like `art`, `joke`, and `flirt`.

## Why this exists

Most AI CLIs focus on code generation or generic chat. Sushant CLI is different.

It is built to feel like a programmable version of senior product judgment in the terminal:

- **WWSD**: what would Sushant do
- **Breakdown**: turn a messy problem into a structured approach
- **Redflag**: surface risk, irreversibility, and failure modes
- **Visualize**: explain product or system ideas with terminal-friendly diagrams
- **Art / Joke / Flirt**: randomized personality moments with zero input required

## Install

```bash
npm install -g sushant-cli
```

## Quick start

```bash
sushant
sushant wwsd "Should we automate tax intake via SMS?"
sushant redflag "AI agent that auto-submits claims"
sushant breakdown "Users are dropping off in onboarding"
sushant visualize "high-risk AI workflow"
sushant art
sushant joke
sushant flirt
```

## Commands

### Core commands

- `sushant wwsd "<problem>"`
- `sushant breakdown "<problem>"`
- `sushant redflag "<idea>"`
- `sushant visualize "<system or concept>"`

### Randomized commands

- `sushant art`
- `sushant joke`
- `sushant flirt`

### Interactive mode

Run without arguments to launch the terminal menu:

```bash
sushant
```

## Environment

Create a `.env` file from `.env.example`.

```bash
cp .env.example .env
```

Then add your API key:

```bash
OPENAI_API_KEY=your_key_here
```

## Local development

```bash
npm install
npm run dev
npm run build
```

## Project structure

```text
sushant-cli/
├── bin/
│   └── sushant.js
├── docs/
│   ├── architecture.md
│   └── publishing.md
├── src/
│   ├── ai/
│   ├── commands/
│   ├── config/
│   ├── content/
│   ├── interactive/
│   ├── utils/
│   └── index.ts
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Design principles

- **Terminal-native**: simple install, direct command execution, interactive mode
- **Opinionated**: not a generic AI shell
- **Shareable**: outputs should be screenshot-worthy
- **Useful first**: serious commands anchor the product
- **Personality second**: art, jokes, and flirt add memorability without diluting the core

## Docs

- [Architecture](./docs/architecture.md)
- [Publishing](./docs/publishing.md)
- [Build guide](./docs/build-guide.mdx)

## Roadmap

- Better interactive mode with command history
- Streaming output for long analyses
- Model provider abstraction
- More curated art, jokes, and flirt lines
- Configurable output themes
- Optional `--json` mode for automation

## License

MIT
