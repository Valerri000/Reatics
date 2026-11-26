import React from 'react'

import { refundCopy } from '@/lib/refundCopy'
import { portalLayout } from '@/lib/portalLayout'

export function RefundNotice({ state }: { state: 'recorded' | 'error' | 'ready' }) {
  const text = state === 'recorded' ? refundCopy.recorded : state === 'error' ? refundCopy.error : ''
  return (
    <section className={portalLayout.frame}>
      <div className="mx-auto w-full max-w-3xl rounded-2xl border border-line bg-white p-6">
        <h2 className="m-0 text-xl font-bold text-ink">Refund</h2>
        {text ? <p className="m-0 mt-3 text-base font-bold text-ink">{text}</p> : null}
      </div>
    </section>
  )
}
