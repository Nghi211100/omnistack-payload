import type { Metadata } from 'next/types'
import { PostsArchive } from '@/components/PostsArchive'
import { Pagination } from '@/components/Pagination'
import { TypedLocale } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import { queryCategoryByType, queryPageBySlug, queryPostsByCategorySlug } from '@/_data'

export const revalidate = 600

type Args = {
    params: Promise<{
        slug: string;
        locale: TypedLocale
    }>
}

export default async function Page({ params: paramsPromise }: Args) {
    const { locale = 'en', slug } = await paramsPromise;

    const posts = await queryPostsByCategorySlug({ slug, locale })

    const page = await queryPageBySlug({ slug: 'blog', locale })

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
    const { locale = 'en', slug } = await paramsPromise
    const page = await queryPageBySlug({
        slug: 'blog',
        locale: locale,
    })

    return generateMeta({ doc: page, locale, subPath: `category/${slug}` })
}
