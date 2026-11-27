'use client'

import React, { useState } from 'react'

import { portalCopy } from '@/lib/portalCopy'
import { openCustomerPortal } from '@/lib/openCustomerPortal'

export function PortalButton() {
  const [message, setMessage] = useState('')

  async function open() {
    const result = await openCustomerPortal()
    if (result.ok) {
      window.location.href = result.url
      return
    }
    setMessage(result.message)
  }

  return (
    <div className="bg-sand px-inset-phone pb-10 md:px-inset-tablet xl:px-inset-desktop">
      <div className="mx-auto w-full max-w-5xl">
        <button
          type="button"
          onClick={open}
          className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-brand px-6 text-base font-bold md:w-auto"
        >
          <span className="text-white">{portalCopy.open}</span>
        </button>
        {message ? <p className="m-0 mt-4 text-base font-bold text-ink">{message}</p> : null}
      </div>
    </div>
  )
}
