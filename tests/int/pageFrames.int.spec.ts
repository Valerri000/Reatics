import { describe, expect, it } from 'vitest'

import { contactFormStates, longPageType, pageFrames, pageFrameWidths } from '@/lib/pageFrames'

describe('public page frames', () => {
  it('locks About, Services, and Contact for desktop and phone', () => {
    expect(pageFrameWidths.map((item) => item.width)).toEqual([1920, 320])
    expect(pageFrames.map((frame) => frame.id)).toEqual([
      'about',
      'services',
      'contact',
      'scholarship',
      'steps',
    ])
  })

  it('shows the contact form empty, with an error, and after a send', () => {
    expect(contactFormStates()).toEqual(['empty', 'error', 'sent'])
  })

  it('uses one type scale for the long pages', () => {
    expect(pageFrames.filter((frame) => frame.kind === 'long').map((frame) => frame.id)).toEqual([
      'scholarship',
      'steps',
    ])
    expect(longPageType).toEqual({ heading: 'h1', section: 'h2', body: 'body' })
  })
})
