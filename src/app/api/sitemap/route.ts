import { getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { headers } from 'next/headers'
import { cookies } from 'next/headers'
export async function GET() {
  try {
    const headersList = await headers()
    const host = headersList.get('host')
    const protocol = host?.includes('localhost') ? 'http' : 'https'

    if (!host) {
      return new Response('Host not found', { status: 400 })
    }
    const sitemap: ISitemapField[] = [
      {
        loc: `${protocol}://${host}/pages-sitemap.xml`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 1.0,
      },
      {
        loc: `${protocol}://${host}/posts-sitemap.xml`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.8,
      },
    ]

    return getServerSideSitemap(sitemap)
  } catch (error) {
    console.error('Error generating sitemap index:', error)
    return new Response('Error generating sitemap index', { status: 500 })
  }
}
