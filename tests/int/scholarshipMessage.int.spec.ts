import { describe, expect, it } from 'vitest'

import { scholarshipErrors, scholarshipMessage, scholarshipReady } from '@/lib/scholarshipMessage'

const filled = {
  name: 'Ada Student',
  email: 'ada@example.com',
  message: 'I am studying the field.',
  school: 'City College',
  note: 'I am studying the field.',
}

describe('scholarship note', () => {
  it('asks for the name, email, school, and note', () => {
    expect(scholarshipErrors({ name: '', email: '', message: '', school: ' ', note: '' })).toEqual({
      name: 'Enter your name.',
      email: 'Enter your email address.',
      school: 'Enter your school.',
      note: 'Enter your message.',
    })
    expect(scholarshipErrors({ ...filled, email: 'not-an-email' }).email).toBe('Enter a valid email address.')
  })

  it('puts the school on the message that is saved', () => {
    expect(scholarshipReady(filled)).toBe(true)
    expect(scholarshipMessage(filled)).toBe('School: City College\n\nI am studying the field.')
  })
})
