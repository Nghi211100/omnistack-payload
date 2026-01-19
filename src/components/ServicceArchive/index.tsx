'use client'

import { Service } from '@/payload-types'
import Link from 'next/link'
import Slider from 'react-slick'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import Card from './Card'
import { useTranslations } from 'next-intl'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { CMSLink } from '../Link'

const settingsDesk = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
}
const settingsMobile = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 3000,
  arrows: false,
}

export default function ServicesArchive({ services }: { services: Service[] }) {
  const t = useTranslations()
  return (
    <div className="container px-5 sm:px-8">
      <div className="mx-auto pt-8 max-w-2xl lg:max-w-[1200px] space-y-4 md:space-y-6">
        <div className="md:hidden block">
          <Slider {...settingsMobile}>
            {services.map((service) => (
              <div key={service.id} className='!px-2 md:!px-4'>
                <Card
              image={service.image}
              description={service.description as DefaultTypedEditorState}
              title={service.title}         
            />
            </div>
            ))}
          </Slider>
        </div>
        <div className="hidden md:block">
          <Slider {...settingsDesk}>
            {services.map((service) => (
              <div key={service.id}>
                <Card
                  image={service.image}
                  description={service.description as DefaultTypedEditorState}
                  title={service.title}
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="pt-4 md:pt-6 mx-auto w-max">
          <CMSLink
            url={'/services'}
            appearance={'default'}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl h-max w-max"
          >
            {t('viewDetail')}
          </CMSLink>
        </div>
      </div>
    </div>
  )
}
