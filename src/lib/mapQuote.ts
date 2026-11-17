export const mapQuoteStatus = 'pending' as const

export const launchMapCharges = {
  early: '$0 to $50',
  busy: '$150 to $400',
} as const

export const mapInteraction = [
  'split view',
  'stored coordinates',
  'filters',
  'no geocoding call on every map move',
] as const

export function mapVendor(quote: 'pending' | 'accepted' | 'refused') {
  if (quote === 'refused') return 'Google Maps'
  return 'Mapbox'
}

export function mapInteractionFor(quote: 'pending' | 'accepted' | 'refused') {
  if (quote === 'refused') return mapInteraction
  return mapInteraction
}
