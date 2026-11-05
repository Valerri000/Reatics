import Link from 'next/link'
import React from 'react'

import { HomeSection } from '@/components/home/HomeSection'
import { ChevronIcon } from '@/components/icons'

export function AboutSection() {
  return (
    <HomeSection id="about">
      <div className="mx-auto max-w-xl lg:ml-auto lg:mr-8">
        <p className="m-0 text-xs font-bold uppercase tracking-widest text-gray">About Reatics</p>
        <h2 className="m-0 mt-4 text-3xl font-bold leading-tight text-ink">
          Expert commercial real estate solutions.
        </h2>
        <p className="m-0 mt-6 text-base leading-7 text-slate">
          Reatics is a commercial real estate search site. It lets people find offices and other
          commercial space for lease or sale, plus coworking. A visitor can search by place and open
          a listing.
        </p>
        <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-base font-bold text-brand">
          Learn more about us
          <ChevronIcon className="h-4 w-4 -rotate-90" />
        </Link>
      </div>
    </HomeSection>
  )
}
