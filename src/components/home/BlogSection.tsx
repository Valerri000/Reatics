import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/Button'
import { HomeSection } from '@/components/home/HomeSection'

const articles = ['Article title', 'Article title', 'Article title']

export function BlogSection() {
  return (
    <HomeSection id="blog" tone="mist">
      <p className="m-0 text-base font-semibold text-brand">Blog</p>
      <h2 className="m-0 mt-4 max-w-[16ch] text-[28px] font-extrabold leading-9 text-ink xl:text-title">
        Commercial real estate blogs, articles and news.
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((title, index) => (
          <Link key={index} href="/blog" className="bg-white no-underline">
            <div className="aspect-[3/2] bg-sand" />
            <h3 className="m-0 p-4 text-[22px] font-bold leading-8 text-ink">{title}</h3>
          </Link>
        ))}
      </div>
      <Button variant="secondary" href="/blog" className="mt-8">
        Go to Blog
      </Button>
    </HomeSection>
  )
}
