import { describe, expect, it } from 'vitest'

import { entities, relationships } from '@/lib/diagram'

describe('mailbox diagram', () => {
  it('draws the mailbox as a present table', () => {
    expect(entities.find((entity) => entity.name === 'mailbox')).toMatchObject({
      storage: 'table',
      status: 'present',
    })
    expect(relationships).toContainEqual({ from: 'users', to: 'mailbox', label: 'notices' })
  })
})
