import React from 'react'

import type { RichTextBody } from '@/payload-types'

type BodyNode = {
  type?: string
  tag?: string
  text?: string
  format?: number | string
  listType?: string
  url?: string
  fields?: { url?: string | null }
  children?: BodyNode[]
}

const headingClass = {
  h2: 'mt-10 text-[28px] font-extrabold leading-9 text-ink md:text-[32px]',
  h3: 'mt-8 text-[22px] font-extrabold leading-8 text-ink',
  h4: 'mt-6 text-[18px] font-bold leading-7 text-ink',
} as const

export function FormattedBody({ value }: { value?: RichTextBody | null }) {
  const children = value?.root?.children as BodyNode[] | undefined
  if (!children?.length) return null
  return (
    <div className="max-w-3xl [&>*:first-child]:mt-0">
      {children.map((node, index) => (
        <Block key={index} node={node} />
      ))}
    </div>
  )
}

function Block({ node }: { node: BodyNode }) {
  const children = node.children?.map((child, index) => <Block key={index} node={child} />)
  if (node.type === 'heading') {
    const tag = node.tag === 'h3' || node.tag === 'h4' ? node.tag : 'h2'
    const Heading = tag
    return <Heading className={headingClass[tag]}>{children}</Heading>
  }
  if (node.type === 'list') {
    const numbered = node.listType === 'number' || node.tag === 'ol'
    const ListTag = numbered ? 'ol' : 'ul'
    const listClass = numbered ? 'mt-4 list-decimal pl-6' : 'mt-4 list-disc pl-6'
    return <ListTag className={listClass}>{children}</ListTag>
  }
  if (node.type === 'listitem') return <li className="mt-2">{children}</li>
  if (node.type === 'quote') {
    return <blockquote className="mt-4 border-l-4 border-line pl-4">{children}</blockquote>
  }
  if (node.type === 'link') {
    const url = linkUrl(node)
    if (!url) return <>{children}</>
    return (
      <a className="text-brand underline" href={url}>
        {children}
      </a>
    )
  }
  if (node.type === 'linebreak') return <br />
  if (node.type === 'text' || typeof node.text === 'string') return <>{marks(node)}</>
  if (children?.length) {
    return (
      <p className="mt-4 text-[16px] font-light leading-6 text-ink md:text-body">{children}</p>
    )
  }
  return null
}

function linkUrl(node: BodyNode) {
  if (typeof node.url === 'string' && node.url.trim()) return node.url
  const url = node.fields?.url
  return typeof url === 'string' ? url : ''
}

function marks(node: BodyNode) {
  const text = node.text || ''
  const format = typeof node.format === 'number' ? node.format : 0
  let marked: React.ReactNode = text
  if (format & 1) marked = <strong>{marked}</strong>
  if (format & 2) marked = <em>{marked}</em>
  if (format & 8) marked = <span className="underline">{marked}</span>
  return marked
}
