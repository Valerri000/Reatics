export const homepageWidths = [
  { id: 'desktop', width: 1920 },
  { id: 'tablet', width: 768 },
  { id: 'phone', width: 320 },
] as const

export const homepageSections = [
  { id: 'header', source: 'template' },
  { id: 'hero', source: 'admin' },
  { id: 'search', source: 'template' },
  { id: 'featured', source: 'admin' },
  { id: 'about', source: 'admin' },
  { id: 'services', source: 'admin' },
  { id: 'steps', source: 'admin' },
  { id: 'blog', source: 'admin' },
  { id: 'signup', source: 'template' },
  { id: 'areas', source: 'admin' },
  { id: 'contact', source: 'template' },
  { id: 'footer', source: 'template' },
] as const

export const searchFields = ['place', 'kind', 'use'] as const

export function homepageSearchIsField() {
  return homepageSections.find((section) => section.id === 'search')?.source === 'template'
}
