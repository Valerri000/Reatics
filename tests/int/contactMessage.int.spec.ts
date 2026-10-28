import { describe, expect, it } from 'vitest'

import { contactErrors, contactPayload, contactReady } from '@/lib/contactMessage'

const message = {
  name: 'Avery Lane',
  email: 'avery@example.com',
  message: 'I am looking for an office in Glendale.',
}

describe('contact message', () => {
  it('requires a name, an email, and a message', () => {
    expect(contactReady(message)).toBe(true)
    expect(contactPayload(message)).toEqual(message)
    expect(contactErrors({ name: '  ', email: '', message: '' })).toEqual({
      name: 'Enter your name.',
      email: 'Enter your email address.',
      message: 'Enter your message.',
    })
    expect(contactErrors({ ...message, email: 'avery' }).email).toBe('Enter a valid email address.')
  })
})
