'use client'

export default function PublicError({ reset }: { reset?: () => void }) {
  return (
    <main>
      <h1>Something went wrong</h1>
      <p>Please try again.</p>
      {reset ? (
        <button type="button" onClick={reset}>
          Try again
        </button>
      ) : null}
    </main>
  )
}
