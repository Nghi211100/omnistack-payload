import type { Metadata } from 'next/types'
import { TypedLocale } from 'payload'
import React from 'react'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import { queryCategoryByType, queryPageBySlug } from '@/_data'
import PageClient from './page.client'
import DisplayingPortfolios from '@/components/DisplayingPortfolios'

export const revalidate = 600

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { locale = 'en' } = await paramsPromise;

  const page = await queryPageBySlug({
    slug: 'portfolio',
    locale: locale,
  })

  const categories = await queryCategoryByType({ locale, type: 'service' })

  return (
    <div className="pt-16">
        <PageClient />
      {page?.hero && <RenderHero {...page?.hero} />}
      
      {page?.layout && <RenderBlocks blocks={page?.layout} />}

      <div className='my-12'>
        <DisplayingPortfolios categories={categories.docs} locale={locale}/>
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale = 'en' } = await paramsPromise
  const page = await queryPageBySlug({
    slug: 'portfolio',
    locale: locale,
  })

  return generateMeta({ doc: page, locale })
}
