import type { SignedStripeEvent } from '@/lib/stripeSignature'

export function acceptsTestEvent(event: { livemode?: boolean } | null) {
  return Boolean(event) && event?.livemode !== true
}

export function webhookAccountStatus(event: SignedStripeEvent) {
  const object = event.data?.object
  const customerValue = object?.customer
  const customerId = typeof customerValue === 'string' ? customerValue : customerValue?.id || ''
  if (!/^cus_[A-Za-z0-9]+$/.test(customerId)) return null
  if (event.type === 'customer.subscription.deleted') return { customerId, status: 'canceled' as const }
  if (event.type === 'invoice.payment_failed') return { customerId, status: 'past_due' as const }
  if (event.type !== 'customer.subscription.updated' && event.type !== 'customer.subscription.created') return null
  if (object?.status === 'active' || object?.status === 'trialing') return { customerId, status: 'active' as const }
  if (object?.status === 'past_due') return { customerId, status: 'past_due' as const }
  if (object?.status === 'canceled' || object?.status === 'unpaid' || object?.status === 'incomplete_expired') {
    return { customerId, status: 'canceled' as const }
  }
  return null
}
