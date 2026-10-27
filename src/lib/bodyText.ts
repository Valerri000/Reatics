export function bodyText(value: unknown): string {
  if (typeof value === 'string') return value.trim()
  const parts: string[] = []
  collect(value, parts)
  return parts.join('').trim()
}

export function hasBody(value: unknown) {
  return bodyText(value).length > 0
}

function collect(value: unknown, parts: string[]) {
  if (Array.isArray(value)) {
    for (const item of value) collect(item, parts)
    return
  }
  if (!value || typeof value !== 'object') return
  const record = value as Record<string, unknown>
  if (typeof record.text === 'string') parts.push(record.text)
  for (const [key, child] of Object.entries(record)) {
    if (key === 'text') continue
    if (child && typeof child === 'object') collect(child, parts)
  }
}
