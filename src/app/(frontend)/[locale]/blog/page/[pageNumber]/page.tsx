import type { Metadata } from 'next/types'

import { PostsArchive } from '@/components/PostsArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import { queryPageBySlug } from '../../../[slug]/page'
import { generateMeta } from '@/utilities/generateMeta'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
    locale: TypedLocale
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber, locale = 'en' } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 9,
    locale,
    page: sanitizedPageNumber,
    overrideAccess: false,
  })

  const page = await queryPageBySlug({
    slug: 'blog',
    locale: locale,
  })

  return (
    <div className="pt-16 overflow-hidden">
      <PageClient />
      
      {
        page?.hero ? <RenderHero {...page?.hero} /> : (
          <div className="container mb-16">
            <div className="prose dark:prose-invert max-w-none">
              <h1>Blog</h1>
            </div>
          </div>
        )
      }

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={9}
          totalDocs={posts.totalDocs}
        />
      </div>

      <PostsArchive posts={posts.docs} />

      <div className="container">
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
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

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
