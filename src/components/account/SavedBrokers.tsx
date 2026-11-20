import Link from 'next/link'
import React from 'react'

export function SavedBrokers() {
  return (
    <section className="flex-1 bg-sand px-inset-phone pb-section-phone pt-10 md:px-inset-tablet md:pb-section xl:px-inset-desktop 2xl:px-inset-wide">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-[2.5rem] border border-line bg-white px-8 py-16 text-center">
          <h2 className="m-0 text-2xl font-black tracking-tight text-ink">No saved brokers yet.</h2>
          <p className="m-0 mt-3 text-base font-medium text-slate">Brokers you save will appear on this page.</p>
          <Link
            href="/brokers"
            className="mt-8 inline-flex rounded-2xl bg-brand px-6 py-4 text-sm font-black no-underline"
          >
            <span className="text-white">Find a broker</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
