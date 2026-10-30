export const placeWidths = [
  { id: 'desktop', width: 1920 },
  { id: 'phone', width: 320 },
] as const

export const placeFrames = [
  { id: 'city', empty: 'No listings yet.', map: 'View on the map' },
  { id: 'property-type', empty: 'No listings yet.', map: 'View on the map' },
] as const

export function placeEmptyStates() {
  return placeFrames.map((frame) => frame.empty)
}

export function placeMapLabels() {
  return placeFrames.map((frame) => frame.map)
}
