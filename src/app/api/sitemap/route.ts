import { getServerSideSitemapIndex } from 'next-sitemap'
import { unstable_cache } from 'next/cache'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 86400 // 24 hours

const getPagesSitemap = unstable_cache(
  async (originalUrl: string) => {
    const sitemap = [
      `${originalUrl}/pages-sitemap.xml`,
       `${originalUrl}/blog-sitemap.xml`,
    ]

    return [...sitemap]
  },
  ['sitemap-index'],
  {
    tags: ['sitemap-index'],
    revalidate: 8600,
  },
)

const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
}

export async function GET(request: NextRequest) {
  try {
    const hostname = request.headers.get('host')
    const protocol = hostname?.includes('localhost') ? 'http' : 'https'
    const originalUrl = `${protocol}://${hostname}`

    if (!hostname) {
      return new Response('Host not found', { status: 400 })
    }
    const sitemap = await getPagesSitemap(originalUrl)

    return getServerSideSitemapIndex(sitemap, CACHE_HEADERS)
  } catch (error) {
    console.error('Error generating sitemap index:', error)
    return new Response('Error generating sitemap index', { status: 500 })
  }
}
