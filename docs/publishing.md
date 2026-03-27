# Publishing

## Build

```bash
npm run build
```

## Test locally

```bash
npm link
sushant
```

## Publish to npm

```bash
npm login
npm publish
```

## Install globally

```bash
npm install -g sushant-cli
```

## Versioning

```bash
npm version patch
npm publish
```

## Homebrew packaging (for tap maintainers)

Generate an updated formula from the npm tarball:

```bash
npm run release:brew-formula
```

Output:

- `packaging/homebrew/sushant-cli.rb`

Use this formula in your Homebrew tap repository.

## RPM packaging

Build an RPM from the npm package tarball:

```bash
npm run release:rpm
```

Outputs:

- `.rpmbuild/RPMS/.../*.rpm`
- `.rpmbuild/SRPMS/.../*.src.rpm`

Requirements:

- `rpmbuild`
- Node.js 18+

## Test GitHub install flow

Before publishing to npm, validate the git-based install path:

```bash
npm install -g github:SushantChhetry/sushant-cli
sushant --help
```

This depends on the `prepare` script to build `dist/` during git installs.
