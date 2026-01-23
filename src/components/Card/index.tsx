'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import React, { Fragment } from 'react'
import type { Post } from '@/payload-types'
import { Link } from '@/i18n/routing'
import { formatDateTime } from '@/utilities/formatDateTime'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'publishedAt'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'blog'
  showCategories?: boolean
  title?: string;

}> = (props) => {
  const t = useTranslations()
  const { card } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, publishedAt } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full border border-[#00000014] rounded-[0.375rem] overflow-hidden">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'number' && <Link href={href}><Image className='aspect-[1200/630]' src={metaImage.sizes?.medium?.url as string} alt={metaImage.alt || ''} width={488} height={256} /></Link>}
      </div>
      <div className="py-4">
        {showCategories && hasCategories && (
          <div className="text-sm mb-2 text-primary uppercase font-semibold">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Link key={index} href={`/blog/category/${category.slug}`}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Link>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className='font-bold text-2xl'>
            <Link href={href}>{titleToUse}</Link>
          </div>
        )}
        {description && <div className="mt-2 text-[#4b5563]">{description && <p>{sanitizedDescription}</p>}</div>}
        {publishedAt && <p className='pt-4 text-sm text-[#4b5563]'>
          <span className='font-bold'>{t('posts.publishedAt')}:</span> {formatDateTime(publishedAt as string)}
        </p>}
      </div>
    </article>
  )
}
