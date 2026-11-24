import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it } from 'vitest'

import { DetailsView } from '@/components/auth/DetailsView'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

async function render(role: 'broker' | 'space-seeker' | 'coworking') {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root: Root = createRoot(container)
  await act(async () => {
    root.render(
      createElement(DetailsView, {
        role,
        onBack: () => {},
        onSignIn: () => {},
        onCreated: () => {},
      }),
    )
  })
  return {
    container,
    unmount: async () => {
      await act(async () => root.unmount())
      container.remove()
    },
  }
}

describe('signup details', () => {
  it('shows the DRE error, hides it for a seeker, and requires the referral', async () => {
    const broker = await render('broker')
    expect(broker.container.textContent).toContain('DRE number')
    await act(async () => {
      broker.container.querySelector('form')?.requestSubmit()
    })
    expect(broker.container.textContent).toContain('Enter your DRE number.')
    await broker.unmount()

    const seeker = await render('space-seeker')
    expect(seeker.container.querySelector('[name="dreNumber"]')).toBeNull()
    await seeker.unmount()

    const provider = await render('coworking')
    expect(provider.container.textContent).toContain('Waiting for the coworking referral wording.')
    expect(provider.container.textContent).toContain('1-888-518-9168')
    await act(async () => {
      provider.container.querySelector('form')?.requestSubmit()
    })
    expect(provider.container.textContent).toContain('The referral agreement is required.')
    await provider.unmount()
  })
})
