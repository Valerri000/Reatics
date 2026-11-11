import { pointForMapMove } from '@/lib/mapRead'

export type MapPinInput = {
  slug: string
  latitude: number
  longitude: number
}

export type MapPin =
  | { kind: 'pin'; slug: string; latitude: number; longitude: number }
  | { kind: 'cluster'; count: number; latitude: number; longitude: number; slugs: string[] }

export function storedMapPins(
  listings: Array<{ slug: string; latitude?: number | null; longitude?: number | null }>,
): MapPinInput[] {
  return listings.flatMap((listing) => {
    const point = pointForMapMove(listing)
    if (!point) return []
    return [{ slug: listing.slug, latitude: point.latitude, longitude: point.longitude }]
  })
}

export function groupMapPins(points: MapPinInput[], zoom: number): MapPin[] {
  if (zoom >= 12) return points.map(singlePin)
  const step = zoom >= 9 ? 0.05 : zoom >= 6 ? 0.2 : 1
  const groups = new Map<string, MapPinInput[]>()
  for (const point of points) {
    const key = `${Math.round(point.latitude / step)}:${Math.round(point.longitude / step)}`
    const list = groups.get(key) || []
    list.push(point)
    groups.set(key, list)
  }
  return [...groups.values()].map((group) => {
    if (group.length === 1) return singlePin(group[0])
    const latitude = group.reduce((sum, point) => sum + point.latitude, 0) / group.length
    const longitude = group.reduce((sum, point) => sum + point.longitude, 0) / group.length
    return {
      kind: 'cluster',
      count: group.length,
      latitude,
      longitude,
      slugs: group.map((point) => point.slug),
    }
  })
}

export function pinFeatureCollection(points: MapPinInput[]) {
  return {
    type: 'FeatureCollection' as const,
    features: points.map((point) => ({
      type: 'Feature' as const,
      properties: { slug: point.slug },
      geometry: {
        type: 'Point' as const,
        coordinates: [point.longitude, point.latitude] as [number, number],
      },
    })),
  }
}

function singlePin(point: MapPinInput): MapPin {
  return { kind: 'pin', slug: point.slug, latitude: point.latitude, longitude: point.longitude }
}
