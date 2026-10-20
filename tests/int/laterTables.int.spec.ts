import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { entities, heldBack, phase2Tables } from '@/lib/diagram'

describe('later tables', () => {
  it('keeps the later tables off the diagram', () => {
    const diagram = readFileSync('docs/entity-diagram.md', 'utf8')
    const phase2 = diagram.split('## Phase 2, empty')[1]?.split('## Not in this diagram')[0] ?? ''
    const later = diagram.split('## Not in this diagram')[1] ?? ''
    expect(diagram).toContain('Phase 2, empty')
    const drawn = entities.map((entity) => entity.name)
    for (const name of heldBack) {
      expect(drawn).not.toContain(name)
      expect(later).toContain(name)
      expect(phase2).not.toContain(name)
    }
    for (const name of phase2Tables) {
      expect(phase2).toContain(name)
      expect(later).not.toContain(name)
      expect(entities.find((entity) => entity.name === name)?.status).toBe('empty')
    }
  })
})
