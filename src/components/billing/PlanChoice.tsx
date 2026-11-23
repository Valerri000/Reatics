'use client'

import React, { useState } from 'react'

import type { AccountUser } from '@/lib/account'
import { plans } from '@/lib/plans'
import { planChoiceCopy } from '@/lib/planChoiceCopy'
import { planChoiceLayout } from '@/lib/planChoiceLayout'
import type { PlanChoiceState } from '@/lib/planChoiceState'
import { priceLabel } from '@/lib/planPrice'

export function PlanChoice({
  user,
  state,
  onSignIn,
  onPay,
}: {
  user: AccountUser | null
  state: PlanChoiceState
  onSignIn: () => void
  onPay: (planId: string) => Promise<{ ok: false; message: string } | void>
}) {
  const [error, setError] = useState(state === 'error' ? planChoiceCopy.error : '')
  const [pending, setPending] = useState('')
  const signedIn = state === 'signed-in' || state === 'error'
  const heading =
    state === 'success'
      ? planChoiceCopy.success
      : state === 'signed-out'
        ? planChoiceCopy.signedOut
        : planChoiceCopy.signedIn

  async function pay(planId: string) {
    setPending(planId)
    const result = await onPay(planId)
    setPending('')
    if (result && result.ok === false) setError(result.message)
  }

  return (
    <section className={planChoiceLayout.frame}>
      <div className="mx-auto w-full max-w-5xl">
        <p className="m-0 text-base font-semibold text-ink">{heading}</p>
        {user ? <p className="m-0 mt-2 text-sm font-medium text-slate">{user.email}</p> : null}
        {error ? <p className="m-0 mt-4 text-base font-bold text-ink">{error}</p> : null}
        <div className={`mt-8 ${planChoiceLayout.grid}`}>
          {plans.map((plan) => (
            <article key={plan.id} className="rounded-2xl border border-line bg-white p-6">
              <h2 className="m-0 text-xl font-bold text-ink">{plan.name}</h2>
              <p className="m-0 mt-2 text-base font-semibold text-ink">{priceLabel(plan)}</p>
              {state === 'success' ? null : plan.checkout && signedIn ? (
                <button
                  type="button"
                  disabled={pending === plan.id}
                  onClick={() => pay(plan.id)}
                  className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-lg bg-brand px-6 text-base font-bold disabled:bg-line md:w-auto"
                >
                  <span className="text-white">{planChoiceCopy.pay}</span>
                </button>
              ) : plan.checkout ? (
                <button
                  type="button"
                  onClick={onSignIn}
                  className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-lg bg-brand px-6 text-base font-bold md:w-auto"
                >
                  <span className="text-white">{planChoiceCopy.signIn}</span>
                </button>
              ) : (
                <p className="m-0 mt-6 text-base font-semibold text-ink">{planChoiceCopy.free}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
