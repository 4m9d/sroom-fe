export default function getQueryURL(
  endpoint: string,
  params: Record<string, string | number | boolean> | undefined
) {
  if (params === undefined) return endpoint;

  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `${endpoint}?${query}`;
}
