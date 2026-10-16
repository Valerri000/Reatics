export type EntityStorage = 'table' | 'fields'

export type EntityStatus = 'present' | 'planned'

export type DiagramEntity = {
  name: string
  storage: EntityStorage
  status: EntityStatus
  on?: string[]
}

export const productRoles = [
  { value: 'space-seeker', label: 'Space seeker' },
  { value: 'broker', label: 'Broker' },
  { value: 'owner', label: 'Owner with listings' },
  { value: 'broker-owner', label: 'Broker and owner' },
  { value: 'coworking', label: 'Coworking provider' },
] as const

export const adminRoles = [
  { value: 'owner', field: 'adminRole', label: 'Owner' },
  { value: 'content-manager', field: 'adminRole', label: 'Content manager' },
  { value: 'moderator', field: 'adminRole', label: 'Moderator' },
] as const

export const seoFields = [
  'slug',
  'pageTitle',
  'metaDescription',
  'robots',
  'canonicalUrl',
  'h1',
  'imageAlt',
  'socialTitle',
  'sitemap',
] as const

export const entities: DiagramEntity[] = [
  { name: 'users', storage: 'table', status: 'present' },
  { name: 'pages', storage: 'table', status: 'present' },
  { name: 'listings', storage: 'table', status: 'present' },
  { name: 'media', storage: 'table', status: 'present' },
  { name: 'billing', storage: 'table', status: 'present' },
  { name: 'redirects', storage: 'table', status: 'planned' },
  { name: 'inquiries', storage: 'table', status: 'planned' },
  { name: 'seo', storage: 'fields', status: 'planned', on: ['pages', 'listings'] },
]
