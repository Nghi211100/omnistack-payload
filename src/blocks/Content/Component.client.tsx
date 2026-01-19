'use client'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { CMSLink } from '../../components/Link'
import { blockSettingStyle } from '@/utilities/blockSettingStyle'
import { motion } from 'motion/react'

export const ContentClient = ({ props }: { props: ContentBlockProps }) => {
    const { columns, settings } = props

    const colsSpanClasses = {
        full: '12',
        half: '6',
        oneThird: '4',
        twoThirds: '8',
    }

    return (
        <div className="py-8 block-setting" style={blockSettingStyle(settings)}>
            <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16 container ">
                {columns &&
                    columns.length > 0 &&
                    columns.map((col, index) => {
                        const { enableLink, link, richText, size } = col

                        return (
                            <motion.div
                                whileInView={{
                                    opacity: [0,1],
                                    scale: [0.6, 1]
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                }
                                }
                                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                                    'md:col-span-2': size !== 'full',
                                })}
                                key={index}
                            >
                                {richText && <RichText data={richText} enableGutter={false} />}

                                {enableLink && <CMSLink {...link} />}
                            </motion.div>
                        )
                    })}
            </div>
        </div>
    )
}
