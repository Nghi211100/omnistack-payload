import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

// Create the base middleware with i18n support
const intlMiddleware = createMiddleware(routing)

const getLocalePrefix = (segments: string[]): string | null => {
  if (segments.length === 0) return null
  const firstSegment = segments[0]
  if (firstSegment && routing.locales.includes(firstSegment as any)) {
    return firstSegment
  }
  return null
}

// Detect and prevent locale duplication (e.g., /en/en/page or /en/en/en/page)
// Only flags as duplicate if the same locale appears consecutively
const hasDuplicateLocalePrefixes = (segments: string[]): boolean => {
  if (segments.length < 2) return false

  // Check if first two segments are both valid locales AND they're the same
  const firstSegment = segments[0]
  const secondSegment = segments[1]

  return (
    routing.locales.includes(firstSegment as any) &&
    routing.locales.includes(secondSegment as any) &&
    firstSegment === secondSegment
  )
}

// Define static file extensions that should be excluded from locale routing
const staticFileExtensions = [
  '.js',
  '.css',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.ico',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot',
]

// Check if the path is a static file
const isStaticFile = (pathname: string) => {
  return (
    staticFileExtensions.some((ext) => pathname.endsWith(ext)) ||
    pathname.startsWith('/icons/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/videos/')
  )
}

// Clean duplicate locale prefixes from segments
// Only removes consecutive identical locale prefixes (e.g., /en/en/page -> /en/page)
const cleanDuplicateLocalePrefixes = (segments: string[]): string => {
  if (segments.length < 2) return `/${segments.join('/')}`

  // Remove consecutive duplicate locale prefixes (same locale repeated)
  const cleanedSegments: string[] = []
  let lastLocale: string | null = null

  for (const segment of segments) {
    const isLocale = routing.locales.includes(segment as any)
    if (isLocale && lastLocale === segment) {
      // Skip this duplicate locale prefix (same as previous)
      continue
    }
    cleanedSegments.push(segment)
    lastLocale = isLocale ? segment : null
  }

  return `/${cleanedSegments.join('/')}`
}

const getPathnameSegments = (pathname: string): string[] => {
  return pathname.split('/').filter(Boolean)
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 1. Skip middleware for admin routes and static files (highest priority - no processing needed)
  if (pathname.startsWith('/admin') || isStaticFile(pathname)) {
    return NextResponse.next()
  }

  // Helper to split pathname into segments (cached version)
  const pathnameSegments = getPathnameSegments(pathname)

  // Ignore API & static files
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return
  }

  if (hasDuplicateLocalePrefixes(pathnameSegments)) {
    const cleanedPathname = cleanDuplicateLocalePrefixes(pathnameSegments)
    const redirectUrl = new URL(cleanedPathname, req.url)

    if (req.nextUrl.search) {
      redirectUrl.search = req.nextUrl.search
    }

    // Log the issue for debugging
    console.warn(
      `[Middleware] Detected duplicate locale prefixes in pathname: ${pathname}. Redirecting to: ${cleanedPathname}`,
    )

    return NextResponse.redirect(redirectUrl)
  }

  // First run the i18n middleware
  const response = await intlMiddleware(req)

  // Set NEXT_LOCALE cookie if pathname has locale prefix (using cached segments)
  const localePrefix = getLocalePrefix(pathnameSegments)
  if (localePrefix) {
    response.cookies.set('NEXT_LOCALE', localePrefix, {
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  }

  // Add custom header with the pathname for footer visibility check
  response.headers.set('x-pathname', pathname)

  return response
}
