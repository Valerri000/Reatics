import React from 'react'

import { portalCopy } from '@/lib/portalCopy'
import type { Receipt } from '@/lib/receipts'

export function ReceiptList({ state, receipts }: { state: 'empty' | 'error' | 'ready'; receipts: Receipt[] }) {
  return (
    <article className="rounded-2xl border border-line bg-white p-6">
      <h2 className="m-0 text-xl font-bold text-ink">Receipts</h2>
      {state === 'error' ? <p className="m-0 mt-3 text-base font-bold text-ink">{portalCopy.receiptError}</p> : null}
      {state === 'empty' ? <p className="m-0 mt-3 text-base font-medium text-ink">{portalCopy.emptyReceipts}</p> : null}
      {state === 'ready' ? (
        <ul className="m-0 mt-3 list-none p-0">
          {receipts.map((receipt) => (
            <li key={receipt.id} className="text-base font-medium text-ink">
              {receipt.id}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}
