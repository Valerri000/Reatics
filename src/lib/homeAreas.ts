export function cityAreaLinks(
  cities: { title?: string | null; slug?: string | null; status?: string | null }[],
) {
  return cities.flatMap((city) => {
    const slug = city.slug?.trim()
    const title = city.title?.trim()
    if (city.status !== 'published' || !slug || !title) return []
    return [{ href: `/${slug}`, label: title }]
  })
}
