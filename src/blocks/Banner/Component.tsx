import type { BannerBlock as BannerBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { blockSettingStyle } from '@/utilities/blockSettingStyle'

type Props = {
  className?: string
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({ className, content, settings }) => {
  return (
    <div className={cn('py-8 block-setting', className)} style={blockSettingStyle(settings)}>
      <div
        className={cn('border px-6 flex items-center container', {
          'border-border bg-card': settings.style === 'info',
          'border-error bg-error/30': settings.style === 'error',
          'border-success bg-success/30': settings.style === 'success',
          'border-warning bg-warning/30': settings.style === 'warning',
        })}
      >
        <RichText data={content} enableGutter={false} enableProse={false} />
      </div>
    </div>
  )
}
