import React from 'react'

import { authorName, emptyBlog, formatPostDate, postPath, visiblePosts, type PostCard } from '@/lib/postList'

export function BlogIndex({ posts }: { posts: PostCard[] }) {
  const visible = visiblePosts(posts)
  return (
    <section className="px-inset-phone py-section-phone md:px-inset-wide md:py-section">
      <h1 className="m-0 text-[28px] font-extrabold leading-none text-ink md:text-[32px]">Blog</h1>
      {visible.length === 0 ? (
        <p className="m-0 mt-6 max-w-3xl text-[16px] font-light leading-6 text-ink md:text-body">{emptyBlog}</p>
      ) : (
        <ul className="m-0 mt-8 max-w-3xl list-none p-0">
          {visible.map((post) => {
            const byline = [formatPostDate(post.publishedOn), authorName(post.author)].filter(Boolean).join(' · ')
            return (
              <li key={post.slug} className="mt-6 border-b border-line pb-6">
                <a href={postPath(post.slug)} className="text-[22px] font-extrabold text-ink no-underline">
                  {post.title}
                </a>
                {byline ? <p className="m-0 mt-2 text-base text-slate">{byline}</p> : null}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
