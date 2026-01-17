'use client'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { blockSettingStyle } from '@/utilities/blockSettingStyle'
import { cn } from '@/utilities/ui'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { motion } from 'motion/react'
import { FeatureProps } from './Component'

const FeatureClient = ({ props }: { props: FeatureProps }) => {
  const { items, className, settings } = props
  return (
    <div className={cn(className, 'py-8 block-setting')} style={blockSettingStyle(settings)}>
      <div
        className={cn(
          ' container grid grid-cols-2 gap-x-8 gap-y-12',
          'md:grid-cols-3',
          'md:grid-cols-5',
          'md:grid-cols-4',
          { [`md:grid-cols-${settings?.layout?.slice(0, 1)}`]: settings?.layout },
        )}
      >
        {items?.map((item) => (
          <motion.div
            key={item.id}
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}>
            {item.media && <Media resource={item.media} imgClassName="mx-auto" />}
            {item.content && <RichText data={item.content as DefaultTypedEditorState} />}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default FeatureClient
