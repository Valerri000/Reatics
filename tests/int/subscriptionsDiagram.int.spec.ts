import { describe, expect, it } from 'vitest'

import { entities, relationships } from '@/lib/diagram'

describe('subscriptions diagram', () => {
  it('draws subscriptions as a present table', () => {
    expect(entities.find((entity) => entity.name === 'subscriptions')).toMatchObject({
      storage: 'table',
      status: 'present',
    })
    expect(relationships).toContainEqual({ from: 'users', to: 'subscriptions', label: 'subscribes' })
  })
})
