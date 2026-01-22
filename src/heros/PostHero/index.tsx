import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post
  const t = useTranslations();

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="relative flex-col items-end">
      <div className="pb-2 relative">
        <div className='absolute -top-2 lg:top-6 left-0 lg:-left-16 xl:left-0 text-[#4b5563] font-medium hover:font-bold'><Link href={'/blog'}>{'<<  Blog'}</Link></div>
        <div className="max-w-[56rem] mx-auto pt-6">
          <div className="uppercase text-sm md:text-base mb-2 font-semibold text-primary">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    <Link href={`/blog/category/${category.slug}`}>{titleToUse}</Link>
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>

          <div className="mb-10">
            <h1 className="text-3xl lg:text-[3.375rem] lg:leading-[3.5rem] font-bold">{title}</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-1 justify-between">
            {hasAuthors && (
              <p className="text-sm font-semibold">{t('posts.author')}: <span className='font-normal text-base'>{formatAuthors(populatedAuthors)}</span></p>
            )}
            {publishedAt && (
              <p className="text-sm font-semibold">{t("posts.publishedAt")}: <span className='font-normal text-base'>{formatDateTime(publishedAt)}</span></p>
            )}
          </div>
        </div>
      </div>
      {heroImage && typeof heroImage !== 'string' && (
        <Media priority imgClassName="object-contain" resource={heroImage} />
      )}
    </div>
  )
}
