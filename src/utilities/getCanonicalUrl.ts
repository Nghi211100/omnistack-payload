import { getServerSideURL } from './getURL'
export function getCanonicalUrl({
  locale,
  segments = [],
  origin = process.env.NEXT_PUBLIC_SITE_URL,
}: {
  locale: string
  segments?: string[]
  origin?: string
}) {
  const siteOrigin = origin || getServerSideURL()
  return `${siteOrigin}/${[locale, ...segments].filter(Boolean).join('/')}`
}
