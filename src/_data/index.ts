import { draftMode } from 'next/headers';
import { getPayload, TypedLocale } from 'payload';
import { cache } from 'react';
import configPromise from '@payload-config'

export const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
    const { isEnabled: draft } = await draftMode()
  
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      where: {
        slug: {
          equals: slug,
        },
      },
      locale,
    })
  
    return result.docs?.[0] || null
  })

export const queryPostBySlug = cache(async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
    const { isEnabled: draft } = await draftMode()
  
    const payload = await getPayload({ config: configPromise })
  
    const result = await payload.find({
      collection: 'posts',
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      locale,
      where: {
        slug: {
          equals: slug,
        },
      },
    })
  
    return result.docs?.[0] || null
  })

export const queryPostsByCategorySlug = async ({ slug, locale }: { slug: string; locale: TypedLocale })  => {
    const payload = await getPayload({ config: configPromise })
    const posts = await payload.find({
        collection: 'posts',
        depth: 1,
        limit: 8,
        locale,
        overrideAccess: false,
        select: {
            title: true,
            slug: true,
            categories: true,
            meta: true,
            publishedAt: true,
        },
        where: {
            'categories.slug': {
                equals: slug
            }
        },
        sort: '-publishedAt'
    })

    return posts
  }

export const queryCategoryByType = async({locale, type}:{locale: TypedLocale, type: string}) => {
    const payload = await getPayload({ config: configPromise })
    const categories = await payload.find({
        collection: 'categories',
        depth: 1,
        limit: 9,
        locale,
        overrideAccess: false,
        where: {
            type: {
                equals: type
            }
        }
    })
    return categories
}

export const queryAllPosts = async({locale}:{locale: TypedLocale})=>{
  const payload = await getPayload({ config: configPromise })
    const posts = await payload.find({
        collection: 'posts',
        depth: 1,
        limit: 8,
        locale,
        overrideAccess: false,
        select: {
          title: true,
          slug: true,
          categories: true,
          meta: true,
          publishedAt: true,
        },
        sort: '-publishedAt'
      })
    return posts
}

export const queryAdjacentPosts = async ({
    currentSlug,
    locale,
  }: {
    currentSlug: string
    locale: TypedLocale
  }) => {
    const payload = await getPayload({ config: configPromise })

    const currentPost = await queryPostBySlug({locale, slug: currentSlug})
  
    if (!currentPost) return { prev: undefined, next: undefined }
  
    // Get previous post (newer post)
    const { docs: prevPosts } = await payload.find({
      collection: 'posts',
      locale,
      draft: false,
      depth: 0, 
      where: {
        and: [
          { publishedAt: { greater_than: currentPost.publishedAt } },
        ],
      },
      sort: 'publishedAt',
      limit: 1,
    })
  
    // Get next post (older post)
    const { docs: nextPosts } = await payload.find({
      collection: 'posts',
      locale,
      draft: false,
      depth: 0, 
      where: {
        and: [
          { publishedAt: { less_than: currentPost.publishedAt } },
        ],
      },
      sort: '-publishedAt',
      limit: 1,
    })
  
    return {
      prev: prevPosts[0],
      next: nextPosts[0],
    }
  }