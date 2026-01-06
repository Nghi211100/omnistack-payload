import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

// CRITICAL: Cache sitemaps aggressively (24 hours) to prevent database overload from crawlers
export const dynamic = 'force-dynamic'
export const revalidate = 86400 // 24 hours

export async function GET(request: NextRequest) {
  try {
    // Get hostname from request
    const hostname = request.headers.get('host') || ''
    const protocol = hostname.includes('localhost') ? 'http' : 'https'
    const baseUrl = `${protocol}://${hostname}/en`

    // Initialize Payload client
    const payload = await getPayload({ config: configPromise })

    // Start building the XML
    let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`
    // Add the post index page
    sitemapXml += `  <url>
    <loc>${baseUrl}/post</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`

    // Get posts for this brand with pagination to handle > 1000 posts
    // CRITICAL: Process in batches to prevent timeouts and connection pool exhaustion
    const allPosts: Array<{ slug: string; updatedAt: string }> = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      const postsResult = await payload.find({
        collection: 'posts',
        where: {
          _status: {
            equals: 'published',
          },
        },
        limit: 500, // Process in batches of 500
        page,
        depth: 0, // No relation population needed for sitemap
        select: {
          slug: true,
          updatedAt: true,
        },
      })

      allPosts.push(
        ...postsResult.docs
          .filter((post) => Boolean(post.slug))
          .map((post) => ({
            slug: post.slug as string,
            updatedAt: post.updatedAt as string,
          })),
      )

      hasMore = postsResult.hasNextPage
      page++

      // Safety limit: prevent infinite loops
      if (page > 10) {
        console.warn(`[sitemap/posts] Reached safety limit of 10 pages (5000 posts)`)
        break
      }
    }

    // Add post to sitemap
    allPosts.forEach((post) => {
      sitemapXml += `  <url>
    <loc>${baseUrl}/post/${post.slug}</loc>
    <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`
    })

    // Close the XML
    sitemapXml += `</urlset>`

    // Return the sitemap XML with aggressive caching (24 hours)
    return new NextResponse(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600', // 24h cache, 1h stale
      },
    })
  } catch (error) {
    console.error('Error generating posts sitemap:', error)

    // Fallback to a minimal sitemap in case of error
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`

    return new NextResponse(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
      },
    })
  }
}
