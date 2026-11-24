import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it } from 'vitest'

import { RoleView } from '@/components/auth/RoleView'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

describe('signup role choice', () => {
  it('shows the five paths and continues with broker and owner', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root: Root = createRoot(container)
    let chosen = ''
    await act(async () => {
      root.render(
        createElement(RoleView, {
          onContinue: (role: string) => {
            chosen = role
          },
          onSignIn: () => {},
        }),
      )
    })
    expect(container.textContent).toContain('Space seeker')
    expect(container.textContent).toContain('Broker')
    expect(container.textContent).toContain('Owner with listings')
    expect(container.textContent).toContain('Broker and owner')
    expect(container.textContent).toContain('Coworking provider')
    const card = [...container.querySelectorAll('button')].find((button) => button.textContent?.includes('Broker and owner'))
    await act(async () => {
      card?.click()
    })
    expect(chosen).toBe('broker-owner')
    await act(async () => root.unmount())
    container.remove()
  })
})
