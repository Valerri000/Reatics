export type PublicCollection = 'pages' | 'listings' | 'posts' | 'glossary'

export function publicPath(collection: PublicCollection, slug: string) {
  const clean = slug.trim().replace(/^\/+|\/+$/g, '')
  if (collection === 'listings') return `/listings/${clean}`
  if (collection === 'posts') return `/blog/${clean}`
  if (collection === 'glossary') return `/glossary/${clean}`
  return `/${clean}`
}
