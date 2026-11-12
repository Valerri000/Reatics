export type AreaPoint = {
  latitude: number
  longitude: number
}

export function addAreaPoint(area: AreaPoint[], point: AreaPoint) {
  return [...area, point]
}

export function clearArea(): AreaPoint[] {
  return []
}

export function pointInArea(point: AreaPoint, area: AreaPoint[]) {
  if (area.length < 3) return true
  let inside = false
  for (let index = 0, previous = area.length - 1; index < area.length; previous = index++) {
    const current = area[index]
    const before = area[previous]
    const crosses = current.latitude > point.latitude !== before.latitude > point.latitude
    if (!crosses) continue
    const longitude =
      ((before.longitude - current.longitude) * (point.latitude - current.latitude)) /
        (before.latitude - current.latitude) +
      current.longitude
    if (point.longitude < longitude) inside = !inside
  }
  return inside
}

export function areaFeature(area: AreaPoint[]) {
  if (area.length < 2) return { type: 'FeatureCollection' as const, features: [] }
  const coordinates = area.map((point) => [point.longitude, point.latitude])
  if (area.length < 3) {
    return {
      type: 'FeatureCollection' as const,
      features: [
        {
          type: 'Feature' as const,
          properties: {},
          geometry: { type: 'LineString' as const, coordinates },
        },
      ],
    }
  }
  return {
    type: 'FeatureCollection' as const,
    features: [
      {
        type: 'Feature' as const,
        properties: {},
        geometry: { type: 'Polygon' as const, coordinates: [[...coordinates, coordinates[0]]] },
      },
    ],
  }
}
