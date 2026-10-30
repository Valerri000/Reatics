import { stagingUrl } from '@/lib/milestone'
import { publicPageSlugs } from '@/lib/publicPages'
import { stagingAccounts } from '@/lib/stagingAccounts'

export const phaseBHost = stagingUrl

export const phaseBAdminPath = '/admin'

export const phaseBPublicPaths = publicPageSlugs.map((slug) => `/${slug}`)

export const phaseBStoryPaths = ['/blog', '/glossary'] as const

export const phaseBPlacePaths = ['/glendale', '/office'] as const

export const phaseBReviewEmails = stagingAccounts.map((account) => account.email)

export function phaseBReviewHost(url: string) {
  return url === phaseBHost
}
