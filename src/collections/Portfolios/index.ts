import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Portfolios: CollectionConfig = {
  slug: 'portfolios',
  access: {
    create: authenticated,
    delete: authenticated,
    update: authenticated,
    read: anyone,
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
    { name: 'categories', type: 'relationship', relationTo: 'categories', filterOptions: {
      type: {
        equals: 'service'
      }
    } },
  ],
}
