import { describe, expect, it } from 'vitest'

import { canPreviewDraft, recordWhere, wantsPreview } from '@/lib/preview'
import type { RoleUser } from '@/lib/roles'

const editor: RoleUser = { id: 2, adminRole: 'content-manager' }
const owner: RoleUser = { id: 1, adminRole: 'owner' }
const moderator: RoleUser = { id: 3, adminRole: 'moderator' }

describe('draft preview', () => {
  it('lets a content manager and the owner open a draft preview', () => {
    expect(wantsPreview('1')).toBe(true)
    expect(wantsPreview('true')).toBe(true)
    expect(wantsPreview(undefined)).toBe(false)
    expect(canPreviewDraft(editor, true)).toBe(true)
    expect(canPreviewDraft(owner, true)).toBe(true)
    expect(recordWhere('office-tour-notes', true)).toEqual({ slug: { equals: 'office-tour-notes' } })
  })

  it('keeps a signed-out visitor and a moderator off that preview', () => {
    expect(canPreviewDraft(null, true)).toBe(false)
    expect(canPreviewDraft(moderator, true)).toBe(false)
    expect(canPreviewDraft(editor, false)).toBe(false)
    expect(recordWhere('office-tour-notes', false)).toEqual({
      and: [{ slug: { equals: 'office-tour-notes' } }, { status: { equals: 'published' } }],
    })
  })
})
