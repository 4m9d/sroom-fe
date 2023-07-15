export default function getQueryURL(endpoint: string, params: Record<string, string | number>) {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `${endpoint}?${query}`;
}