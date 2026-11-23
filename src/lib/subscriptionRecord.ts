export const subscriptionStatuses = ['none', 'incomplete', 'active', 'past_due', 'canceled'] as const

export type SubscriptionStatus = (typeof subscriptionStatuses)[number]

export type SubscriptionRecord = {
  userId: number
  planId: 'broker' | 'owner'
  status: SubscriptionStatus
  amountCents: number
  stripeCustomerId: string
  stripeSubscriptionId: string
  stripeCheckoutSessionId: string
}

export const subscriptionColumns = [
  'userId',
  'planId',
  'status',
  'amountCents',
  'stripeCustomerId',
  'stripeSubscriptionId',
  'stripeCheckoutSessionId',
] as const

const cardKeys = ['card', 'cardNumber', 'card_number', 'pan', 'cvc', 'cvv', 'paymentMethod']

function looksLikeCard(value: string) {
  return /^\d{13,19}$/.test(value.replace(/\s+/g, ''))
}

export function subscriptionRecord(input: SubscriptionRecord) {
  const extra = input as SubscriptionRecord & Record<string, unknown>
  for (const key of Object.keys(extra)) {
    if ((cardKeys as readonly string[]).includes(key)) return null
    if (!(subscriptionColumns as readonly string[]).includes(key)) return null
  }
  if (input.planId !== 'broker' && input.planId !== 'owner') return null
  if (!(subscriptionStatuses as readonly string[]).includes(input.status)) return null
  if (!Number.isInteger(input.userId) || input.userId <= 0) return null
  if (!Number.isInteger(input.amountCents) || input.amountCents < 0) return null
  if (!input.stripeCheckoutSessionId || looksLikeCard(input.stripeCheckoutSessionId)) return null
  if (input.stripeCustomerId && looksLikeCard(input.stripeCustomerId)) return null
  if (input.stripeSubscriptionId && looksLikeCard(input.stripeSubscriptionId)) return null
  return {
    userId: input.userId,
    planId: input.planId,
    status: input.status,
    amountCents: input.amountCents,
    stripeCustomerId: input.stripeCustomerId,
    stripeSubscriptionId: input.stripeSubscriptionId,
    stripeCheckoutSessionId: input.stripeCheckoutSessionId,
  }
}
