import type { Block, Field } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import {
  TextLineHeightFeature,
  TextLetterSpacingFeature,
  TextSizeFeature,
  TextFontFamilyFeature,
  TextColorFeature,
} from 'payload-lexical-typography'
import { FormBlock } from '../Form/config'
import { MapsBlock } from '../MapsBlock/config'
import { FeatureBlock } from '../FeatureBlock/config'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ defaultFeatures }) => {
        return [
          ...defaultFeatures,
          HeadingFeature(),
          TextSizeFeature(),
          TextLetterSpacingFeature(),
          TextLineHeightFeature(),
          TextFontFamilyFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          TextColorFeature(),
          BlocksFeature({
            blocks: [FormBlock, MapsBlock, FeatureBlock],
          }),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
