export const pageFrameWidths = [
  { id: 'desktop', width: 1920 },
  { id: 'phone', width: 320 },
] as const

export const pageFrames = [
  { id: 'about', kind: 'page', states: ['published'] },
  { id: 'services', kind: 'page', states: ['published'] },
  { id: 'contact', kind: 'page', states: ['empty', 'error', 'sent'] },
  { id: 'scholarship', kind: 'long', states: ['published'] },
  { id: 'steps', kind: 'long', states: ['published'] },
] as const

export const longPageType = {
  heading: 'h1',
  section: 'h2',
  body: 'body',
} as const

export function contactFormStates() {
  const contact = pageFrames.find((frame) => frame.id === 'contact')
  return contact ? contact.states : []
}
