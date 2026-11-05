import Link from 'next/link'
import React from 'react'

import { HomeSection } from '@/components/home/HomeSection'
import { blogPhotos } from '@/lib/homeImages'
import { emptyBlog } from '@/lib/homePosts'

export function BlogSection({ posts }: { posts: { href: string; title: string; byline: string }[] }) {
  return (
    <HomeSection id="blog">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="m-0 text-xs font-bold uppercase tracking-widest text-brand">Blog</p>
            <h2 className="m-0 mt-2 text-3xl font-bold text-ink">Latest from the blog</h2>
          </div>
          <Link href="/blog" className="shrink-0 text-base font-semibold text-brand hover:underline">
            Go to Blog
          </Link>
        </div>
        {posts.length === 0 ? (
          <div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {blogPhotos.map((photo) => (
                <div key={photo} className="h-64 overflow-hidden rounded-xl">
                  <img src={photo} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
            <p className="m-0 mt-8 text-base leading-7 text-ink">{emptyBlog}</p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {posts.map((post, index) => (
              <Link key={post.href} href={post.href} className="group no-underline">
                <div className="mb-6 h-64 overflow-hidden rounded-xl">
                  <img
                    src={blogPhotos[index % blogPhotos.length]}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="m-0 text-xl font-bold text-ink group-hover:text-brand">{post.title}</h3>
                {post.byline ? <p className="m-0 mt-3 text-sm text-slate">{post.byline}</p> : null}
              </Link>
            ))}
          </div>
        )}
      </div>
    </HomeSection>
  )
}
