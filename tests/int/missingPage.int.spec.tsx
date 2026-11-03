import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import MissingPage from '@/app/(frontend)/not-found'
import { missingPageLine } from '@/lib/legalFrames'

describe('missing page', () => {
  it('shows the missing line', () => {
    const html = renderToStaticMarkup(<MissingPage />)
    expect(html).toContain(missingPageLine)
    expect(html).toContain('<h1')
  })
})
