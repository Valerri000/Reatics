export type ContactInput = {
  name: string
  email: string
  message: string
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function contactErrors(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {}
  if (!input.name.trim()) errors.name = 'Enter your name.'
  const email = input.email.trim()
  if (!email) errors.email = 'Enter your email address.'
  else if (!emailPattern.test(email)) errors.email = 'Enter a valid email address.'
  if (!input.message.trim()) errors.message = 'Enter your message.'
  return errors
}

export function contactPayload(input: ContactInput) {
  return {
    name: input.name.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
  }
}

export function contactReady(input: ContactInput) {
  const errors = contactErrors(input)
  return !errors.name && !errors.email && !errors.message
}
