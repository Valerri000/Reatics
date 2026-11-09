import { readStoredPoint, type MapPoint } from '@/lib/listingCoordinates'

export function pointForMapMove(listing: {
  latitude?: number | null
  longitude?: number | null
}): MapPoint | null {
  return readStoredPoint(listing)
}
