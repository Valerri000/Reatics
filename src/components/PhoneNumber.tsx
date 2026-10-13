import React from 'react'

type PhoneNumberProps = {
  tone?: 'brand' | 'white'
  className?: string
}

export function PhoneNumber({ tone = 'brand', className = '' }: PhoneNumberProps) {
  const color = tone === 'white' ? 'text-white' : 'text-brand'

  return (
    <a
      className={`text-[20px] font-bold hover:underline ${color} ${className}`}
      href="tel:18885189168"
    >
      1-888-518-9168
    </a>
  )
}
