import { describe, expect, it } from 'vitest'

import { contentManager, draftPostPreview } from '@/lib/contentManagerPass'

describe('draft post preview', () => {
  it('lets the content manager open a draft and shows the preview line', () => {
    const account = contentManager()
    const preview = draftPostPreview({ adminRole: account?.adminRole }, 'office-tour-notes')
    expect(preview.path).toBe('/blog/office-tour-notes?preview=1')
    expect(preview.allowed).toBe(true)
    expect(preview.line).toBe('Draft preview')
  })

  it('keeps a signed-out visitor off the draft', () => {
    expect(draftPostPreview(null, 'office-tour-notes').allowed).toBe(false)
  })
})
