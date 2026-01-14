import type { TextFieldSingleValidation } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  type LinkFields,
  InlineToolbarFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
} from '@payloadcms/richtext-lexical'
import {
  TextColorFeature,
  TextSizeFeature,
  TextFontFamilyFeature,
  TextLetterSpacingFeature,
  TextLineHeightFeature,
} from 'payload-lexical-typography'

export const defaultLexical = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    ParagraphFeature(),
    UnderlineFeature(),
    BoldFeature(),
    ItalicFeature(),
    LinkFeature({
      enabledCollections: ['pages', 'posts'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true // no validation needed, as no url should exist for internal links
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),
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
  ],
})
