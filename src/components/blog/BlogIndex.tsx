import Link from 'next/link'
import React from 'react'

import { BlogNewsletter } from '@/components/blog/BlogNewsletter'
import { blogCardPhotos, blogFeaturedPhoto } from '@/lib/pageImages'
import { authorName, emptyBlog, formatPostDate, postPath, visiblePosts, type PostCard } from '@/lib/postList'

export function BlogIndex({ posts }: { posts: PostCard[] }) {
  const visible = visiblePosts(posts)
  const [featured, ...rest] = visible

  return (
    <div className="bg-white">
      <section className="px-inset-phone py-16 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto max-w-7xl">
          <p className="m-0 inline-flex rounded-full bg-sand px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand">
            Blog
          </p>
          <h1 className="m-0 mt-8 text-5xl font-black leading-none tracking-tight text-ink md:text-7xl">Blog</h1>
          <p className="m-0 mt-6 max-w-3xl text-xl font-medium leading-relaxed text-slate">
            Notes on commercial real estate from Reatics.
          </p>
        </div>
      </section>
      <section className="px-inset-phone pb-16 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto max-w-7xl">
          {visible.length === 0 ? (
            <div>
              <img src={blogFeaturedPhoto} alt="" className="h-[420px] w-full rounded-[2.5rem] object-cover" />
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {blogCardPhotos.map((photo) => (
                  <img key={photo} src={photo} alt="" className="h-64 w-full rounded-[2rem] object-cover" />
                ))}
              </div>
              <p className="m-0 mt-8 text-base leading-7 text-ink">{emptyBlog}</p>
            </div>
          ) : (
            <div className="space-y-10">
              {featured ? <PostFeature post={featured} /> : null}
              {rest.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {rest.map((post, index) => (
                    <PostCardView key={post.slug} post={post} image={blogCardPhotos[index % blogCardPhotos.length]} />
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </section>
      <BlogNewsletter />
    </div>
  )
}

function PostFeature({ post }: { post: PostCard }) {
  return (
    <Link href={postPath(post.slug)} className="grid overflow-hidden rounded-[2.5rem] border border-line bg-white no-underline lg:grid-cols-[1.2fr_0.8fr]">
      <img src={blogFeaturedPhoto} alt="" className="h-80 w-full object-cover lg:h-full" />
      <div className="flex flex-col justify-center p-8 md:p-12">
        <h2 className="m-0 text-3xl font-black tracking-tight text-ink">{post.title}</h2>
        {post.metaDescription ? <p className="m-0 mt-4 text-base leading-7 text-slate">{post.metaDescription}</p> : null}
        <Byline post={post} />
      </div>
    </Link>
  )
}

function PostCardView({ post, image }: { post: PostCard; image: string }) {
  return (
    <Link href={postPath(post.slug)} className="overflow-hidden rounded-[2rem] border border-line bg-white no-underline">
      <img src={image} alt="" className="h-56 w-full object-cover" />
      <div className="p-8">
        <h2 className="m-0 text-2xl font-black tracking-tight text-ink">{post.title}</h2>
        {post.metaDescription ? <p className="m-0 mt-4 text-sm leading-6 text-slate">{post.metaDescription}</p> : null}
        <Byline post={post} />
      </div>
    </Link>
  )
}

function Byline({ post }: { post: PostCard }) {
  const parts = [formatPostDate(post.publishedOn), authorName(post.author)].filter(Boolean)
  if (parts.length === 0) return null
  return <p className="m-0 mt-6 text-xs font-bold uppercase tracking-widest text-gray">{parts.join(' / ')}</p>
}
