import { describe, expect, it } from 'vitest'

import { blocksBody } from '@/lib/bodyBlocks'
import { firstResponse, servePublicPage } from '@/lib/pageResponse'

const about = {
  title: 'About Us',
  slug: 'about',
  status: 'published',
  pageTitle: 'About Reatics',
  h1: 'About Reatics',
  content: blocksBody([
    { kind: 'paragraph', text: 'Reatics lists commercial space.' },
    { kind: 'h2', text: 'Who it is for' },
  ]),
}

describe('public page response', () => {
  it('puts the title, the H1, and the body in the first response', () => {
    expect(firstResponse(about)).toEqual({
      title: 'About Reatics',
      h1: 'About Reatics',
      body: 'Reatics lists commercial space.Who it is for',
    })
  })

  it('keeps a draft off the public page', () => {
    expect(servePublicPage('about', about)).toBe(true)
    expect(servePublicPage('about', { ...about, status: 'draft' })).toBe(false)
    expect(servePublicPage('about', null)).toBe(false)
    expect(servePublicPage('blog', about)).toBe(false)
    expect(servePublicPage('about', { ...about, h1: '', title: '', content: null })).toBe(false)
  })
})
