#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const repoRoot = resolve(new URL('../../', import.meta.url).pathname);
const packageJsonPath = resolve(repoRoot, 'package.json');
const outputPath = resolve(repoRoot, 'packaging/homebrew/sushant-cli.rb');

const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
const { name, version, description } = packageJson;
const tarballName = `${name}-${version}.tgz`;
const tarballPath = resolve(repoRoot, tarballName);
const tarball = await readFile(tarballPath);
const sha256 = createHash('sha256').update(tarball).digest('hex');

const formula = `class SushantCli < Formula
  desc ${JSON.stringify(description)}
  homepage "https://github.com/sushant/sushant-cli"
  url "https://registry.npmjs.org/${name}/-/${tarballName}"
  sha256 "${sha256}"
  license "MIT"

  depends_on "node"

  def install
    system "npm", "install", *std_npm_args
  end

  test do
    output = shell_output("#{bin}/sushant whoami 2>&1", 1)
    assert_match "Not configured", output
  end
end
`;

await mkdir(resolve(repoRoot, 'packaging/homebrew'), { recursive: true });
await writeFile(outputPath, formula);
console.log(`Wrote ${outputPath}`);
