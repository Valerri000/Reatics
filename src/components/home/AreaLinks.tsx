import Link from 'next/link'
import React from 'react'

import { HomeSection } from '@/components/home/HomeSection'

export function AreaLinks({ links }: { links: { href: string; label: string }[] }) {
  return (
    <HomeSection id="areas" className="border-t border-line">
      <div className="mx-auto max-w-7xl">
        <h2 className="m-0 text-base font-bold text-ink">Find commercial real estate in:</h2>
        <ul className="m-0 mt-4 grid list-none grid-cols-2 gap-2 p-0 md:grid-cols-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-sm text-slate hover:text-brand">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </HomeSection>
  )
}
