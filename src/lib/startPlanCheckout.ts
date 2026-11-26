'use server'

import { redirect } from 'next/navigation'

import { checkoutForm, checkoutOrigin } from '@/lib/checkoutForm'
import { compedSkipsCharge } from '@/lib/compedPlan'
import { currentAccount } from '@/lib/currentAccount'
import { planChoiceCopy } from '@/lib/planChoiceCopy'
import { postCheckout } from '@/lib/stripeCheckout'

export async function startPlanCheckout(planId: string, coupon = '') {
  const user = await currentAccount()
  if (!user) return { ok: false as const, message: planChoiceCopy.signedOut }
  if (compedSkipsCharge(user.subscriptionStatus)) {
    return { ok: false as const, message: 'This account is comped. No charge is made.' }
  }
  const built = checkoutForm({
    planId,
    userId: user.id,
    email: user.email,
    origin: checkoutOrigin({ NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL }),
    coupon,
  })
  if (!built.ok) return { ok: false as const, message: built.message }
  const created = await postCheckout(process.env.STRIPE_SECRET_KEY || '', built.body)
  if (!created.ok) return { ok: false as const, message: planChoiceCopy.error }
  redirect(created.url)
}
