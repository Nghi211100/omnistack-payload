import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { blockSettingStyle } from '@/utilities/blockSettingStyle'

export const MediumImpactHero: React.FC<Page['hero']> = ({ link, media, richText, settings }) => {
  return (
    <div className="py-12 block-setting" style={blockSettingStyle(settings)}>
      <div className="container">
        {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}

        <CMSLink {...link} />
      </div>
    </div>
  )
}
