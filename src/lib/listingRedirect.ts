import { publicPath } from '@/lib/paths'
import { resolveRedirect } from '@/lib/publicRedirect'

export function listingSlugRedirect(previousSlug: string, nextSlug: string) {
  return resolveRedirect(publicPath('listings', previousSlug), [
    {
      fromPath: publicPath('listings', previousSlug),
      toPath: publicPath('listings', nextSlug),
      statusCode: 301,
    },
  ])
}
