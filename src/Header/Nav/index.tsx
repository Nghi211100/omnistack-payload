'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { motion } from 'motion/react'

export const HeaderNav: React.FC<{ data: HeaderType; currentPath: string }> = ({
  data,
  currentPath,
}) => {
  const navItems = data?.navItems || []

  return (
    <nav className="md:flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return (
          <motion.div  whileHover={{scale: 1.05, y:-4}} key={i}>
            <CMSLink
            {...link}
            className={cn(
              'px-2.5 py-[22px] inline-flex items-center text-base font-medium text-gray-900 dark:text-gray-50 hover:border-blue-500 hover:border-b-2',
              {
                'border-blue-500 border-b-2': link.url === currentPath,
              },
            )}
          />
          </motion.div>
          
        )
      })}
    </nav>
  )
}
