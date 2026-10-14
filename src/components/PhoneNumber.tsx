import React from 'react'

type PhoneNumberProps = {
  tone?: 'brand' | 'white'
  size?: 'md' | 'lg'
  className?: string
}

export function PhoneNumber({ tone = 'brand', size = 'lg', className = '' }: PhoneNumberProps) {
  const color = tone === 'white' ? 'text-white' : 'text-brand'
  const sizeClass = size === 'md' ? 'text-base' : 'text-[20px]'

  return (
    <a
      className={`${sizeClass} font-bold hover:underline ${color} ${className}`}
      href="tel:18885189168"
    >
      1-888-518-9168
    </a>
  )
}
