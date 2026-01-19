import type { Block } from 'payload'

import { linkGroup } from '../../fields/linkGroup'
import { settingField } from '@/fields/setting'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
    settingField({}),
    {
      name: 'richText',
      type: 'richText',
      label: false,
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
