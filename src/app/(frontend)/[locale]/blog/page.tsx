import type { Metadata } from 'next/types'

import { PostsArchive } from '@/components/PostsArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { queryPageBySlug } from '../[slug]/page'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'

export const revalidate = 600

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { locale = 'en' } = await paramsPromise;
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 9,
    locale,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      authors: true,
      publishedAt: true
    },
  })

  const page = await queryPageBySlug({
    slug: 'blog',
    locale: locale,
  })

  const categories = await payload.find({
    collection: 'categories',
    depth: 1,
    limit: 9,
    locale,
    overrideAccess: false,
    where: {
      type: {
        equals: 'blog'
      }
    }
  })

  return (
    <div className="pt-16">
      <PageClient />
      {page?.hero && <RenderHero {...page?.hero} />}

      {/* 
      <div className="container my-12">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={9}
          totalDocs={posts.totalDocs}
        />
      </div> */}

      <div className='my-12'>
        <PostsArchive posts={posts.docs} isBlogPage categories={categories.docs} />
      </div>

      <div className="container my-12">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} position='right' />
        )}
      </div>
      {page?.layout && <RenderBlocks blocks={page?.layout} />}
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale = 'en' } = await paramsPromise
  const page = await queryPageBySlug({
    slug: 'blog',
    locale: locale,
  })

  return generateMeta({ doc: page, locale })
}
