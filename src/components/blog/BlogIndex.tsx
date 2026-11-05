import React from 'react'

import { PageBanner } from '@/components/content/PageBanner'
import { authorName, emptyBlog, formatPostDate, postPath, visiblePosts, type PostCard } from '@/lib/postList'

export function BlogIndex({ posts }: { posts: PostCard[] }) {
  const visible = visiblePosts(posts)
  return (
    <PageBanner title="Blog">
      {visible.length === 0 ? (
        <p className="m-0 max-w-3xl text-[16px] font-light leading-6 text-ink md:text-body">{emptyBlog}</p>
      ) : (
        <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((post) => {
            const byline = [formatPostDate(post.publishedOn), authorName(post.author)].filter(Boolean).join(' · ')
            return (
              <li key={post.slug} className="overflow-hidden rounded-2xl border border-line bg-white">
                <a href={postPath(post.slug)} className="block p-5 text-[22px] font-extrabold text-ink no-underline">
                  {post.title}
                </a>
                {byline ? <p className="m-0 px-5 pb-5 text-base text-slate">{byline}</p> : null}
              </li>
            )
          })}
        </ul>
      )}
    </PageBanner>
  )
}
