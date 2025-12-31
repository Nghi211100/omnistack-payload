import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { FeatureBlock as FeatureBlockType } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import React from 'react'

type Props = FeatureBlockType & {
  className?: string
}

const FeatureBlock: React.FC<Props> = (props) => {
  const { items, className, layout } = props
  return (
    <div
      className={cn(
        'py-16 container grid grid-cols-2 gap-x-8 gap-y-12',
        className,
        'md:grid-cols-3',
        'md:grid-cols-5',
        'md:grid-cols-4',
        { [`md:grid-cols-${layout?.slice(0, 1)}`]: layout },
      )}
    >
      {items?.map((item) => (
        <div key={item.id}>
          {item.media && <Media resource={item.media} imgClassName="mx-auto" />}
          {item.content && <RichText data={item.content as DefaultTypedEditorState} />}
        </div>
      ))}
    </div>
  )
}

export default FeatureBlock
