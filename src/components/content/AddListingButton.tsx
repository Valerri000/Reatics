'use client'

import React from 'react'

import { useAuth } from '@/components/auth/AuthProvider'
import { canList } from '@/lib/access'

export function AddListingButton({
  className,
  children,
}: {
  className: string
  children: React.ReactNode
}) {
  const auth = useAuth()

  function addListing() {
    if (auth.user && canList(auth.user)) {
      window.location.href = '/account/listings'
      return
    }
    auth.openRegister()
  }

  return (
    <button type="button" className={className} onClick={addListing}>
      {children}
    </button>
  )
}
