export const contactAddress = ['201 N Brand Suite 200', 'Glendale CA, 91203'] as const

export const contactPhone = '1-888-518-9168'

export function showsContactDetails(slug: string) {
  return slug === 'contact'
}
