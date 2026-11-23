import { planById } from '@/lib/plans'
import { applyCheckoutSession, returnState } from '@/lib/checkoutReturn'
import { saveSubscription } from '@/lib/saveSubscription'
import { getCheckout } from '@/lib/stripeCheckout'
import { subscriptionRecord, type SubscriptionRecord } from '@/lib/subscriptionRecord'

export type CheckoutView = {
  state: 'success' | 'failure' | 'error'
  stored: boolean
  chargeAgain: false
}

export async function readCheckoutReturn(
  input: { result: string; sessionId: string },
  deps?: {
    secret?: string
    fetchImpl?: typeof fetch
    save?: (record: SubscriptionRecord) => Promise<{ stored: boolean }>
  },
): Promise<CheckoutView> {
  const known = returnState(input.result)
  if (known === 'error' || !input.sessionId) {
    return {
      state: known === 'failure' ? ('failure' as const) : known === 'success' ? ('error' as const) : ('error' as const),
      stored: false,
      chargeAgain: false as const,
    }
  }
  const secret = deps?.secret ?? process.env.STRIPE_SECRET_KEY ?? ''
  const loaded = await getCheckout(secret, input.sessionId, deps?.fetchImpl)
  if (!loaded.ok || !loaded.session) {
    return {
      state: known === 'failure' ? ('failure' as const) : ('error' as const),
      stored: false,
      chargeAgain: false as const,
    }
  }
  const applied = applyCheckoutSession(loaded.session, input.result)
  const plan = planById(applied.planId)
  const record =
    applied.userId && (applied.planId === 'broker' || applied.planId === 'owner')
      ? subscriptionRecord({
          userId: applied.userId,
          planId: applied.planId,
          status: applied.status,
          amountCents: plan?.cents ?? 0,
          stripeCustomerId: applied.customerId,
          stripeSubscriptionId: applied.subscriptionId,
          stripeCheckoutSessionId: applied.sessionId,
        })
      : null
  if (!record) return { state: applied.state, stored: false, chargeAgain: false as const }
  try {
    const save = deps?.save ?? saveSubscription
    await save(record)
    return { state: applied.state, stored: true, chargeAgain: false as const }
  } catch {
    return { state: applied.state, stored: false, chargeAgain: false as const }
  }
}
