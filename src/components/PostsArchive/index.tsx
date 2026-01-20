import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'
import Sidebar from '../Sidebar'
import { Category } from '@/payload-types'

export type Props = {
  categories?: Category[]
  posts: CardPostData[]
  isBlogPage?: boolean
}

export const PostsArchive: React.FC<Props> = (props) => {
  const { posts, isBlogPage, categories } = props

  if (isBlogPage) {
    return (
      <div className={cn('container')}>
        <div className='md:grid grid-cols-10 w-full gap-16'>
          <div className='col-span-2'>
            <Sidebar categories={categories} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 col-span-8">
            {posts?.map((result, index) => {
              if (typeof result === 'object' && result !== null) {
                return (
                  <div className="col-span-1" key={index}>
                    <Card className="h-full" doc={result} relationTo="blog" showCategories />
                  </div>
                )
              }
              return null
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('container')}>
      <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-6 gap-x-6 lg:gap-y-12 lg:gap-x-12 xl:gap-x-12">
        {posts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div className="col-span-4" key={index}>
                <Card className="h-full" doc={result} relationTo="blog" showCategories />
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
