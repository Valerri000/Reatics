import type { RichTextBody } from '@/payload-types'

export type BodyBlock = {
  kind: 'paragraph' | 'h2'
  text: string
}

export function blocksBody(blocks: BodyBlock[]): RichTextBody {
  return {
    root: {
      type: 'root',
      children: blocks.map((block) =>
        block.kind === 'h2'
          ? {
              type: 'heading',
              tag: 'h2',
              version: 1,
              children: [{ type: 'text', version: 1, text: block.text }],
            }
          : {
              type: 'paragraph',
              version: 1,
              children: [{ type: 'text', version: 1, text: block.text }],
            },
      ),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}
