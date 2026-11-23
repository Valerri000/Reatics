'use server'

import { redirect } from 'next/navigation'

import { checkoutForm, checkoutOrigin } from '@/lib/checkoutForm'
import { currentAccount } from '@/lib/currentAccount'
import { planChoiceCopy } from '@/lib/planChoiceCopy'
import { postCheckout } from '@/lib/stripeCheckout'

export async function startPlanCheckout(planId: string) {
  const user = await currentAccount()
  if (!user) return { ok: false as const, message: planChoiceCopy.signedOut }
  const built = checkoutForm({
    planId,
    userId: user.id,
    email: user.email,
    origin: checkoutOrigin({ NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL }),
  })
  if (!built.ok) return { ok: false as const, message: built.message }
  const created = await postCheckout(process.env.STRIPE_SECRET_KEY || '', built.body)
  if (!created.ok) return { ok: false as const, message: planChoiceCopy.error }
  redirect(created.url)
}
