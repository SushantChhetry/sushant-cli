export function redactSecret(secret) {
    if (!secret) {
        return '****';
    }
    const trimmed = secret.trim();
    if (trimmed.length <= 6) {
        return `${trimmed[0] ?? '*'}****`;
    }
    const prefix = trimmed.slice(0, 3);
    const suffix = trimmed.slice(-4);
    return `${prefix}****${suffix}`;
}
