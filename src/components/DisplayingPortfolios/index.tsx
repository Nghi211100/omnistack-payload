'use client'

import React from 'react'
import Filter from './Filter'
import { Category } from '@/payload-types'
import {portfolioHooks} from './portfolio.hook'
import { TypedLocale } from 'payload'
import Loading from './Loading'
import Portfolio from '../PortfoliosArchive/Portfolio'

export type Props = {
  categories?: Category[];
  locale: TypedLocale
}

const DisplayingPortfolios: React.FC<Props> = (props) => {
  const { categories, locale } = props

  const {lastPortfolioElementRef, portfolioData, loading} = portfolioHooks({locale})

  return (
    <div className="md:grid md:grid-cols-12 container">
      <div className="col-span-2">
       {categories && <Filter categories={categories} />} 
      </div>
      <div className="bg-white dark:bg-[#001e3c] col-span-10">
      <div className="py-6 md:pt-16 md:pb-8 px-4 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-6 xl:grid-cols-3">
        {portfolioData?.map((portfolio) => (
          <div key={portfolio.id} className="group relative">
            <Portfolio portfolio={portfolio} />
          </div>
        ))}
      </div>
    </div>
        <div ref={lastPortfolioElementRef} className='px-4 sm:px-6'>{loading&& <Loading length={3}/>}</div>
      </div>
    </div>
  )
}

export default DisplayingPortfolios
