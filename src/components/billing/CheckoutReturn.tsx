import { planChoiceCopy } from '@/lib/planChoiceCopy'

export function CheckoutReturn({ state }: { state: 'success' | 'failure' | 'error' }) {
  const text =
    state === 'success' ? planChoiceCopy.success : state === 'failure' ? planChoiceCopy.failure : planChoiceCopy.error
  return (
    <section className="bg-sand px-inset-phone py-10 md:px-inset-tablet xl:px-inset-desktop">
      <div className="mx-auto max-w-3xl rounded-2xl border border-line bg-white p-6 md:p-8">
        <p className="m-0 text-base font-bold text-ink">{text}</p>
      </div>
    </section>
  )
}
