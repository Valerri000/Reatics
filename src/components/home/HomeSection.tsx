import React from 'react'

const tones = {
  white: 'bg-white text-ink',
  mist: 'bg-mist text-ink',
  charcoal: 'bg-charcoal text-white',
  deep: 'bg-brand-deep text-white',
} as const

export function HomeSection({
  children,
  tone = 'white',
  id,
}: {
  children: React.ReactNode
  tone?: keyof typeof tones
  id?: string
}) {
  return (
    <section
      id={id}
      className={`${tones[tone]} px-inset-phone py-section-phone md:px-inset-tablet md:py-section xl:px-inset-desktop 2xl:px-inset-wide`}
    >
      {children}
    </section>
  )
}
