import type { BrokerBillingState } from '@/lib/billingState'

export const billingStateCopy: Record<BrokerBillingState, { label: string; detail: string }> = {
  active: {
    label: 'Active',
    detail: 'Your listings stay in search, on the map, and on your public page.',
  },
  past_due: {
    label: 'Past due',
    detail: 'Your listings stay visible while payment retries continue.',
  },
  canceled: {
    label: 'Canceled',
    detail: 'Your listings are off search, the map, your public page, and the sitemap. The listing address still opens.',
  },
}
