'use client'

export default function GlobalError({ reset }: { reset?: () => void }) {
  return (
    <html lang="en">
      <body>
        <h1>Something went wrong</h1>
        <p>Please try again.</p>
        {reset ? (
          <button type="button" onClick={reset}>
            Try again
          </button>
        ) : null}
      </body>
    </html>
  )
}
