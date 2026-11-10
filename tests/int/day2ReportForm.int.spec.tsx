import { createRoot, type Root } from 'react-dom/client'
import { act, createElement } from 'react'
import { describe, expect, it } from 'vitest'

import { ReportFormPanel } from '@/components/listing/ReportFormPanel'
import { reportLogged, type ReportErrors } from '@/lib/listingReport'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const values = { name: '', email: '', errorType: '', description: '' }

async function render(props: { sent?: boolean; errors?: ReportErrors }) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root: Root = createRoot(container)
  await act(async () => {
    root.render(
      createElement(ReportFormPanel, {
        sent: props.sent || false,
        pending: false,
        values,
        errors: props.errors || {},
        onChange: () => undefined,
        onSubmit: (event) => event.preventDefault(),
      }),
    )
  })
  const text = container.textContent || ''
  await act(async () => root.unmount())
  container.remove()
  return text
}

describe('report form', () => {
  it('shows the empty form, an error, and the logged confirmation', async () => {
    const empty = await render({})
    expect(empty).toContain('Name')
    expect(empty).toContain('Email')
    expect(empty).toContain('Error type')
    expect(empty).toContain('Description')
    expect(empty).toContain('Send report')
    expect(empty).not.toContain(reportLogged)
    expect(empty).not.toContain('Enter your name.')

    const invalid = await render({ errors: { name: 'Enter your name.', errorType: 'Choose an error type.' } })
    expect(invalid).toContain('Enter your name.')
    expect(invalid).toContain('Choose an error type.')

    const sent = await render({ sent: true })
    expect(sent).toContain(reportLogged)
    expect(sent).not.toContain('Send report')
  })
})
