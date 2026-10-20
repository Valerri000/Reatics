export type EntityStorage = 'table' | 'fields'

export type EntityStatus = 'present' | 'planned' | 'empty'

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

export const redirectFields = ['fromPath', 'toPath', 'statusCode'] as const

export const redirectStatusCode = 301

export const inquiryFields = ['name', 'email', 'message', 'listing'] as const

export const inquiryExcluded = ['providerPhone', 'providerEmail'] as const

export const phase2Tables = [
  'companies',
  'company-members',
  'deals',
  'deal-participants',
  'screening-requests',
  'lease-drafts',
  'signed-documents',
] as const

export const heldBack = [
  'saved-searches',
  'alerts',
  'favorites',
  'prospects',
  'ads',
  'referrals',
] as const

export const relationships = [
  { from: 'users', to: 'listings', label: 'lists' },
  { from: 'users', to: 'billing', label: 'records' },
  { from: 'users', to: 'inquiries', label: 'sends' },
  { from: 'listings', to: 'inquiries', label: 'receives' },
  { from: 'listings', to: 'media', label: 'shows' },
  { from: 'pages', to: 'media', label: 'shows' },
  { from: 'pages', to: 'redirects', label: 'replaces' },
  { from: 'listings', to: 'redirects', label: 'replaces' },
  { from: 'companies', to: 'company-members', label: 'includes' },
  { from: 'users', to: 'company-members', label: 'joins' },
  { from: 'companies', to: 'deals', label: 'opens' },
  { from: 'listings', to: 'deals', label: 'concerns' },
  { from: 'deals', to: 'deal-participants', label: 'includes' },
  { from: 'users', to: 'deal-participants', label: 'joins' },
  { from: 'deals', to: 'screening-requests', label: 'requests' },
  { from: 'deals', to: 'lease-drafts', label: 'drafts' },
  { from: 'lease-drafts', to: 'signed-documents', label: 'files' },
  { from: 'signed-documents', to: 'media', label: 'stores' },
] as const

export const entities: DiagramEntity[] = [
  { name: 'users', storage: 'table', status: 'present' },
  { name: 'pages', storage: 'table', status: 'present' },
  { name: 'listings', storage: 'table', status: 'present' },
  { name: 'media', storage: 'table', status: 'present' },
  { name: 'billing', storage: 'table', status: 'present' },
  { name: 'redirects', storage: 'table', status: 'present' },
  { name: 'inquiries', storage: 'table', status: 'planned' },
  { name: 'seo', storage: 'fields', status: 'present', on: ['pages', 'listings'] },
  ...phase2Tables.map((name) => ({ name, storage: 'table' as const, status: 'empty' as const })),
]
