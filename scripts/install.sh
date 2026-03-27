#!/usr/bin/env sh
# One-liner (macOS/Linux): curl -fsSL https://raw.githubusercontent.com/SushantChhetry/sushant-cli/main/scripts/install.sh | bash
set -eu

REPO="${SUSHANT_CLI_REPO:-SushantChhetry/sushant-cli}"

if ! command -v npm >/dev/null 2>&1; then
  printf '%s\n' "sushant-cli: npm not found. Install Node.js (https://nodejs.org) or a version manager (fnm, nvm)." >&2
  exit 1
fi

printf '%s\n' "Installing sushant-cli from github:${REPO} ..."
npm install -g "github:${REPO}"
printf '%s\n' "Done. Try: sushant --help"
