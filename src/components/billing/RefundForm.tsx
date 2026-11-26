'use client'

import React, { useState } from 'react'

import { issueRefund } from '@/lib/issueRefund'
import { refundCopy } from '@/lib/refundCopy'

export function RefundForm({ initial }: { initial: string }) {
  const [chargeId, setChargeId] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState(initial)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    const cents = Number(amount)
    const result = await issueRefund(chargeId, cents)
    setMessage(result.message)
  }

  return (
    <form onSubmit={submit} className="bg-sand px-inset-phone pb-10 md:px-inset-tablet xl:px-inset-desktop">
      <div className="mx-auto grid w-full max-w-3xl gap-4 rounded-2xl border border-line bg-white p-6">
        <label className="text-sm font-bold text-ink">
          {refundCopy.charge}
          <input
            value={chargeId}
            onChange={(event) => setChargeId(event.target.value)}
            className="mt-2 h-12 w-full rounded-lg border border-line px-4 text-base font-medium text-ink"
          />
        </label>
        <label className="text-sm font-bold text-ink">
          {refundCopy.amount}
          <input
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            inputMode="numeric"
            className="mt-2 h-12 w-full rounded-lg border border-line px-4 text-base font-medium text-ink"
          />
        </label>
        <button type="submit" className="inline-flex h-12 items-center justify-center rounded-lg bg-brand px-6 text-base font-bold">
          <span className="text-white">{refundCopy.submit}</span>
        </button>
        {message ? <p className="m-0 text-base font-bold text-ink">{message}</p> : null}
      </div>
    </form>
  )
}
