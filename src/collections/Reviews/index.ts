import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
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
    { name: 'name', type: 'text', required: true },
    { name: 'image', type: 'upload', required: true, relationTo: 'media' },
    { name: 'content', type: 'textarea' },
  ],
}
