export function listingSlugFromHref(href: string) {
  const path = href.split('?')[0].split('#')[0]
  if (!path.startsWith('/listings/')) return ''
  const slug = path.slice('/listings/'.length).split('/')[0]
  if (!/^[a-z0-9-]{1,120}$/.test(slug)) return ''
  return slug
}
