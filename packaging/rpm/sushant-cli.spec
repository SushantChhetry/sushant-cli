Name:           sushant-cli
Version:        0.1.0
Release:        1%{?dist}
Summary:        Programmable product judgment in your terminal
License:        MIT
URL:            https://github.com/sushant/sushant-cli
Source0:        %{name}-%{version}.tgz
BuildArch:      noarch
BuildRequires:  nodejs >= 18
Requires:       nodejs >= 18

%description
Sushant CLI is a terminal-first CLI for product thinking, decision-making, and system design.

%prep
rm -rf package
%setup -q -n package

%build
# No compile step needed; published JS ships pre-transpiled.

%install
rm -rf %{buildroot}
mkdir -p %{buildroot}%{_libdir}/%{name}
cp -a * %{buildroot}%{_libdir}/%{name}/

mkdir -p %{buildroot}%{_bindir}
cat > %{buildroot}%{_bindir}/sushant <<'SH'
#!/usr/bin/env bash
exec node /usr/lib/sushant-cli/bin/sushant.js "$@"
SH
chmod 0755 %{buildroot}%{_bindir}/sushant

%files
%license LICENSE*
%doc README.md
%{_bindir}/sushant
%{_libdir}/%{name}

%changelog
* Fri Mar 27 2026 Sushant CLI Maintainers <maintainers@sushant.dev> - 0.1.0-1
- Initial RPM packaging.
