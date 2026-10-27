import type { CollectionBeforeChangeHook, Field } from 'payload'
import { ValidationError } from 'payload'

import { bodyText } from '@/lib/bodyText'

export const publishMessage = 'Add a title, an H1, and a body before publishing.'

export const statusField: Field = {
  name: 'status',
  type: 'select',
  label: 'Status',
  required: true,
  defaultValue: 'draft',
  options: [
    { label: 'Draft', value: 'draft' },
    { label: 'Published', value: 'published' },
  ],
}

export function publishErrors(
  record: Record<string, unknown>,
  titleField: 'title' | 'term',
  bodyField: 'content' | 'definition',
) {
  if (record.status !== 'published') return []
  const errors: { path: string; message: string }[] = []
  const title = typeof record[titleField] === 'string' ? record[titleField].trim() : ''
  const h1 = typeof record.h1 === 'string' ? record.h1.trim() : ''
  if (!title) errors.push({ path: titleField, message: publishMessage })
  if (!h1) errors.push({ path: 'h1', message: publishMessage })
  if (!bodyText(record[bodyField])) errors.push({ path: bodyField, message: publishMessage })
  return errors
}

export function blockUnreadyPublish(
  titleField: 'title' | 'term',
  bodyField: 'content' | 'definition',
): CollectionBeforeChangeHook {
  return ({ data }) => {
    const errors = publishErrors(data, titleField, bodyField)
    if (errors.length) throw new ValidationError({ errors })
    return data
  }
}

export function stampPublishDate({ data }: { data: Record<string, unknown> }) {
  if (data.status === 'published' && !data.publishedOn) {
    data.publishedOn = new Date().toISOString()
  }
  return data
}

export const blockUnreadyPost: CollectionBeforeChangeHook = ({ data }) => {
  const errors = publishErrors(data, 'title', 'content')
  if (data.status === 'published' && !data.author) {
    errors.push({ path: 'author', message: 'Add an author before publishing.' })
  }
  if (errors.length) throw new ValidationError({ errors })
  return data
}
