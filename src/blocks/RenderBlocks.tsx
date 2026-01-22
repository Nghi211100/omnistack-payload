import React, { Fragment } from 'react'
import type { Page } from '@/payload-types'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { MediaContent } from './MediaContentBlock/Component'
import { FeatureBlock } from './FeatureBlock/Component'
import { cn } from '@/utilities/ui'
import ArchiveBlock from '@/blocks/ArchiveBlock/Component'
import FormBlock from '@/blocks/Form/Component'
import MapsBlock from './MapsBlock/Component'

const blockComponents: Record<string, React.FC<any>> = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  featureBlock: FeatureBlock,
  mediaContent: MediaContent,
  mapsBlock: MapsBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout']
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={block.id} className={cn({ 'overflow-hidden': blockType !== 'archive' })}>
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
