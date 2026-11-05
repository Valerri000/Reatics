import React from 'react'

type WordmarkProps = {
  tone?: 'brand' | 'white'
}

export function Wordmark({ tone = 'brand' }: WordmarkProps) {
  const color = tone === 'white' ? 'text-white' : 'text-brand'

  return (
    <span className={`text-2xl font-bold uppercase leading-none tracking-tight ${color}`}>
      Reatics
    </span>
  )
}
