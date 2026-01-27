import type { Metadata } from 'next/types'

import { PostsArchive } from '@/components/PostsArchive'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import { generateMeta } from '@/utilities/generateMeta'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { queryCategoryByType, queryPageBySlug, queryPostsByCategorySlug } from '@/_data'

export const revalidate = 600

type Args = {
  params: Promise<{
    slug: string;
    pageNumber: string
    locale: TypedLocale
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber, locale = 'en', slug } = await paramsPromise

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await queryPostsByCategorySlug({ slug, locale })

  const page = await queryPageBySlug({
    slug: 'blog',
    locale: locale,
  })

  const categories = await queryCategoryByType({ locale, type: 'blog' })

  return (
    <div className="pt-16">
      <PageClient />
      {page?.hero && <RenderHero {...page?.hero} />}

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
  const { locale = 'en', slug, pageNumber } = await paramsPromise
  const page = await queryPageBySlug({
    slug: 'blog',
    locale: locale,
  })

  return generateMeta({ doc: page, locale, subPath: `category/${slug}/page/${pageNumber}` })
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 8)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
