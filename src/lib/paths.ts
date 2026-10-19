export type PublicCollection = 'pages' | 'listings'

export function publicPath(collection: PublicCollection, slug: string) {
  const clean = slug.trim().replace(/^\/+|\/+$/g, '')
  if (collection === 'listings') return `/listings/${clean}`
  return `/${clean}`
}
