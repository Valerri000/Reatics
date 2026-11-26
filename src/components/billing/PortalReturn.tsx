import React from 'react'

import { ReceiptList } from '@/components/billing/ReceiptList'
import { portalCopy } from '@/lib/portalCopy'
import { portalLayout } from '@/lib/portalLayout'

export function PortalReturn({ state }: { state: 'return' | 'error' }) {
  return (
    <section className={portalLayout.frame}>
      <div className={`mx-auto grid w-full max-w-5xl ${portalLayout.phone} ${portalLayout.desktop}`}>
        <article className="rounded-2xl border border-line bg-white p-6">
          <h2 className="m-0 text-xl font-bold text-ink">Customer portal</h2>
          <p className="m-0 mt-3 text-base font-bold text-ink">{state === 'error' ? portalCopy.error : portalCopy.return}</p>
          <p className="m-0 mt-3 text-base font-medium text-ink">{portalCopy.purpose}</p>
        </article>
        <ReceiptList state={state === 'error' ? 'error' : 'empty'} receipts={[]} />
      </div>
    </section>
  )
}
