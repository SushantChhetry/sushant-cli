#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

if ! command -v rpmbuild >/dev/null 2>&1; then
  echo "rpmbuild not found. Install rpm-build first." >&2
  exit 1
fi

VERSION="$(node -p "require('./package.json').version")"
NAME="$(node -p "require('./package.json').name")"

npm pack >/dev/null
TARBALL="${NAME}-${VERSION}.tgz"

RPM_TOPDIR="${ROOT_DIR}/.rpmbuild"
mkdir -p "$RPM_TOPDIR"/{BUILD,BUILDROOT,RPMS,SOURCES,SPECS,SRPMS}

cp "$TARBALL" "$RPM_TOPDIR/SOURCES/"
cp packaging/rpm/sushant-cli.spec "$RPM_TOPDIR/SPECS/"
sed -i "s/^Version:.*/Version:        ${VERSION}/" "$RPM_TOPDIR/SPECS/sushant-cli.spec"

rpmbuild -ba "$RPM_TOPDIR/SPECS/sushant-cli.spec" --define "_topdir $RPM_TOPDIR"

echo "RPMs available in $RPM_TOPDIR/RPMS"
