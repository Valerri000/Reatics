export type EntityStorage = 'table' | 'fields'

export type EntityStatus = 'present' | 'planned'

export type DiagramEntity = {
  name: string
  storage: EntityStorage
  status: EntityStatus
  on?: string[]
}

export const entities: DiagramEntity[] = [
  { name: 'users', storage: 'table', status: 'present' },
  { name: 'pages', storage: 'table', status: 'present' },
  { name: 'listings', storage: 'table', status: 'present' },
  { name: 'media', storage: 'table', status: 'present' },
  { name: 'billing', storage: 'table', status: 'present' },
  { name: 'redirects', storage: 'table', status: 'planned' },
  { name: 'inquiries', storage: 'table', status: 'planned' },
]
