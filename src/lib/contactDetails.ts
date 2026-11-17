export const contactAddress = ['16200 Ventura Blvd. Suite 428', 'Encino, CA 91436'] as const

export const contactPhone = '1-888-518-9168'

export function showsContactDetails(slug: string) {
  return slug === 'contact'
}
