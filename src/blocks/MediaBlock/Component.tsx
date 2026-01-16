import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'
import { blockSettingStyle } from '@/utilities/blockSettingStyle'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    settings,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div className={cn(className, 'py-8 block-setting')} style={blockSettingStyle(settings)}>
      <div
        className={cn({
          container: enableGutter,
        })}
      >
        {(media || staticImage) && (
          <Media
            imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
            resource={media}
            src={staticImage}
          />
        )}
        {caption && (
          <div
            className={cn(
              'mt-6',
              {
                container: !disableInnerContainer,
              },
              captionClassName,
            )}
          >
            <RichText data={caption} enableGutter={false} />
          </div>
        )}
      </div>
    </div>
  )
}
