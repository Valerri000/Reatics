import React from 'react'

type WordmarkProps = {
  tone?: 'brand' | 'white' | 'red'
}

export function Wordmark({ tone = 'brand' }: WordmarkProps) {
  const color = tone === 'white' ? 'text-white' : tone === 'red' ? 'text-red-600' : 'text-brand'

  return (
    <span className={`text-2xl font-bold uppercase leading-none tracking-tight ${color}`}>
      Reatics
    </span>
  )
}
