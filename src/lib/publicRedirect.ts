export type RedirectRow = {
  fromPath: string
  toPath: string
  statusCode?: number | null
}

export type RedirectAnswer = {
  toPath: string
  statusCode: 301 | 302
}

export function requestPath(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return null
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  const path = trimmed.split('?')[0].split('#')[0]
  if (!path || path === '/') return null
  const clean = path.replace(/\/+$/, '')
  return clean.startsWith('/') ? clean : `/${clean}`
}

export function skipRedirectLookup(pathname: string) {
  return (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/health' ||
    /\.[a-z0-9]+$/i.test(pathname)
  )
}

export function resolveRedirect(pathname: string, rows: RedirectRow[]): RedirectAnswer | null {
  const start = requestPath(pathname)
  if (!start || skipRedirectLookup(start) || /^https?:\/\//i.test(start)) return null
  const byFrom = new Map<string, RedirectRow>()
  for (const row of rows) {
    const from = requestPath(row.fromPath)
    if (from) byFrom.set(from, row)
  }
  const seen = new Set<string>()
  let current = start
  let status: 301 | 302 = 301
  for (let hop = 0; hop < 8; hop += 1) {
    if (seen.has(current)) return null
    seen.add(current)
    const row = byFrom.get(current)
    if (!row) {
      if (current === start) return null
      return { toPath: current, statusCode: status }
    }
    const next = requestPath(row.toPath)
    if (!next || next === current) return null
    status = row.statusCode === 302 ? 302 : 301
    if (/^https?:\/\//i.test(next)) return { toPath: next, statusCode: status }
    current = next
  }
  if (current === start) return null
  return { toPath: current, statusCode: status }
}
