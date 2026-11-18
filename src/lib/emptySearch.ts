import { emptyPlace } from '@/lib/placeList'

export function emptySearchMessage(count: number) {
  if (count === 0) return emptyPlace
  return `${count} listings`
}
