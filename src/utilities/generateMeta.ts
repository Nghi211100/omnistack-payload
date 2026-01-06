import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { getCanonicalUrl } from './getCanonicalUrl'

const availableLocales = ['en', 'vi']

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  locale?: string
  basePath?: string
  subPath?: string
}): Promise<Metadata> => {
  const { doc, locale = 'en', basePath = '', subPath = '' } = args

  let slugPart = ''
  if (doc?.slug) {
    slugPart = Array.isArray(doc.slug)
      ? doc.slug.join('/')
      : doc.slug + (subPath ? '/' + subPath : '')
  }
  const cleanedBasePath = slugPart.replace(/^\/?home\/?/, '').replace(/^\/+|\/+$/g, '')

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title ? doc?.meta?.title : 'Omnistack Website'

  const serverUrl = await getServerSideURL()

  const languages: Record<string, string> = {}

  await Promise.all(
    availableLocales?.map(async (hreflang) => {
      const alternateUrl = await getCanonicalUrl({
        locale: hreflang,
        segments: [basePath, cleanedBasePath],
        origin: serverUrl,
      })
      languages[hreflang] = alternateUrl
    }) || [],
  )
  const canonicalUrl = getCanonicalUrl({
    locale,
    segments: [basePath, cleanedBasePath],
    origin: serverUrl,
  })

  const alternateUrlDefault = await getCanonicalUrl({
    locale: 'en',
    segments: [basePath, cleanedBasePath],
    origin: serverUrl,
  })
  languages['x-default'] = alternateUrlDefault

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: canonicalUrl,
    }),
    title,
    icons: '/icons/logo_only.webp',
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
  }
}
