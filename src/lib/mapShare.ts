import type { MapFilters } from '@/lib/mapFilters'
import { reservedMapPath } from '@/lib/placeList'

export function cityMapPath(city: string) {
  return reservedMapPath('city', city)
}

export function typeMapPath(type: string) {
  return reservedMapPath('property-type', type)
}

export function shareableMapPath(filters: MapFilters) {
  const params = new URLSearchParams()
  if (filters.place) params.set('city', filters.place)
  if (filters.kind) params.set('kind', filters.kind)
  if (filters.propertyType) params.set('type', filters.propertyType)
  if (filters.priceMin) params.set('priceMin', filters.priceMin)
  if (filters.priceMax) params.set('priceMax', filters.priceMax)
  if (filters.squareFootageMin) params.set('sqftMin', filters.squareFootageMin)
  if (filters.squareFootageMax) params.set('sqftMax', filters.squareFootageMax)
  if (filters.keywords) params.set('keywords', filters.keywords)
  const text = params.toString()
  return text ? `/map?${text}` : '/map'
}
