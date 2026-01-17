'use client'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Media } from '../Media'
import { Review } from '@/payload-types'
import { cn } from '@/utilities/ui'

const ReviewsArchive = ({ reviews }: { reviews: Review[] }) => {
  const settingsDesk = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: false,
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

  return (
    <section className="bg-[linear-gradient(85deg,#0e3a68_20%,#158eb1_100%)]">
      <div className="container">
        <Slider {...settingsDesk} className="h-full md:!block !hidden">
          {reviews.map((review) => (
            <div
              className={cn('!pr-6 !pl-8 md:flex md:flex-col py-16 h-full review')}
              key={review.id}
            >
              <blockquote className="mt-6 md:flex md:flex-grow md:flex-col">
                <div className="relative text-base font-medium text-white md:flex-grow">
                  <svg
                    className="absolute top-0 left-0 h-8 w-8 -translate-x-3 -translate-y-2 transform text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="relative">{review.content}</p>
                </div>
                <footer className="mt-8">
                  <div className="flex items-center">
                    <div className="inline-flex flex-shrink-0 rounded-full border-2 border-white">
                      <Media
                        className="h-12 w-12 rounded-full overflow-hidden"
                        resource={review.image}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-base font-medium text-white">{review.name}</div>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          ))}
        </Slider>
        <Slider {...settingsMobile} className="h-full block md:!hidden">
          {reviews.map((review) => (
            <div className={cn('py-6 !px-4 h-full !border-0')} key={review.id}>
              <blockquote className="mt-6 md:flex md:flex-grow md:flex-col">
                <div className="relative text-base font-medium text-white md:flex-grow">
                  <svg
                    className="absolute top-0 left-0 h-8 w-8 -translate-x-3 -translate-y-2 transform text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="relative">{review.content}</p>
                </div>
                <footer className="mt-8">
                  <div className="flex items-center">
                    <div className="inline-flex flex-shrink-0 rounded-full border-2 border-white">
                      <Media
                        className="h-12 w-12 rounded-full overflow-hidden"
                        resource={review.image}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-base font-medium text-white">{review.name}</div>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default ReviewsArchive
