import { access, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { PROVIDERS, type AppConfig } from './types.js';

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function isValidAppConfig(value: unknown): value is AppConfig {
  if (!isObject(value)) {
    return false;
  }

  const provider = value.provider;
  const providerConfig = value.providerConfig;

  if (typeof provider !== 'string' || !PROVIDERS.includes(provider as AppConfig['provider'])) {
    return false;
  }

  if (!isObject(providerConfig) || typeof providerConfig.apiKey !== 'string') {
    return false;
  }

  if (providerConfig.model !== undefined && typeof providerConfig.model !== 'string') {
    return false;
  }

  return providerConfig.apiKey.trim().length > 0;
}

function getConfigDir(): string {
  if (process.platform === 'win32') {
    const appData = process.env.APPDATA ?? path.join(os.homedir(), 'AppData', 'Roaming');
    return path.join(appData, 'sushant');
  }

  const xdgConfigHome = process.env.XDG_CONFIG_HOME;
  if (xdgConfigHome) {
    return path.join(xdgConfigHome, 'sushant');
  }

  return path.join(os.homedir(), '.config', 'sushant');
}

export function getConfigPath(): string {
  return path.join(getConfigDir(), 'config.json');
}

export interface LocalConfigReadResult {
  status: 'missing' | 'valid' | 'invalid';
  config: AppConfig | null;
}

export async function readLocalConfigState(): Promise<LocalConfigReadResult> {
  const configPath = getConfigPath();

  try {
    await access(configPath);
  } catch {
    return { status: 'missing', config: null };
  }

  try {
    const raw = await readFile(configPath, 'utf8');
    const parsed: unknown = JSON.parse(raw);
    if (!isValidAppConfig(parsed)) {
      return { status: 'invalid', config: null };
    }

    return { status: 'valid', config: parsed };
  } catch {
    return { status: 'invalid', config: null };
  }
}

export async function loadLocalConfig(): Promise<AppConfig | null> {
  const state = await readLocalConfigState();
  return state.status === 'valid' ? state.config : null;
}

export async function saveLocalConfig(config: AppConfig): Promise<void> {
  const configPath = getConfigPath();
  await mkdir(path.dirname(configPath), { recursive: true, mode: 0o700 });
  await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, { mode: 0o600 });
}

export async function removeLocalConfig(): Promise<void> {
  await rm(getConfigPath(), { force: true });
}
