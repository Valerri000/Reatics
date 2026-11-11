export const mapTitle = 'Map'

export const mapRobots = { index: false as const, follow: false as const }

export const mapStyles = {
  streets: 'mapbox://styles/mapbox/streets-v12',
  satellite: 'mapbox://styles/mapbox/satellite-streets-v12',
}

export const mapCluster = {
  cluster: true,
  clusterRadius: 50,
  clusterMaxZoom: 11,
}

export function mapToken(env: { MAPBOX_TOKEN?: string; NEXT_PUBLIC_MAPBOX_TOKEN?: string; [key: string]: string | undefined }) {
  return (env.NEXT_PUBLIC_MAPBOX_TOKEN || env.MAPBOX_TOKEN || '').trim()
}

export function mapStyle(satellite: boolean) {
  return satellite ? mapStyles.satellite : mapStyles.streets
}

export function locationCenter(position: { coords: { latitude: number; longitude: number } }) {
  return { latitude: position.coords.latitude, longitude: position.coords.longitude }
}

export function nextZoom(zoom: number, direction: 'in' | 'out') {
  const next = direction === 'in' ? zoom + 1 : zoom - 1
  return Math.min(20, Math.max(1, next))
}
