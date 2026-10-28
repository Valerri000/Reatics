import { bodyText, hasBody } from '@/lib/bodyText'
import { browserTitle, type SeoFields } from '@/lib/pageMeta'
import { isPublicPageSlug } from '@/lib/publicPages'

type ResponsePage = SeoFields & {
  h1?: string | null
  status?: string | null
  content?: unknown
}

export function pageHeading(page: { h1?: string | null; title?: string | null }) {
  const heading = page.h1?.trim()
  if (heading) return heading
  return page.title?.trim() || ''
}

export function pageBody(page: { content?: unknown }) {
  return bodyText(page.content)
}

export function firstResponse(page: ResponsePage) {
  return {
    title: browserTitle(page),
    h1: pageHeading(page),
    body: pageBody(page),
  }
}

export function servePublicPage(slug: string, page: ResponsePage | null) {
  if (!isPublicPageSlug(slug) || !page || page.status !== 'published') return false
  const response = firstResponse(page)
  return response.h1.length > 0 && hasBody(page.content)
}
