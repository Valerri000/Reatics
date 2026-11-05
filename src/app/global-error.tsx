'use client'

export default function GlobalError({ reset }: { reset?: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#f8fafc', color: '#0f172a', fontFamily: 'Inter, sans-serif' }}>
        <main style={{ padding: '64px 16px' }}>
          <h1 style={{ margin: 0, fontSize: '28px', lineHeight: '36px' }}>Something went wrong</h1>
          <p style={{ marginTop: '16px', fontWeight: 300 }}>Please try again.</p>
          {reset ? (
            <button
              type="button"
              onClick={reset}
              style={{
                marginTop: '24px',
                height: '48px',
                padding: '0 24px',
                border: 0,
                borderRadius: '12px',
                background: '#2563eb',
                color: '#ffffff',
                fontWeight: 700,
              }}
            >
              Try again
            </button>
          ) : null}
        </main>
      </body>
    </html>
  )
}
