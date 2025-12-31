import { authenticated } from '@/access/authenticated'
import { CollectionConfig } from 'payload'

export const Portfolios: CollectionConfig = {
  slug: 'portfolios',
  access: {
    create: authenticated,
    delete: authenticated,
    update: authenticated,
    read: authenticated,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', localized: true },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'categories', type: 'relationship', relationTo: 'categories' },
  ],
}
