import { stagingUrl } from '@/lib/milestone'
import { stagingAccounts } from '@/lib/stagingAccounts'

export const phaseBHost = stagingUrl

export const phaseBAdminPath = '/admin'

export const phaseBReviewEmails = stagingAccounts.map((account) => account.email)

export function phaseBReviewHost(url: string) {
  return url === phaseBHost
}
