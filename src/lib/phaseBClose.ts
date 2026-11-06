export const stagingOrigin = 'https://18.118.84.127'

export const phaseBPages = [
  { path: '/', label: 'Homepage' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/contact', label: 'Contact' },
  { path: '/scholarship', label: 'Scholarship' },
  { path: '/steps', label: 'Steps to Renting' },
  { path: '/blog', label: 'Blog' },
  { path: '/glossary', label: 'Glossary' },
  { path: '/glendale', label: 'Glendale' },
  { path: '/office', label: 'Office' },
] as const

export const phaseBOpenItems = [
  {
    id: 'terms',
    label: 'Terms copy has not been supplied. The page stays unpublished and noindex.',
  },
  {
    id: 'privacy',
    label: 'Privacy copy has not been supplied. The page stays unpublished and noindex.',
  },
  {
    id: 'content-manager',
    label: 'The content manager name has not been supplied.',
  },
  {
    id: 'github',
    label: 'The company GitHub transfer has not been done.',
  },
  {
    id: 'contact-email',
    label: 'Contact email sending is not connected.',
  },
] as const
