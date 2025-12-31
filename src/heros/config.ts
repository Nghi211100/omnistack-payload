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
            TextColorFeature(),
          ]
        },
      }),
      label: false,
      localized: true,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
        localized: true,
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
