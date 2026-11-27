import React from 'react'

import type { AccountBillingStatus } from '@/lib/accountBilling'
import { brokerBillingStates } from '@/lib/billingState'
import { billingStateCopy } from '@/lib/billingStateCopy'
import { billingStateLayout } from '@/lib/billingStateLayout'

export function BillingStates({ status }: { status: AccountBillingStatus | null }) {
  return (
    <section className={billingStateLayout.frame}>
      <div className="mx-auto w-full max-w-5xl">
        <h2 className="m-0 text-xl font-bold text-ink">Subscription</h2>
        {status === 'comped' ? <p className="m-0 mt-4 text-base font-bold text-ink">Comped. No charge is made.</p> : null}
        <div className={`mt-8 ${billingStateLayout.phone} ${billingStateLayout.desktop}`}>
          {brokerBillingStates.map((state) => (
            <article key={state} className="rounded-2xl border border-line bg-white p-6">
              <h3 className="m-0 text-xl font-bold text-ink">{billingStateCopy[state].label}</h3>
              <p className="m-0 mt-3 text-base font-medium text-ink">{billingStateCopy[state].detail}</p>
              {status === state ? <p className="m-0 mt-4 text-sm font-bold text-ink">Current</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
