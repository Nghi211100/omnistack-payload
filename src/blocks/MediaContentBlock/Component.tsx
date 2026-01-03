import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type {} from '@/payload-types'
import { cn } from '@/utilities/ui'
import { StaticImageData } from 'next/image'
import { MediaContentBlock } from '@/payload-types'
import { CMSLink } from '@/components/Link'
type Props = MediaContentBlock & {
  breakout?: boolean
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}
const reverseLayout = (fraction: string) => {
  const [a, b] = fraction.split('/').map(Number)
  if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) {
    throw new Error('Invalid fraction')
  }
  return `${b - a}/${b}`
}

const MediaContent: React.FC<Props> = async (props) => {
  const {
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    alignment,
    content,
    layout,
    enableButtonDirect,
    link,
  } = props

  const renderMedia = () => {
    if (media || staticImage)
      return (
        <div
          className={cn('w-1/2', 'w-1/3', 'w-1/4', 'w-2/3', 'w-3/4', 'w-2/5', 'w-3/5', 'w-full', [
            `md:w-${layout}`,
          ])}
        >
          <Media
            imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
            resource={media}
            src={staticImage}
          />
        </div>
      )
    return null
  }

  const renderContent = () => {
    if (content)
      return (
        <div
          className={cn(
            {
              container: !disableInnerContainer,
              'mt-6': layout === 'full',
            },
            [`md:w-${reverseLayout(layout as string)}`],
            'w-full',
          )}
        >
          <RichText data={content} enableGutter={false} />
          {enableButtonDirect && link && <CMSLink {...link} appearance={'default'} />}
        </div>
      )
    return null
  }

  const renderLayout = () => {
    if (alignment === 'contentMedia') {
      return (
        <>
          {renderMedia()}
          {renderContent()}
        </>
      )
    }
    return (
      <>
        {renderContent()}
        {renderMedia()}
      </>
    )
  }
  return (
    <div
      className={cn(
        {
          container: enableGutter,
          'w-full': layout === 'full',
        },
        className,
        'flex flex-col md:flex-row gap-6',
      )}
    >
      {renderLayout()}
    </div>
  )
}

export default MediaContent
