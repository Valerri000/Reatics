import { phaseBHost } from '@/lib/phaseB'
import { loadSitemapPaths } from '@/lib/loadSitemap'
import { sitemapDocument, sitemapOrigin } from '@/lib/sitemapXml'

export const dynamic = 'force-dynamic'

export async function GET() {
  const origin = sitemapOrigin(process.env.NEXT_PUBLIC_SERVER_URL, phaseBHost)
  const paths = await loadSitemapPaths()
  const xml = sitemapDocument(paths.map((path) => `${origin}${path}`))
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
