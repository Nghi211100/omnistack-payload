import { link } from '@/fields/link'
import {
  InlineToolbarFeature,
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor,
  BlocksFeature,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'
import {
  TextColorFeature,
  TextFontFamilyFeature,
  TextLineHeightFeature,
  TextLetterSpacingFeature,
  TextSizeFeature,
} from 'payload-lexical-typography'
import { FeatureBlock } from '../FeatureBlock/config'

export const MediaContentBlock: Block = {
  slug: 'mediaContent',
  interfaceName: 'MediaContentBlock',
  fields: [
    {
      type: 'collapsible',
      label: 'Setting',
      fields: [
        {
          name: 'alignment',
          type: 'select',
          options: [
            { label: 'Content + Media', value: 'contentMedia' },
            { label: 'Media + Content', value: 'mediaContent' },
          ],
          defaultValue: 'mediaContent',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'layout',
          type: 'select',
          options: [
            { label: '50% - 50%', value: '1/2' },
            { label: '25% - 75%', value: '1/4' },
            { label: '40% - 60%', value: '2/5' },
            { label: '30% - 70%', value: '1/3' },
            { label: '60% - 40%', value: '3/5' },
            { label: '70% - 30%', value: '2/3' },
            { label: '75% - 25%', value: '3/4' },
            { label: '100%', value: 'full' },
          ],
          defaultValue: '1/2',
          admin: {
            width: '50%',
            description: 'Select the proportional layout of Content and Media within this block.',
          },
        },
      ],
    },
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
            BlocksFeature({ blocks: [FeatureBlock] }),
          ]
        },
      }),
      localized: true,
    },
    {
      type: 'collapsible',
      label: 'Button',
      fields: [
        { name: 'enableButtonDirect', type: 'checkbox' },
        link({
          appearances: false,
          overrides: {
            admin: {
              condition: (_, sibling) => sibling.enableButtonDirect === true,
            },
            localized: true,
          },
        }),
      ],
    },
  ],
}
