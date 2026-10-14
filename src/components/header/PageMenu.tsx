'use client'

import Link from 'next/link'
import React from 'react'

import { CloseIcon } from '@/components/icons'
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

const rowClass = 'flex h-12 w-full items-center px-4 text-left text-lg font-bold text-ink'

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
    <div className="fixed inset-0 z-40">
      <button className="absolute inset-0 bg-ink/45" aria-label="Close menu" onClick={onClose} />
      <aside className="relative flex h-full w-full flex-col overflow-y-auto bg-white md:w-80">
        <button
          className="flex h-[54px] w-[54px] items-center justify-center text-ink"
          aria-label="Close menu"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        <div className="md:hidden">
          {showAddListing ? (
            <button className={`${rowClass} text-accent`} onClick={onAddListing}>
              Add a Listing
            </button>
          ) : null}
          {!signedIn ? (
            <Link className={`${rowClass} text-accent`} href="/brokers" onClick={onClose}>
              Find a broker
            </Link>
          ) : null}
          {signedIn
            ? accountItems.map((item) => (
                <Link className={rowClass} href={item.href} key={item.href} onClick={onClose}>
                  {item.label}
                </Link>
              ))
            : null}
          {signedIn ? (
            <button className={`${rowClass} text-slate`} onClick={onSignOut}>
              Sign out
            </button>
          ) : null}
          {signedIn ? <div className="mx-4 border-t border-line" /> : null}
        </div>
        {menuLinks.map((item) => (
          <Link className={rowClass} href={item.href} key={item.href} onClick={onClose}>
            {item.label}
          </Link>
        ))}
      </aside>
    </div>
  )
}
