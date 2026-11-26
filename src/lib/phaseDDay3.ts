import { accountBillingStatuses } from '@/lib/accountBilling'
import { brokerBillingStates } from '@/lib/billingState'
import { graceNotice } from '@/lib/graceNotice'
import { unavailableListing } from '@/lib/listingPage'
import { listingLeftPublic } from '@/lib/listingVisibility'

export function phaseDDay3Check() {
  const notice = graceNotice('past_due')
  return {
    statuses: [...accountBillingStatuses],
    brokerStates: [...brokerBillingStates],
    canceledHidden: listingLeftPublic({ kind: 'lease', availability: 'available', subscriptionStatus: 'canceled' }),
    pastDueVisible: !listingLeftPublic({ kind: 'lease', availability: 'available', subscriptionStatus: 'past_due' }),
    compedVisible: !listingLeftPublic({ kind: 'lease', availability: 'available', subscriptionStatus: 'comped' }),
    activeVisible: !listingLeftPublic({ kind: 'lease', availability: 'available', subscriptionStatus: 'active' }),
    coworkingExempt: !listingLeftPublic({
      kind: 'coworking',
      availability: 'available',
      subscriptionStatus: 'canceled',
      verified: true,
      published: true,
    }),
    coworkingRevoked: listingLeftPublic({
      kind: 'coworking',
      availability: 'available',
      verified: false,
      published: true,
    }),
    samePage: unavailableListing,
    graceStored: notice?.sent === false && notice.status === 'stored',
  }
}
