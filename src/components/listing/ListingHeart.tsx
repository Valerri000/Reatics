'use client'

import React, { useState } from 'react'

import { HeartIcon } from '@/components/icons'
import { listingHeartClass } from '@/lib/listingHeart'
import { saveHeart } from '@/lib/saveHeart'

export function ListingHeart({
  href,
  signedIn,
  onSignIn,
}: {
  href: string
  signedIn: boolean
  onSignIn: () => void
}) {
  const [saved, setSaved] = useState(false)

  async function press() {
    if (!signedIn) {
      onSignIn()
      return
    }
    const result = await saveHeart(href)
    if (result.ok) setSaved(true)
  }

  return (
    <button
      type="button"
      aria-label={saved ? 'Saved' : 'Save listing'}
      className={`${listingHeartClass} text-brand`}
      onClick={() => {
        void press()
      }}
    >
      <HeartIcon filled={saved} />
    </button>
  )
}
