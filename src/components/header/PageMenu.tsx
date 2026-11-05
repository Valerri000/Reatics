'use client'

import Link from 'next/link'
import React from 'react'

import { CloseIcon } from '@/components/icons'
import { PhoneNumber } from '@/components/PhoneNumber'
import { Wordmark } from '@/components/Wordmark'
import { menuLinks } from '@/lib/navigation'

type PageMenuProps = {
  open: boolean
  signedIn: boolean
  showAddListing: boolean
  accountItems: { href: string; label: string }[]
  onClose: () => void
  onAddListing: () => void
  onSignOut: () => void
}

const rowClass = 'flex h-11 w-full items-center text-left text-base font-medium text-ink hover:text-brand'

export function PageMenu({
  open,
  signedIn,
  showAddListing,
  accountItems,
  onClose,
  onAddListing,
  onSignOut,
}: PageMenuProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 bg-ink/50">
      <button className="absolute inset-0" aria-label="Close menu" onClick={onClose} />
      <aside className="relative flex h-full w-full max-w-sm flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <Wordmark />
          <button className="text-slate hover:text-ink" aria-label="Close menu" onClick={onClose}>
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="grid gap-3">
            {showAddListing ? (
              <button
                className="flex h-12 items-center justify-center rounded-xl bg-brand text-base font-bold text-white hover:bg-brand-deep"
                onClick={onAddListing}
              >
                Add a Listing
              </button>
            ) : null}
            <Link
              className="flex h-12 items-center justify-center rounded-xl border border-brand text-base font-bold text-brand"
              href="/brokers"
              onClick={onClose}
            >
              Find a broker
            </Link>
          </div>
          {signedIn ? (
            <div className="mt-8">
              {accountItems.map((item) => (
                <Link className={rowClass} href={item.href} key={item.href} onClick={onClose}>
                  {item.label}
                </Link>
              ))}
              <button className={`${rowClass} text-slate`} onClick={onSignOut}>
                Sign out
              </button>
            </div>
          ) : null}
          <p className="mb-3 mt-8 text-xs font-bold uppercase tracking-widest text-gray">Main menu</p>
          {menuLinks.map((item) => (
            <Link className={rowClass} href={item.href} key={item.href} onClick={onClose}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="border-t border-line bg-mist px-6 py-5">
          <PhoneNumber />
        </div>
      </aside>
    </div>
  )
}
