import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { SavedBrokers } from '@/components/account/SavedBrokers'

vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) =>
    createElement('a', { href, className }, children),
}))

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

describe('saved brokers', () => {
  it('shows the empty state and a way to the directory', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root: Root = createRoot(container)
    await act(async () => {
      root.render(createElement(SavedBrokers))
    })
    expect(container.textContent).toContain('No saved brokers yet.')
    expect(container.textContent).toContain('Brokers you save will appear on this page.')
    const link = container.querySelector('a[href="/brokers"]')
    expect(link?.textContent).toBe('Find a broker')
    expect(link?.querySelector('span')?.className).toContain('text-white')
    await act(async () => root.unmount())
    container.remove()
  })
})
