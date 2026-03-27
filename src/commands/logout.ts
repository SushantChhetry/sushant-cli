import { removeLocalConfig } from '../config/store.js';

export async function logoutCommand(): Promise<void> {
  await removeLocalConfig();
  console.log('Local Sushant config removed.');
}
