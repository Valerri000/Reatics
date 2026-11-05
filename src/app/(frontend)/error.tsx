'use client'

export default function PublicError({ reset }: { reset?: () => void }) {
  return (
    <main className="px-inset-phone py-section-phone md:px-inset-tablet md:py-section xl:px-inset-desktop">
      <h1 className="m-0 text-[28px] font-extrabold leading-9 text-ink xl:text-title">Something went wrong</h1>
      <p className="m-0 mt-4 text-[16px] font-light leading-6 text-ink md:text-body">Please try again.</p>
      {reset ? (
        <button
          type="button"
          className="mt-6 inline-flex h-12 items-center rounded-lg bg-brand px-6 text-base font-bold text-white"
          onClick={reset}
        >
          Try again
        </button>
      ) : null}
    </main>
  )
}
