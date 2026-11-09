export type MapPoint = {
  latitude: number
  longitude: number
}

const knownPoints = [
  {
    street: '201 n brand blvd',
    city: 'glendale',
    latitude: 34.1478,
    longitude: -118.2551,
  },
]

export function readStoredPoint(listing: {
  latitude?: number | null
  longitude?: number | null
}): MapPoint | null {
  if (!isPoint(listing.latitude) || !isPoint(listing.longitude)) return null
  return { latitude: listing.latitude, longitude: listing.longitude }
}

export function pointSavedWithListing<T extends { street?: string | null; city?: string | null; latitude?: number | null; longitude?: number | null }>(
  data: T,
): T {
  if (readStoredPoint(data)) return data
  const known = knownPoints.find(
    (point) => point.street === normalize(data.street) && point.city === normalize(data.city),
  )
  if (!known) return data
  return { ...data, latitude: known.latitude, longitude: known.longitude }
}

function normalize(value?: string | null) {
  return (value || '').trim().toLowerCase()
}

function isPoint(value?: number | null): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}
