'use client'

import React, { useEffect, useState } from 'react'

import { heroSlides } from '@/lib/homeImages'

const slideMs = 10000

export function HeroBackdrop() {
  const [index, setIndex] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const motion = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (motion?.matches) return
    const timer = window.setInterval(() => {
      setFading(true)
      setIndex((current) => (current + 1) % heroSlides.length)
    }, slideMs)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      {heroSlides.map((src, item) => (
        <img
          key={src}
          src={src}
          alt=""
          className={item === index ? `hero-banner-photo is-shown${fading ? ' is-fading' : ''}` : 'hero-banner-photo'}
        />
      ))}
    </div>
  )
}
