import React from 'react'

import type { MediaContentBlock } from '@/payload-types'
import MediaContentClient from './Component.client'
import { StaticImageData } from 'next/image'

export type MediaContentProps = MediaContentBlock & {
  breakout?: boolean
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}
export const MediaContent: React.FC<MediaContentProps> = (props) => {
  return <MediaContentClient props={props} />
}
