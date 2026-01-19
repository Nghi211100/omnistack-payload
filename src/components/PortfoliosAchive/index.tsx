'use client'

import React, { useEffect, useState } from 'react'
import Combobox from './Combobox'
import { Category, Portfolio } from '@/payload-types'
import Portfolios from './Postfolios'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

export type Props = {
  portfolios: Portfolio[]
  categories: Category[]
}

const PortfolioArchive: React.FC<Props> = (props) => {
  const t = useTranslations()

  const searchParams = useSearchParams()
  const cate = searchParams.get('cate')

  const { portfolios, categories } = props

  const [portfoliosFilter, setPortfoliosFilter] = useState<Portfolio[]>()
  const [loadMore, setLoadMore] = useState(1)
  const loadProduct = () => {
    setPortfoliosFilter(
      cate
        ? portfolios.filter(
            (p) =>
              cate.includes(
                typeof p.categories === 'object' ? p.categories?.slug || 'all' : 'all',
              ) === true,
          )
        : portfolios,
    )
  }

  useEffect(() => {
    loadProduct()
  }, [cate])

  useEffect(() => {
    return () => {
      localStorage.setItem('scrollPosition', String(window.scrollY))
    }
  }, [cate])

  useEffect(() => {
    const scrollPosition = localStorage.getItem('scrollPosition')
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition))
      localStorage.removeItem('scrollPosition')
    }
  }, [cate])

  const handleLoad = () => {
    if (loadMore * 9 >= (portfoliosFilter?.length || 99999)) {
      setLoadMore(1)
    } else setLoadMore(loadMore + 1)
  }
  return (
    <div className="md:grid md:grid-cols-12 mx-auto lg:max-w-[1200px]">
      <div className="col-span-2">
        <Combobox category={categories} />
      </div>
      <div className="bg-white dark:bg-[#001e3c] col-span-10">
        <Portfolios portfolios={portfoliosFilter?.slice(0, 9 * loadMore)} />
        <button
          onClick={() => handleLoad()}
          className={`${
            loadMore * 9 >= (portfoliosFilter?.length || 99999)
              ? 'bg-gray-300 hover:bg-gray-400 text-black dark:bg-gray-500 hover:dark:bg-gray-600 dark:text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          } ml-6 px-4 py-3 mb-16 rounded-xl  font-medium`}
        >
          {loadMore * 9 >= (portfoliosFilter?.length || 99999) ? t('hide') : t('loadMore')}
        </button>
      </div>
    </div>
  )
}

export default PortfolioArchive
