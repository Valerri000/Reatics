import { publicPurchaseAllowed } from '@/lib/addonPurchase'
import { planById } from '@/lib/plans'
import { stripeCouponId } from '@/lib/stripeCoupon'

export function checkoutOrigin(env: { NEXT_PUBLIC_SERVER_URL?: string }) {
  const value = (env.NEXT_PUBLIC_SERVER_URL || '').trim().replace(/\/$/, '')
  if (/^https?:\/\/\S+$/.test(value)) return value
  return 'http://localhost:3000'
}

export function checkoutForm(input: { planId: string; userId: number; email: string; origin: string; coupon?: string }) {
  if (!publicPurchaseAllowed(input.planId)) {
    return { ok: false as const, message: 'This plan does not open checkout.' }
  }
  const plan = planById(input.planId)
  if (!plan) return { ok: false as const, message: 'This plan does not open checkout.' }
  const body = new URLSearchParams()
  body.set('mode', 'subscription')
  body.set('customer_email', input.email)
  body.set('client_reference_id', String(input.userId))
  body.set('metadata[plan_id]', plan.id)
  body.set('line_items[0][quantity]', '1')
  body.set('line_items[0][price_data][currency]', 'usd')
  body.set('line_items[0][price_data][unit_amount]', String(plan.cents))
  body.set('line_items[0][price_data][recurring][interval]', 'month')
  body.set('line_items[0][price_data][product_data][name]', plan.name)
  body.set('success_url', `${input.origin}/billing/return?result=success&session_id={CHECKOUT_SESSION_ID}`)
  body.set('cancel_url', `${input.origin}/billing/return?result=cancel&session_id={CHECKOUT_SESSION_ID}`)
  const coupon = stripeCouponId(input.coupon)
  if (coupon) body.set('discounts[0][coupon]', coupon)
  const encoded = body.toString().replaceAll('%7BCHECKOUT_SESSION_ID%7D', '{CHECKOUT_SESSION_ID}')
  return { ok: true as const, body: encoded, planId: plan.id }
}
