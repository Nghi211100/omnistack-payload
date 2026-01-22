import type { Field } from 'payload'
import {
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'
import { settingField } from '@/fields/setting'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    settingField({
      overrides: [
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
      ]
    }),
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures]
        },
      }),
      label: false,
      localized: true,
    },
    link({
      overrides: {
        localized: true,
        required: false,
        admin: {
          condition: (_, siblingData) => ['highImpact', 'mediumImpact'].includes(siblingData.settings.type),
        }
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, siblingData) => ['highImpact'].includes(siblingData.settings.type),
      },
      relationTo: 'media',
      required: true,
      localized: true,
    },
  ],
  label: false,
}
