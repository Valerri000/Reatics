import { createRoot, type Root } from 'react-dom/client'
import { act, createElement, type ComponentProps } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Billing } from '@/collections/Billing'
import { Listings } from '@/collections/Listings'
import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { Users } from '@/collections/Users'
import { ListingCard } from '@/components/listing/ListingCard'
import { formatListingPrice, formatRate } from '@/lib/listingPrice'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

function allow(access: unknown, user: unknown) {
  if (typeof access !== 'function') throw new Error('missing access')
  return access({ req: { user } })
}

const seeker = { id: 4, adminRole: null }
const other = { id: 9, adminRole: null }
const owner = { id: 1, adminRole: 'owner' }
const editor = { id: 2, adminRole: 'content-manager' }
const moderator = { id: 3, adminRole: 'moderator' }

describe('admin roles', () => {
  it('keeps a member on their own account record', () => {
    expect(allow(Users.access?.read, seeker)).toEqual({ id: { equals: 4 } })
    expect(allow(Users.access?.read, other)).toEqual({ id: { equals: 9 } })
    expect(allow(Users.access?.update, seeker)).toEqual({ id: { equals: 4 } })
    expect(allow(Users.access?.read, editor)).toEqual({ id: { equals: 2 } })
    expect(allow(Users.access?.delete, seeker)).toBe(false)
  })

  it('lets a moderator manage users and keeps billing with the owner', () => {
    expect(allow(Users.access?.read, moderator)).toBe(true)
    expect(allow(Users.access?.delete, moderator)).toBe(true)
    expect(allow(Users.access?.delete, editor)).toBe(false)
    expect(allow(Users.access?.admin, seeker)).toBe(false)
    expect(allow(Users.access?.admin, owner)).toBe(true)
    expect(allow(Users.access?.admin, editor)).toBe(true)
    expect(allow(Users.access?.admin, moderator)).toBe(true)
    expect(allow(Pages.access?.create, editor)).toBe(true)
    expect(allow(Pages.access?.create, moderator)).toBe(false)
    expect(allow(Pages.access?.update, owner)).toBe(true)
    expect(allow(Listings.access?.create, moderator)).toBe(true)
    expect(allow(Listings.access?.update, editor)).toBe(false)
    expect(allow(Listings.access?.read, owner)).toBe(true)
    expect(allow(Billing.access?.create, owner)).toBe(true)
    expect(allow(Billing.access?.read, moderator)).toBe(false)
    expect(allow(Billing.access?.delete, editor)).toBe(false)
    expect(allow(Media.access?.create, editor)).toBe(true)
    expect(allow(Media.access?.delete, seeker)).toBe(false)
  })
})

async function mount(props: ComponentProps<typeof ListingCard>) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root: Root = createRoot(container)
  await act(async () => {
    root.render(createElement(ListingCard, props))
  })
  return {
    container,
    async render(next: ComponentProps<typeof ListingCard>) {
      await act(async () => {
        root.render(createElement(ListingCard, next))
      })
    },
    cleanup() {
      act(() => root.unmount())
      container.remove()
    },
  }
}

function click(container: HTMLElement, selector: string) {
  const node = container.querySelector(selector)
  if (!node) throw new Error(`missing ${selector}`)
  act(() => {
    node.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
}

describe('listing card', () => {
  it('formats sale, lease, and missing prices', () => {
    expect(formatListingPrice('sale', 1250000)).toBe('$1,250,000')
    expect(formatListingPrice('lease', 4500)).toBe('$4,500/mo')
    expect(formatListingPrice('coworking', 450)).toBe('$450/mo')
    expect(formatListingPrice('sale', null)).toBe('Price on request.')
    expect(formatRate(32, 'year')).toBe('$32/sq ft/year')
    expect(formatRate(32, 'month')).toBe('$2.67/sq ft/mo')
  })

  it('shows the office number on a coworking card and contact on a sale card', async () => {
    const onSignIn = vi.fn()
    const view = await mount({
      href: '/listings/market',
      imageUrl: '/photo.jpg',
      imageAlt: 'Market street',
      kind: 'coworking',
      price: 450,
      rate: 32,
      street: '201 N Brand',
      cityLine: 'Glendale, CA 91203',
      propertyType: 'Desk',
      onSignIn,
    })

    const phone = view.container.querySelector('a[href="tel:18885189168"]')
    expect(phone?.textContent).toBe('1-888-518-9168')
    expect(view.container.textContent).not.toContain('Contact')
    expect(
      view.container.querySelector('a[href="/listings/market#availabilities"]')?.textContent,
    ).toBe('Availabilities')
    click(view.container, 'button')
    expect(view.container.textContent).toContain('$2.67/sq ft/mo')

    await view.render({
      href: '/listings/market',
      imageUrl: '/photo.jpg',
      imageAlt: 'Market street',
      kind: 'sale',
      price: null,
      street: '201 N Brand',
      cityLine: 'Glendale, CA 91203',
      propertyType: 'Office',
      highlighted: true,
      onSignIn,
    })

    expect(view.container.textContent).toContain('Price on request.')
    expect(view.container.textContent).not.toContain('Availabilities')
    expect(view.container.querySelector('article')?.className).toContain('border-brand')
    click(view.container, 'button[aria-label="Save listing"]')
    expect(onSignIn).toHaveBeenCalledOnce()
    const contact = Array.from(view.container.querySelectorAll('button')).find(
      (button) => button.textContent === 'Contact',
    )
    if (!contact) throw new Error('missing contact')
    act(() => {
      contact.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    const send = Array.from(view.container.querySelectorAll('button')).find(
      (button) => button.textContent === 'Send',
    )
    if (!send) throw new Error('missing send')
    act(() => {
      send.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(view.container.textContent).toContain('Enter your name.')
    expect(view.container.textContent).toContain('Enter your email address.')
    expect(view.container.textContent).toContain('Enter your message.')
    view.cleanup()
  })
})
