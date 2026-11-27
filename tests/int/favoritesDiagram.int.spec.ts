import { describe, expect, it } from 'vitest'

import { entities, heldBack, relationships } from '@/lib/diagram'

describe('favorites diagram', () => {
  it('draws favorites on the entity diagram', () => {
    expect(heldBack as readonly string[]).not.toContain('favorites')
    expect(entities.find((entity) => entity.name === 'favorite-folders')).toMatchObject({
      storage: 'table',
      status: 'present',
    })
    expect(entities.find((entity) => entity.name === 'favorites')).toMatchObject({
      storage: 'table',
      status: 'present',
    })
    expect(relationships).toContainEqual({ from: 'users', to: 'favorite-folders', label: 'groups' })
    expect(relationships).toContainEqual({ from: 'favorite-folders', to: 'favorites', label: 'holds' })
    expect(relationships).toContainEqual({ from: 'users', to: 'favorites', label: 'saves' })
    expect(relationships).toContainEqual({ from: 'listings', to: 'favorites', label: 'saved' })
  })
})
