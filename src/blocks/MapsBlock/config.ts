import { Block } from 'payload'

export const MapsBlock: Block = {
  slug: 'mapsBlock',
  interfaceName: 'MapsBlock',
  fields: [
    {
      type: 'collapsible',
      label: 'Settings',
      fields: [
        {
          name: 'width',
          type: 'number',
          admin: {
            width: '50%',
            description: 'Map width in pixels (px)',
          },
        },
        {
          name: 'height',
          type: 'number',
          admin: {
            width: '50%',
            description: 'Map height in pixels (px)',
          },
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    { name: 'specificAddress', type: 'text', localized: true },
    {
      name: 'latitude',
      type: 'number',
      admin: {
        step: 0.01,
        description: 'Latitude coordinate of the location',
        width: '50%',
      },
    },
    {
      name: 'longitude',
      type: 'number',
      admin: {
        step: 0.01,
        description: 'Longitude coordinate of the location',
        width: '50%',
      },
    },
  ],
}
