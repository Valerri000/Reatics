import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Field } from 'payload'

export const bodyHeadingSizes = ['h2', 'h3', 'h4'] as const

export const bodyEditor = lexicalEditor({
  features: ({ defaultFeatures }) =>
    defaultFeatures.map((feature) =>
      feature.key === 'heading'
        ? HeadingFeature({ enabledHeadingSizes: [...bodyHeadingSizes] })
        : feature,
    ),
})

export function bodyField(name: 'content' | 'definition', label?: string): Field {
  return {
    name,
    type: 'richText',
    label,
    editor: bodyEditor,
  }
}
