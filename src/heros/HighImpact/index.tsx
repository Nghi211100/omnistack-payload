'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { motion } from 'motion/react'

export const HighImpactHero: React.FC<Page['hero']> = ({ link, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="relative isolate overflow-hidden">
      <div className="relative isolate overflow-hidden mx-auto sm:px-8">
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 dark:stroke-gray-400 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
          />
        </svg>
        <div className="mx-auto max-w-7xl px-6 pb-20 sm:py-24 lg:flex lg:px-8 text-left">
          <motion.div
            initial={{
              x: -100,
              opacity: 0,
            }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 flex flex-col justify-center"
          >
            {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
            <CMSLink {...link} />
          </motion.div>
          <motion.div
            initial={{
              x: 100,
              opacity: 0,
            }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="mx-auto mt-10 flex max-w-2xl sm:mt-16 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32"
          >
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="-m-2 rounded-xl bg-gray-900/5 dark:bg-[#005eff]/10 p-2 ring-1 ring-inset ring-gray-900/10 dark:ring-[#183b61] lg:-m-4 lg:rounded-2xl lg:p-4">
                <Media
                  resource={media}
                  alt="App screenshot"
                  imgClassName="object-cover w-[76rem] max-h-[500px] rounded-md shadow-2xl ring-1 ring-gray-900/10 dark:ring-[#183b61]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
