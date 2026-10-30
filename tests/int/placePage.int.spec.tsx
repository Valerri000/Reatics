import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import React from 'react'

import { PlacePage } from '@/components/place/PlacePage'
import { emptyPlace, mapLabel } from '@/lib/placeList'
import type { RichTextBody } from '@/payload-types'

const intro: RichTextBody = {
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        version: 1,
        children: [{ type: 'text', version: 1, text: 'Commercial space in Glendale.' }],
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
}

describe('place page', () => {
  it('shows the title, the intro, the map link, and the empty state', () => {
    const html = renderToStaticMarkup(
      <PlacePage h1="Glendale" content={intro} listings={[]} mapHref="/map?city=Glendale" />,
    )
    expect(html).toContain('Glendale')
    expect(html).toContain('Commercial space in Glendale.')
    expect(html).toContain(mapLabel)
    expect(html).toContain('href="/map?city=Glendale"')
    expect(html).toContain(emptyPlace)
  })
})
