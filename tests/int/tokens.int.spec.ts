import { createRoot, type Root } from 'react-dom/client'
import { act, createElement, type ReactNode } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { AuthModal } from '@/components/auth/AuthModal'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { Header } from '@/components/header/Header'
import { ListingCard } from '@/components/listing/ListingCard'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}))

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

async function mount(node: ReactNode) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root: Root = createRoot(container)
  await act(async () => {
    root.render(node)
  })
  return {
    container,
    cleanup() {
      act(() => root.unmount())
      container.remove()
    },
  }
}

function clickText(container: HTMLElement, text: string) {
  const node = [...container.querySelectorAll('button')].find((button) => button.textContent === text)
  if (!node) throw new Error(`missing ${text}`)
  act(() => {
    node.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
}

describe('shared tokens', () => {
  it('keeps the header and sign-in modal on the style board', async () => {
    const view = await mount(
      createElement(AuthProvider, { user: null }, createElement(Header), createElement(AuthModal)),
    )

    const addListing = [...view.container.querySelectorAll('button')].find(
      (button) => button.textContent === 'Add a Listing',
    )
    expect(addListing?.className).toContain('text-accent')
    expect(view.container.querySelector('a[href="/brokers"]')?.className).toContain('text-accent')
    const login = [...view.container.querySelectorAll('button')].find(
      (button) => button.textContent === 'Login',
    )
    expect(login?.className).toContain('text-ink')
    expect(view.container.querySelector('header')?.className).toContain('border-line')
    expect(view.container.querySelector('header')?.className).toContain('bg-white')

    clickText(view.container, 'Login')
    const overlay = view.container.querySelector('.fixed.inset-0')
    expect(overlay?.className).toContain('bg-ink/45')
    const panel = overlay?.firstElementChild
    expect(panel?.className).toContain('bg-white')
    expect(panel?.className).not.toContain('rounded')
    const signIn = [...view.container.querySelectorAll('button')].find(
      (button) => button.textContent === 'Sign in',
    )
    expect(signIn?.className).toContain('bg-brand')
    expect(signIn?.className).toContain('hover:bg-brand-deep')
    expect(signIn?.className).toContain('rounded-none')
    view.cleanup()
  })

  it('keeps the listing card on the style board', async () => {
    const view = await mount(
      createElement(ListingCard, {
        href: '/featured',
        imageUrl: '/direction-photo.svg',
        imageAlt: 'Commercial property',
        kind: 'sale',
        price: 1250000,
        street: '201 N Brand Blvd',
        cityLine: 'Glendale, CA 91203',
        propertyType: 'Office',
      }),
    )
    const card = view.container.querySelector('article')
    expect(card?.className).toContain('border-line')
    expect(card?.className).toContain('bg-white')
    expect(card?.querySelector('.bg-brand')?.className).toContain('text-white')
    expect(view.container.textContent).toContain('$1,250,000')
    const contact = [...view.container.querySelectorAll('button')].find(
      (button) => button.textContent === 'Contact',
    )
    expect(contact?.className).toContain('text-accent')
    const save = view.container.querySelector('button[aria-label="Save listing"]')
    expect(save?.className).toContain('text-brand')
    view.cleanup()
  })
})
