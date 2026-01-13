import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 86400 // 24 hours

const LOCALES = ['en', 'vi'] as const

export async function GET(request: NextRequest) {
  try {
    const hostname = request.headers.get('host') || ''
    const protocol = hostname.includes('localhost') ? 'http' : 'https'
    const origin = `${protocol}://${hostname}`

    const payload = await getPayload({ config: configPromise })

    let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
`

    sitemapXml += `  <url>
    <loc>${origin}/en/post</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${origin}/vi/post</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`

    const postsByLocale: Record<string, Map<string, string>> = {
      en: new Map(),
      vi: new Map(),
    }

    for (const locale of LOCALES) {
      let page = 1
      let hasMore = true

      while (hasMore) {
        const result = await payload.find({
          collection: 'posts',
          where: { _status: { equals: 'published' } },
          locale,
          limit: 500,
          page,
          depth: 0,
          select: {
            slug: true,
            updatedAt: true,
          },
        })

        result.docs.forEach((doc) => {
          if (doc.slug) {
            postsByLocale[locale].set(doc.slug as string, doc.updatedAt as string)
          }
        })

        hasMore = result.hasNextPage
        page++

        if (page > 10) {
          console.warn(`[sitemap/posts] Safety limit reached for locale ${locale}`)
          break
        }
      }
    }

    // EN as canonical source
    postsByLocale.en.forEach((updatedAt, slug) => {
      sitemapXml += `  <url>
    <loc>${origin}/en/post/${slug}</loc>
    <lastmod>${new Date(updatedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`
    })

    // VI as canonical source
    postsByLocale.vi.forEach((updatedAt, slug) => {
      sitemapXml += `  <url>
    <loc>${origin}/vi/post/${slug}</loc>
    <lastmod>${new Date(updatedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`
    })

    sitemapXml += `</urlset>`

    return new NextResponse(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
      },
    })
  } catch (error) {
    console.error('Error generating posts sitemap:', error)

    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" />`,
      {
        headers: {
          'Content-Type': 'application/xml',
          'Cache-Control': 'no-store',
        },
      },
    )
  }
}
