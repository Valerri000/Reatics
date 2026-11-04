import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import MissingPage from '@/app/(frontend)/not-found'
import { missingPageLine } from '@/lib/legalFrames'

describe('missing page', () => {
  it('shows the missing line', () => {
    const html = renderToStaticMarkup(<MissingPage />)
    expect(html).toContain(missingPageLine)
    expect(html).toContain('<h1')
    expect(html).toContain('px-inset-phone')
    expect(html).toContain('md:px-inset-tablet')
    expect(html).toContain('xl:px-inset-desktop')
    expect(html).toContain('xl:text-title')
  })
})
