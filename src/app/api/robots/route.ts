import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  // default restrictive robots.txt
  const defaultRobotContent = `User-agent: *\nDisallow: /\n`

  return new NextResponse(defaultRobotContent, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-store, max-age=0, must-revalidate',
    },
  })
}
