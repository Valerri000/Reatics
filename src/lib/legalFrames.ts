export const legalWidths = [
  { id: 'desktop', width: 1920 },
  { id: 'phone', width: 320 },
] as const

export const legalFrames = [
  { id: 'terms', kind: 'long-text' },
  { id: 'privacy', kind: 'long-text' },
  { id: 'missing', kind: 'missing-page' },
] as const

export const missingPageLine = 'This page is missing.'
