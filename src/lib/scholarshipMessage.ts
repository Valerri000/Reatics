import { contactErrors, type ContactInput } from '@/lib/contactMessage'

export type ScholarshipInput = ContactInput & {
  school: string
  note: string
}

export type ScholarshipErrors = {
  name?: string
  email?: string
  school?: string
  note?: string
}

export function scholarshipErrors(input: ScholarshipInput): ScholarshipErrors {
  const messageErrors = contactErrors({
    name: input.name,
    email: input.email,
    message: input.note,
  })
  const errors: ScholarshipErrors = {}
  if (messageErrors.name) errors.name = messageErrors.name
  if (messageErrors.email) errors.email = messageErrors.email
  if (messageErrors.message) errors.note = messageErrors.message
  if (!input.school.trim()) errors.school = 'Enter your school.'
  return errors
}

export function scholarshipReady(input: ScholarshipInput) {
  const errors = scholarshipErrors(input)
  return !errors.name && !errors.email && !errors.school && !errors.note
}

export function scholarshipMessage(input: ScholarshipInput) {
  return `School: ${input.school.trim()}\n\n${input.note.trim()}`
}
