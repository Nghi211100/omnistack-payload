import { Field } from 'payload'

export const settingField = ({ overrides }: { overrides?: Field[] }): Field => {
  const itemOverrides = overrides ?? []
  const settingGroup: Field = {
    type: 'collapsible',
    label: 'Settings',
    fields: [
      {
        name: 'settings',
        label: false,
        type: 'group',
        fields: [
          {
            label: 'Background',
            type: 'collapsible',
            fields: [
              {
                name: 'bgType',
                label: 'Type',
                type: 'radio',
                defaultValue: 'transparent',
                options: [
                  {
                    label: 'Image',
                    value: 'image',
                  },
                  {
                    label: 'Color',
                    value: 'color',
                  },
                  {
                    label: 'Transparent',
                    value: 'transparent',
                  },
                ],
                admin: {
                  width: '100%',
                  description:
                    'Select "Image" to use a background image, or "Color" to choose a solid background color. If neither is chosen, the section background will default to transparent.',
                },
              },
              {
                type: 'row',
                fields: [
                  {
                    name: 'bgLightColor',
                    label: 'Light Color custom',
                    type: 'text',
                    admin: {
                      condition: (_, siblingData) => siblingData.bgType === 'color',
                      width: '50%',
                      description:
                        'Custom CSS Light color value (e.g., #ffffff, rgb(255,255,255), or color name). Defaults to white if left empty.',
                    },
                  },
                  {
                    name: 'bgDarkColor',
                    label: 'Dark Color custom',
                    type: 'text',
                    admin: {
                      condition: (_, siblingData) => siblingData.bgType === 'color',
                      width: '50%',
                      description:
                        'Custom CSS Dark color value (e.g., #ffffff, rgb(255,255,255), or color name). Defaults to white if left empty.',
                    },
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  {
                    name: 'bgImage',
                    label: 'Image',
                    type: 'upload',
                    relationTo: 'media',
                    admin: {
                      condition: (_, siblingData) => siblingData.bgType === 'image',
                      width: '65%',
                      description:
                        'Upload an image to use as the section background. This image will only be displayed if "Type" is set to "Image".',
                    },
                  },
                  {
                    name: 'bgRepeat',
                    label: 'Repeat',
                    type: 'checkbox',
                    admin: {
                      condition: (_, siblingData) => siblingData.bgType === 'image',
                      description:
                        'Enable to repeat the background image. When checked, the image will tile to fill the area. Leave unchecked for a single image.',
                      width: '35%',
                      style: { paddingTop: '23px' },
                    },
                  },
                  {
                    name: 'bgSize',
                    label: 'Size',
                    type: 'select',
                    options: [
                      {
                        label: 'Contain',
                        value: 'contain',
                      },
                      {
                        label: 'Cover',
                        value: 'cover',
                      },
                      {
                        label: 'Custom',
                        value: 'custom',
                      },
                    ],
                    admin: {
                      condition: (_, siblingData) => siblingData.bgType === 'image',
                      width: '50%',
                      description:
                        'How the image should scale. "Contain" fits within the area, "Cover" fills it, or set a custom value. Default is auto.',
                    },
                  },
                  {
                    name: 'bgSizeCustom',
                    label: 'Size Custom',
                    type: 'text',
                    admin: {
                      condition: (_, siblingData) =>
                        siblingData.bgSize === 'custom' && siblingData.bgType === 'image',
                      width: '50%',
                      description: 'Enter a value in pixels or percent (e.g., 70px, 50%)',
                    },
                  },
                  {
                    name: 'bgPosition',
                    label: 'Position',
                    type: 'select',
                    hasMany: true,
                    options: [
                      {
                        label: 'Center',
                        value: 'center',
                      },
                      {
                        label: 'Right',
                        value: 'right',
                      },
                      {
                        label: 'Left',
                        value: 'left',
                      },
                      {
                        label: 'Top',
                        value: 'top',
                      },
                      {
                        label: 'Bottom',
                        value: 'bottom',
                      },
                    ],
                    admin: {
                      condition: (_, siblingData) => siblingData.bgType === 'image',
                      width: '50%',
                      description:
                        'Choose one or more background positions. Default is center. Example: select "Right" and "Top" to position background at the top right.',
                    },
                  },
                  {
                    name: 'bgAttachment',
                    label: 'Attachment',
                    type: 'select',
                    options: [
                      { label: 'Scroll', value: 'scroll' },
                      { label: 'Fixed', value: 'fixed' },
                    ],
                    admin: {
                      condition: (_, siblingData) => siblingData.bgType === 'image',
                      width: '50%',
                      description:
                        'Specifies how the background image scrolls with the page. "Scroll" moves with the content (default), "Fixed" remains stationary.',
                    },
                  },
                ],
              },
            ],
          },
          {
            name: 'padding',
            type: 'text',
            admin: {
              width: '50%',
              description:
                'Sets the vertical padding (top and bottom) for the block. Enter values like "40px", "2rem", or "10%". Default is "32px". Leave blank to use the default.',
            },
          },
          ...itemOverrides,
        ],
      },
    ],
  }

  return settingGroup
}
