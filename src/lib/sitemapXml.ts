export function sitemapOrigin(configured: string | undefined, fallback: string) {
  const value = configured?.trim().replace(/\/$/, '')
  return value || fallback
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function sitemapDocument(urls: string[]) {
  const rows = urls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`)
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...rows,
    '</urlset>',
    '',
  ].join('\n')
}
