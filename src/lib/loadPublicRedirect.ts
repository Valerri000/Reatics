import { getPayload } from 'payload'

import { requestPath, resolveRedirect, skipRedirectLookup, type RedirectRow } from '@/lib/publicRedirect'
import config from '@/payload.config'

export async function loadPublicRedirect(pathname: string) {
  const start = requestPath(pathname)
  if (!start || skipRedirectLookup(start)) return null
  const payload = await getPayload({ config })
  const rows: RedirectRow[] = []
  const seen = new Set<string>()
  let cursor: string | null = start
  while (cursor && !seen.has(cursor) && rows.length < 8) {
    seen.add(cursor)
    const found = await payload.find({
      collection: 'redirects',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      where: { fromPath: { equals: cursor } },
    })
    const row = found.docs[0]
    if (!row?.fromPath || !row.toPath) break
    rows.push({
      fromPath: row.fromPath,
      toPath: row.toPath,
      statusCode: row.statusCode,
    })
    const next = requestPath(row.toPath)
    if (!next || /^https?:\/\//i.test(next)) break
    cursor = next
  }
  return resolveRedirect(start, rows)
}
