import { accountBillingStatus } from '@/lib/accountBilling'

export function listingAccountFields(
  account: { subscriptionStatus?: string | null; verified?: boolean | null } | number | null | undefined,
) {
  if (!account || typeof account !== 'object') {
    return { subscriptionStatus: null, verified: null }
  }
  return {
    subscriptionStatus: accountBillingStatus(account.subscriptionStatus),
    verified: typeof account.verified === 'boolean' ? account.verified : null,
  }
}
