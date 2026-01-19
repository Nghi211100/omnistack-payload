'use client'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Review } from '@/payload-types'
import { cn } from '@/utilities/ui'
import ReviewCard from './ReviewCard'

const ReviewsArchive = ({ reviews, isBgCustom }: { reviews: Review[], isBgCustom?: boolean }) => {
  const settingsDesk = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  const settingsMobile = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  }

  return (
    <section className={cn({'bg-[linear-gradient(85deg,#0e3a68_20%,#158eb1_100%)]': !isBgCustom})}>
      <div className="container">
        <Slider {...settingsDesk} className="h-full md:!block !hidden">
          {reviews.map((review) => (
            <div
              className={cn('!pr-6 !pl-8 md:flex md:flex-col !py-16 h-full review')}
              key={review.id}
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </Slider>
        <Slider {...settingsMobile} className="h-full block md:!hidden">
          {reviews.map((review) => (
            <div className={cn('!py-10 !px-4 h-full !border-0')} key={review.id}>
              <ReviewCard review={review} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default ReviewsArchive
