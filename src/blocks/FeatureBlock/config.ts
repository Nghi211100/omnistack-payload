import { Block } from 'payload'

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
          localized: true,
        },
      ],
    },
  ],
}
