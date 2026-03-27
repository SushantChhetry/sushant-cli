import { removeLocalConfig } from '../config/store.js';
export async function logoutCommand() {
    await removeLocalConfig();
    console.log('Local Sushant config removed.');
}
