import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'
import {
  TextColorFeature,
  TextFontFamilyFeature,
  TextLetterSpacingFeature,
  TextLineHeightFeature,
  TextSizeFeature,
} from 'payload-lexical-typography'

export const FeatureBlock: Block = {
  slug: 'featureBlock',
  interfaceName: 'FeatureBlock',
  fields: [
    {
      type: 'collapsible',
      label: 'Setting',
      fields: [
        {
          name: 'layout',
          type: 'select',
          options: [
            { value: '3-columns', label: '3 Columns' },
            { value: '4-columns', label: '4 Columns' },
            { value: '5-columns', label: '5 Columns' },
          ],
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          localized: true,
        },
        {
          name: 'content',
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
          localized: true,
        },
      ],
    },
  ],
}
