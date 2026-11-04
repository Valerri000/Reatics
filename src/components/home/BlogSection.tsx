import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/Button'
import { HomeSection } from '@/components/home/HomeSection'
import { emptyBlog } from '@/lib/homePosts'

export function BlogSection({ posts }: { posts: { href: string; title: string; byline: string }[] }) {
  return (
    <HomeSection id="blog" tone="mist">
      <p className="m-0 text-base font-semibold text-brand">Blog</p>
      <h2 className="m-0 mt-4 max-w-[16ch] text-[28px] font-extrabold leading-9 text-ink xl:text-title">
        Commercial real estate blogs, articles and news.
      </h2>
      {posts.length === 0 ? (
        <p className="m-0 mt-8 text-[16px] font-light leading-6 text-ink md:text-body">{emptyBlog}</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.href} href={post.href} className="bg-white no-underline">
              <div className="aspect-[3/2] bg-sand" />
              <h3 className="m-0 p-4 text-[22px] font-bold leading-8 text-ink">{post.title}</h3>
              {post.byline ? <p className="m-0 px-4 pb-4 text-base text-slate">{post.byline}</p> : null}
            </Link>
          ))}
        </div>
      )}
      <Button variant="secondary" href="/blog" className="mt-8">
        Go to Blog
      </Button>
    </HomeSection>
  )
}
