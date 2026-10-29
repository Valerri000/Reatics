export const storyWidths = [
  { id: 'desktop', width: 1920 },
  { id: 'phone', width: 320 },
] as const

export const storyFrames = [
  { id: 'blog-index', empty: 'No posts yet.' },
  { id: 'blog-post', empty: '' },
  { id: 'glossary-index', empty: 'No terms yet.' },
  { id: 'glossary-term', empty: '' },
] as const

export function storyEmptyStates() {
  return storyFrames.filter((frame) => frame.empty).map((frame) => frame.empty)
}
