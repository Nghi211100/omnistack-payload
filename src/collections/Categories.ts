import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'
import { anyone } from '@/access/anyone'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: anyone,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      position: undefined,
    }),
  ],
}
