import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AuthProvider } from '@/components/auth/AuthProvider'
import { HomePage } from '@/components/home/HomePage'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}))

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

async function mount() {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root: Root = createRoot(container)
  await act(async () => {
    root.render(
      createElement(AuthProvider, {
        user: null,
        children: createElement(HomePage),
      }),
    )
  })
  return {
    container,
    cleanup() {
      act(() => root.unmount())
      container.remove()
    },
  }
}

function choose(container: HTMLElement, name: string, value: string) {
  const node = container.querySelector(`select[name="${name}"]`) as HTMLSelectElement | null
  if (!node) throw new Error(`missing ${name}`)
  const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value')?.set
  act(() => {
    setter?.call(node, value)
    node.dispatchEvent(new Event('change', { bubbles: true }))
  })
}

describe('homepage direction', () => {
  let view: Awaited<ReturnType<typeof mount>>

  beforeEach(async () => {
    view = await mount()
  })

  it('keeps the section order and the three page insets', () => {
    const text = view.container.textContent || ''
    const markers = [
      'Best-in-class commercial real estate search engine.',
      'Featured commercial properties',
      'About Reatics',
      'Services',
      'We can teach you',
      'Blog',
      'Connect with us',
      'Find coworking spaces in:',
      'Find commercial real estate in:',
      'Send us a message.',
    ]
    let cursor = -1
    for (const marker of markers) {
      const next = text.indexOf(marker)
      expect(next).toBeGreaterThan(cursor)
      cursor = next
    }

    const sections = view.container.querySelectorAll('section')
    expect(sections.length).toBe(8)
    for (const section of sections) {
      expect(section.className).toContain('px-inset-phone')
      expect(section.className).toContain('md:px-inset-tablet')
      expect(section.className).toContain('xl:px-inset-desktop')
      expect(section.className).toContain('2xl:px-inset-wide')
    }
    expect(view.container.querySelector('footer')?.className).toContain('px-inset-phone')
    expect(view.container.querySelector('footer')?.className).toContain('2xl:px-inset-wide')
    view.cleanup()
  })

  it('shows three, four, and six listing cards by width', () => {
    const wraps = view.container.querySelectorAll('#featured .grid > div')
    expect(wraps).toHaveLength(6)
    expect(wraps[0].className).toBe('')
    expect(wraps[2].className).toBe('')
    expect(wraps[3].className).toContain('hidden')
    expect(wraps[3].className).toContain('md:block')
    expect(wraps[4].className).toContain('xl:block')
    expect(wraps[5].className).toContain('xl:block')

    const cards = view.container.querySelectorAll('#featured article')
    for (const card of cards) {
      const label = card.querySelector('span')?.textContent
      if (label !== 'Coworking') continue
      expect(card.querySelector('a[href="tel:18885189168"]')?.textContent).toBe('1-888-518-9168')
      expect(card.textContent).not.toContain('Contact')
    }
    view.cleanup()
  })

  it('changes the use list with the transaction and keeps the contact path', () => {
    const form = view.container.querySelector('form')
    expect(form?.className).toContain('bg-sand')
    expect(form?.className).toContain('rounded-panel')

    choose(view.container, 'kind', 'coworking')
    const coworking = [...view.container.querySelectorAll('select[name="use"] option')].map(
      (option) => option.textContent,
    )
    expect(coworking).toContain('1–2')
    expect(coworking).not.toContain('Office')

    choose(view.container, 'kind', 'lease')
    const lease = [...view.container.querySelectorAll('select[name="use"] option')].map(
      (option) => option.textContent,
    )
    expect(lease).toContain('Industrial')
    expect(lease).not.toContain('1–2')

    const text = view.container.textContent || ''
    expect(text).toContain('201 N Brand Suite 200')
    expect(text).toContain('1-888-518-9168')
    expect(text).toContain('info@reatics.com')
    expect(text).not.toContain('Careers')
    expect(text).not.toContain('Submarket')
    view.cleanup()
  })
})
