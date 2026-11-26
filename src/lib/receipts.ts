export type Receipt = {
  id: string
  amountCents: number
}

export function publicReceipts(receipts: Receipt[]) {
  return receipts.filter(
    (receipt) => /^in_[A-Za-z0-9]+$/.test(receipt.id) && Number.isInteger(receipt.amountCents) && receipt.amountCents >= 0,
  )
}

export function receiptState(input: { error?: boolean; receipts: Receipt[] }) {
  if (input.error) return 'error' as const
  if (publicReceipts(input.receipts).length === 0) return 'empty' as const
  return 'ready' as const
}
