import React from 'react'

type WordmarkProps = {
  tone?: 'brand' | 'white'
}

export function Wordmark({ tone = 'brand' }: WordmarkProps) {
  const color = tone === 'white' ? 'text-white' : 'text-brand'

  return (
    <span className={`text-[24px] font-extrabold leading-none md:text-[32px] ${color}`}>
      Reatics
    </span>
  )
}
