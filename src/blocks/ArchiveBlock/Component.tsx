import type {
  Post,
  ArchiveBlock as ArchiveBlockProps,
  Service,
  Review,
  Category,
  Portfolio,
} from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { PostsArchive } from '@/components/PostsArchive'
import ServicesArchive from '@/components/ServicceArchive'
import ReviewsArchive from '@/components/ReviewArchive'
import PortfolioArchive from '@/components/PortfoliosAchive'
import { cookies } from 'next/headers'
import { blockSettingStyle } from '@/utilities/blockSettingStyle'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    relationTo,
    settings,
  } = props

  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as TypedLocale

  const limit = limitFromProps || 3

  let posts: Post[] = []
  let services: Service[] = []
  let reviews: Review[] = []
  let categoriesData: Category[] = []
  let portfolios: Portfolio[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })
    if (relationTo === 'posts') {
      const fetchedPosts = await payload.find({
        collection: 'posts',
        locale: locale,
        depth: 1,
        limit,
        ...(flattenedCategories && flattenedCategories.length > 0
          ? {
              where: {
                categories: {
                  in: flattenedCategories,
                },
              },
            }
          : {}),
      })
      posts = fetchedPosts.docs
    }
    if (relationTo === 'services') {
      const fetchedServices = await payload.find({
        collection: 'services',
        locale: locale,
        depth: 1,
        limit,
        ...(flattenedCategories && flattenedCategories.length > 0
          ? {
              where: {
                categories: {
                  in: flattenedCategories,
                },
              },
            }
          : {}),
      })
      services = fetchedServices.docs
    }
    if (relationTo === 'reviews') {
      const fetchedReviews = await payload.find({
        collection: 'reviews',
        depth: 1,
        locale: locale,
        limit,
        ...(flattenedCategories && flattenedCategories.length > 0
          ? {
              where: {
                categories: {
                  in: flattenedCategories,
                },
              },
            }
          : {}),
      })
      reviews = fetchedReviews.docs
    }
    if (relationTo === 'portfolios') {
      const fetchedPortfolio = await payload.find({
        collection: 'portfolios',
        depth: 1,
        locale: locale,
        limit,
        sort: ['name', '-updatedAt'],
        ...(flattenedCategories && flattenedCategories.length > 0
          ? {
              where: {
                categories: {
                  in: flattenedCategories,
                },
              },
            }
          : {}),
      })
      portfolios = fetchedPortfolio.docs

      const fetchedCategories = await payload.find({
        collection: 'categories',
        depth: 1,
        locale: locale,
        limit,
        sort: ['slug', '-updatedAt'],
        ...(flattenedCategories && flattenedCategories.length > 0
          ? {
              where: {
                categories: {
                  in: flattenedCategories,
                },
              },
            }
          : {}),
      })
      categoriesData = fetchedCategories.docs
    }
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  const renderArchive = () => {
    switch (relationTo) {
      case 'posts':
        return <PostsArchive posts={posts} />
      case 'services':
        return <ServicesArchive services={services} />
      case 'reviews':
        return <ReviewsArchive reviews={reviews} />
      case 'portfolios':
        return <PortfolioArchive categories={categoriesData} portfolios={portfolios} />
      default:
        return null
    }
  }

  return (
    <div className="py-8 block-setting" id={`block-${id}`} style={blockSettingStyle(settings)}>
      {introContent && (
        <div className="container">
          <RichText data={introContent} enableGutter={false} />
        </div>
      )}
      {renderArchive()}
    </div>
  )
}
