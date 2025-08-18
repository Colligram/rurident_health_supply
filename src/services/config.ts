export function getApiBaseURL(): string {
  const envBase = (import.meta as any)?.env?.VITE_API_BASE_URL;
  if (envBase && typeof envBase === 'string' && envBase.trim().length > 0) {
    return envBase.replace(/\/$/, '');
  }
  return '/api';
}

export function withTimeout(initMs: number = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), initMs);
  return { signal: controller.signal, clear: () => clearTimeout(timeoutId) };
}
