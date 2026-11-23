import { customerId, subscriptionId, type StripeSession } from '@/lib/stripeCheckout'
import type { SubscriptionStatus } from '@/lib/subscriptionRecord'

export function returnState(result: string) {
  if (result === 'success') return 'success' as const
  if (result === 'cancel') return 'failure' as const
  return 'error' as const
}

export function statusFromStripe(session: StripeSession): SubscriptionStatus {
  if (
    session.status === 'complete' &&
    (session.payment_status === 'paid' || session.payment_status === 'no_payment_required')
  ) {
    return 'active'
  }
  if (session.status === 'expired') return 'canceled'
  return 'incomplete'
}

export function referenceId(session: StripeSession) {
  const value = Number(session.client_reference_id)
  if (!Number.isInteger(value) || value <= 0) return null
  return value
}

export function applyCheckoutSession(session: StripeSession, result: string) {
  const known = returnState(result)
  const status = known === 'error' ? 'none' : statusFromStripe(session)
  const state: 'success' | 'failure' | 'error' =
    known === 'error' ? 'error' : status === 'active' ? 'success' : 'failure'
  return {
    state,
    status,
    chargeAgain: false as const,
    planId: session.metadata?.plan_id || '',
    userId: referenceId(session),
    customerId: customerId(session),
    subscriptionId: subscriptionId(session),
    sessionId: session.id || '',
  }
}
