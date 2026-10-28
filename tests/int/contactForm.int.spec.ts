import { createRoot, type Root } from 'react-dom/client'
import { act, createElement, type ComponentProps } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { ContactFormPanel } from '@/components/contact/ContactFormPanel'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const values = { name: '', email: '', message: '' }

async function render(props: Partial<ComponentProps<typeof ContactFormPanel>> = {}) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root: Root = createRoot(container)
  await act(async () => {
    root.render(
      createElement(ContactFormPanel, {
        sent: false,
        pending: false,
        values,
        errors: {},
        onChange: vi.fn(),
        onSubmit: vi.fn(),
        ...props,
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

describe('contact form states', () => {
  it('shows the form empty', async () => {
    const view = await render()
    expect(view.container.querySelector('input[name="name"]')).not.toBeNull()
    expect(view.container.querySelector('input[name="email"]')).not.toBeNull()
    expect(view.container.querySelector('textarea[name="message"]')).not.toBeNull()
    expect(view.container.textContent).not.toContain('Enter your name.')
    expect(view.container.textContent).not.toContain('Your message has been sent.')
    view.cleanup()
  })

  it('shows an error on each empty field', async () => {
    const view = await render({
      errors: {
        name: 'Enter your name.',
        email: 'Enter your email address.',
        message: 'Enter your message.',
      },
    })
    expect(view.container.textContent).toContain('Enter your name.')
    expect(view.container.textContent).toContain('Enter your email address.')
    expect(view.container.textContent).toContain('Enter your message.')
    view.cleanup()
  })

  it('shows a successful send', async () => {
    const view = await render({ sent: true })
    expect(view.container.textContent).toContain('Your message has been sent.')
    expect(view.container.querySelector('form')).toBeNull()
    view.cleanup()
  })
})
