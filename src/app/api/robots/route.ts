import { getServerSideURL } from '@/utilities/getURL'
import { NextResponse } from 'next/server'

export async function GET() {
  const url = await getServerSideURL()
  const defaultRobotContent = `User-agent: *\nDisallow: /admin/\nSitemap: ${url}/sitemap.xml\n`

  return new NextResponse(defaultRobotContent, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-store, max-age=0, must-revalidate',
    },
  })
}
