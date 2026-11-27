import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it } from 'vitest'

import { FavoritesScreen } from '@/components/account/FavoritesScreen'
import { favoriteCopy } from '@/lib/favoriteCopy'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const idle = {
  signedIn: true,
  notice: '',
  onCreate: () => undefined,
  onMove: () => undefined,
  onRemove: () => undefined,
}

describe('favorites screen', () => {
  it('shows folders, an empty page, and one saved listing', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root: Root = createRoot(container)
    await act(async () => {
      root.render(createElement(FavoritesScreen, { ...idle, folders: [], saved: [] }))
    })
    expect(container.textContent).toContain(favoriteCopy.empty)
    expect(container.textContent).toContain(favoriteCopy.print)
    expect(container.textContent).toContain(favoriteCopy.estimated)
    await act(async () => {
      root.render(
        createElement(FavoritesScreen, {
          ...idle,
          folders: [
            { id: 'old', name: 'Old folder', createdAt: '2026-11-27T08:00:00.000Z' },
            { id: 'new', name: 'New folder', createdAt: '2026-11-27T15:00:00.000Z' },
          ],
          saved: [],
        }),
      )
    })
    const names = [...container.querySelectorAll('li')].map((item) => item.textContent)
    expect(names[0]).toContain('New folder')
    expect(names[1]).toContain('Old folder')
    let removed = ''
    await act(async () => {
      root.render(
        createElement(FavoritesScreen, {
          ...idle,
          folders: [{ id: '1', name: 'Downtown', createdAt: '2026-11-27T12:00:00.000Z' }],
          saved: [{ id: '9', listingSlug: '201-n-brand', title: '201 N Brand', folderId: null }],
          onRemove: (id: string) => {
            removed = id
          },
        }),
      )
    })
    expect(container.textContent).toContain('201 N Brand')
    expect(container.textContent).toContain('Downtown')
    const remove = [...container.querySelectorAll('button')].find((button) => button.textContent === 'Remove')
    await act(async () => {
      remove?.click()
    })
    expect(removed).toBe('9')
    expect(container.innerHTML).not.toContain('window.print')
    await act(async () => root.unmount())
    container.remove()
  })
})
