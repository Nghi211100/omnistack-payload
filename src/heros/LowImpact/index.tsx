import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'
import { blockSettingStyle } from '@/utilities/blockSettingStyle'

export const LowImpactHero: React.FC<Page['hero']> = ({ richText, settings }) => {
  return (
    <div className="py-12 block-setting" style={blockSettingStyle(settings)}>
      <div className='container '>
        {richText && <RichText data={richText} enableGutter={false} />}
      </div>
    </div>
  )
}
