import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import {
  TextColorFeature,
  TextFontFamilyFeature,
  TextLineHeightFeature,
  TextLetterSpacingFeature,
  TextSizeFeature,
} from 'payload-lexical-typography'
import { link } from '@/fields/link'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
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
            TextColorFeature({
              colors: ['#3b82f6', '#141414', '#4b5563'],
            }),
          ]
        },
      }),
      label: false,
      localized: true,
    },
    link({
      overrides: {
        localized: true,
        required: false,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
      localized: true,
    },
  ],
  label: false,
}
