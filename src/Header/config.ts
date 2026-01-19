import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'logo', type: 'upload', relationTo: 'media', localized: true },
    { name: 'phone', type: 'text', label: 'Contact Phone' },
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
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
      localized: true,
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
