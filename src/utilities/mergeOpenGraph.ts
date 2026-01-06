import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Transform Your Business with Innovative Solutions from OmniStack - Your partner in technology solutions - Empowering your digital world with innovative solutions.',
  images: [
    {
      url: `${getServerSideURL()}/logo-web.webp`,
    },
  ],
  siteName: 'Omnistack Company',
  title: 'Omnistack Company',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
