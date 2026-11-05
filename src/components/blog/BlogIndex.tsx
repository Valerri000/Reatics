import Link from 'next/link'
import React from 'react'

import { BlogNewsletter } from '@/components/blog/BlogNewsletter'
import { blogCardPhotos, blogFeaturedPhoto } from '@/lib/pageImages'
import { authorName, formatPostDate, postPath, visiblePosts, type PostCard } from '@/lib/postList'

const designArticles = [
  {
    image: blogCardPhotos[0],
    label: 'Market',
    title: 'The Rise of Hybrid Coworking in Downtown Los Angeles',
    text: 'Exploring the synergy between traditional commercial lease models and flexible coworking hubs.',
    date: 'Oct 24, 2023',
  },
  {
    image: blogCardPhotos[1],
    label: 'Strategy',
    title: 'How to Optimize Your Property Listing for Maximum Reach',
    text: 'Technical tips for owners and brokers to enhance digital visibility and tenant conversion.',
    date: 'Oct 21, 2023',
  },
  {
    image: blogCardPhotos[2],
    label: 'Design',
    title: 'Modern Office Amenities That Tenants Actually Want',
    text: 'From rooftop gardens to wellness suites, what is driving commercial value in 2023.',
    date: 'Oct 18, 2023',
  },
]

export function BlogIndex({ posts }: { posts: PostCard[] }) {
  const visible = visiblePosts(posts)
  const [featured, ...rest] = visible

  return (
    <div className="mesh-bg">
      <section className="px-inset-phone pb-16 pt-16 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto max-w-7xl">
          <h1 className="m-0 max-w-4xl text-6xl font-black leading-[0.9] tracking-tighter text-ink md:text-8xl">
            The Reatics
            <br />
            <span className="gradient-text">Insights.</span>
          </h1>
          <p className="m-0 mt-8 max-w-3xl text-lg font-medium leading-relaxed text-slate md:text-xl">
            Analyzing trends, property cycles, and the future of professional workspaces in Southern California and
            beyond.
          </p>
        </div>
      </section>
      <section className="px-inset-phone pb-20 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto max-w-7xl">
          {visible.length === 0 ? (
            <div>
              <FeaturedDesign />
              <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
                {designArticles.map((article) => (
                  <DesignCard key={article.title} article={article} />
                ))}
              </div>
            </div>
          ) : (
            <div>
              {featured ? <PostFeature post={featured} /> : null}
              {rest.length > 0 ? (
                <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
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

function FeaturedDesign() {
  return (
    <article className="featured-blog flex flex-col overflow-hidden rounded-[2rem] bg-white lg:flex-row">
      <div className="relative h-80 w-full lg:h-[32rem] lg:w-3/5">
        <img src={blogFeaturedPhoto} alt="" className="cover-photo" />
      </div>
      <div className="flex w-full flex-col justify-center p-8 md:p-12 lg:w-2/5 lg:p-16">
        <div className="flex items-center gap-4">
          <span className="rounded-full bg-brand px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white">
            Featured
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray">12 Min Read</span>
        </div>
        <h2 className="m-0 mt-6 text-3xl font-black leading-tight tracking-tight text-brand md:text-4xl">
          The Institutional Shift: How Remote Work is Redefining Class A Assets.
        </h2>
        <p className="m-0 mt-6 text-base font-medium leading-relaxed text-slate">
          An in-depth analysis of how major corporate tenants are restructuring their Southern California portfolios in
          response to hybrid work models.
        </p>
        <div className="mt-10 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray">Oct 26, 2023</span>
          <ArrowButton />
        </div>
      </div>
    </article>
  )
}

function DesignCard({
  article,
}: {
  article: { image: string; label: string; title: string; text: string; date: string }
}) {
  return (
    <article>
      <div className="relative h-64 overflow-hidden rounded-[1.75rem]">
        <img src={article.image} alt="" className="cover-photo" />
        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-ink">
          {article.label}
        </span>
      </div>
      <h3 className="m-0 mt-6 text-2xl font-black leading-tight text-ink">{article.title}</h3>
      <p className="m-0 mt-4 text-base font-medium leading-relaxed text-slate">{article.text}</p>
      <div className="mt-6 flex items-center justify-between border-t border-line pt-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray">{article.date}</span>
        <span className="text-xs font-black uppercase tracking-widest text-brand">Read more</span>
      </div>
    </article>
  )
}

function PostFeature({ post }: { post: PostCard }) {
  return (
    <Link
      href={postPath(post.slug)}
      className="featured-blog flex flex-col overflow-hidden rounded-[2rem] bg-white no-underline lg:flex-row"
    >
      <div className="relative h-80 w-full lg:h-[32rem] lg:w-3/5">
        <img src={blogFeaturedPhoto} alt="" className="cover-photo" />
      </div>
      <div className="flex w-full flex-col justify-center p-8 md:p-12 lg:w-2/5 lg:p-16">
        <span className="w-fit rounded-full bg-brand px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white">
          Featured
        </span>
        <h2 className="m-0 mt-6 text-3xl font-black leading-tight tracking-tight text-brand md:text-4xl">{post.title}</h2>
        {post.metaDescription ? (
          <p className="m-0 mt-6 text-base font-medium leading-relaxed text-slate">{post.metaDescription}</p>
        ) : null}
        <div className="mt-10 flex items-center justify-between">
          <Byline post={post} />
          <ArrowButton />
        </div>
      </div>
    </Link>
  )
}

function PostCardView({ post, image }: { post: PostCard; image: string }) {
  return (
    <Link href={postPath(post.slug)} className="no-underline">
      <div className="relative h-64 overflow-hidden rounded-[1.75rem]">
        <img src={image} alt="" className="cover-photo" />
      </div>
      <h3 className="m-0 mt-6 text-2xl font-black leading-tight text-ink">{post.title}</h3>
      {post.metaDescription ? (
        <p className="m-0 mt-4 text-base font-medium leading-relaxed text-slate">{post.metaDescription}</p>
      ) : null}
      <div className="mt-6 flex items-center justify-between border-t border-line pt-6">
        <Byline post={post} />
        <span className="text-xs font-black uppercase tracking-widest text-brand">Read more</span>
      </div>
    </Link>
  )
}

function Byline({ post }: { post: PostCard }) {
  const parts = [formatPostDate(post.publishedOn), authorName(post.author)].filter(Boolean)
  if (parts.length === 0) return <span />
  return <span className="text-[10px] font-bold uppercase tracking-widest text-gray">{parts.join(' / ')}</span>
}

function ArrowButton() {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  )
}
