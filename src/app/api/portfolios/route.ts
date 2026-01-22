import { getPayload, TypedLocale } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export async function GET(req: Request){
    const {searchParams} = new URL(req.url)
    const page = Number(searchParams.get('page'))
    const categorySlug = searchParams.get('category')
    const slugs = categorySlug?.split(',').filter(Boolean) ?? []
    const locale = searchParams.get('locale')
    
    const payload = await getPayload({ config: configPromise })
    
    const where = categorySlug !== 'null' ?  {
        'categories.slug': {
          in: slugs 
        }
      }: undefined

    const result = await payload.find({
        collection: 'portfolios',
        depth: 1,
        locale: locale as TypedLocale || 'en',
        limit: 6,
        page: page,
        sort: ['name', '-updatedAt'],
        where
      })
      return NextResponse.json(result)
}