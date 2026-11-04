export function homepageSearchTarget(fields: { place: string; kind: string; use: string }) {
  const params = new URLSearchParams({
    place: fields.place.trim(),
    kind: fields.kind,
    use: fields.use,
  })
  return `/featured?${params.toString()}`
}

export function searchCallsMapbox(target: string) {
  const url = new URL(target, 'https://18.118.84.127')
  return url.hostname.includes('mapbox')
}

export function searchOpensMap(target: string) {
  const path = target.split('?')[0]
  return path === '/map' || path.startsWith('/map/')
}
