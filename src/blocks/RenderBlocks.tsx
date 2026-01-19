import React, { Fragment } from 'react'
import dynamic from 'next/dynamic'
import type { Page } from '@/payload-types'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { MediaContent } from './MediaContentBlock/Component'
import { FeatureBlock } from './FeatureBlock/Component'
import { SkeletonForm } from './Form/SkeletonForm'


export const ArchiveBlock = dynamic(() => import('@/blocks/ArchiveBlock/Component'))
const FormBlock = dynamic( () => import('@/blocks/Form/Component'), { loading: () => <SkeletonForm /> } )
export const MapsBlock = dynamic(
  () => import('./MapsBlock/Component')
)

const blockComponents = {
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
  blocks: Page['layout'][0][]
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
                <Fragment key={block.id}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </Fragment>
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
