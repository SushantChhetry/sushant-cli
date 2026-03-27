# Architecture

Sushant CLI is designed around two layers:

## 1. Command Layer

Handles CLI inputs via Commander and routes to:

- wwsd
- breakdown
- redflag
- visualize
- art
- joke
- flirt

## 2. Execution Layer

### AI-driven commands

Use an LLM client to:
- generate structured outputs
- enforce tone and style

### Randomized commands

Use curated content pools for:
- jokes
- flirts
- ascii art

## 3. Interactive Layer

Uses Inquirer to simulate a menu-driven CLI.

## 4. Output Layer

Uses chalk and formatting utilities to:
- create consistent terminal outputs
- maintain a recognizable style

## Philosophy

This CLI is not meant to be a general-purpose assistant.

It is intentionally opinionated and encodes a specific style of thinking.
