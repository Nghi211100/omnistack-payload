import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import {
  TextColorFeature,
  TextSizeFeature,
  TextLetterSpacingFeature,
  TextLineHeightFeature,
  TextFontFamilyFeature,
} from 'payload-lexical-typography'
import { FormBlock } from '@/blocks/Form/config'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'additionalInformation',
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
              blocks: [FormBlock],
            }),
          ]
        },
      }),
      localized: true,
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Footer Columns',
      admin: {
        initCollapsed: true,
      },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'enableDirectLink', type: 'checkbox' },
        {
          type: 'collapsible',
          label: 'Direct Link',
          fields: [
            link({
              appearances: false,
              disableLabel: true,
            }),
          ],
          admin: {
            condition: (_, sibling) => sibling.enableDirectLink === true,
          },
        },
        {
          name: 'navItems',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 6,
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/Footer/RowLabel#RowLabel',
            },
          },
        },
      ],
      localized: true,
    },
    { name: 'copyRight', type: 'text', localized: true },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
