export function assetUrl(path: string) {
  const baseUrl = import.meta.env.BASE_URL
  const normalizedPath = path.replace(/^\/+/, '')

  return `${baseUrl}${normalizedPath}`
}
