import { useRouter } from '@/i18n/routing'
import { Category } from '@/payload-types'
import { ChevronDownIcon, ChevronUpIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'
import { usePathname, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function Filter({ categories }: { categories: Category[] }) {
  const t = useTranslations()
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const cateQuery = searchParams.get('category')

  const handleChange = (cateName: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (cateQuery) {
      const list = cateQuery.split(',')

      if (list.includes(cateName)) {
        // remove
        const next = list.filter((c) => c !== cateName)
        if (next.length === 0) {
          params.delete('category')
        } else {
          params.set('category', next.join(','))
        }
      } else {
        // add
        params.set('category', [...list, cateName].join(','))
      }
    } else {
      params.set('category', cateName)
    }
    const query = Object.fromEntries(params.entries())

    router.replace({ pathname, query }, { scroll: false })
  }

  const Options = (mobile?: boolean) => {
    return (
      <div
        className={`${mobile &&
          'absolute px-3 z-10 w-full bg-white dark:bg-[#001e3c] transition-all overflow-hidden border border-gray-200 dark:border-[#183b61] shadow-lg md:border-0'
          } ${mobile
            ? open
              ? 'h-max rounded-xl'
              : 'h-0 border-transparent dark:border-transparent'
            : 'block'
          }`}
      >
        {categories?.map((category) => (
          <div className="flex gap-2 pt-2" key={category.id}>
            <input
              id={category.slug + '-' + mobile ? 'mobile' : 'desktop'}
              name={category.slug}
              type="checkbox"
              className="h-4 w-4 hover:cursor-pointer rounded-md focus:[--tw-ring-offset-width:0px] focus:ring-0 border border-gray-300 outline-none bg-transparent dark:border-[#183b61] mt-[5px]"
              onChange={() => handleChange(category.slug)}
              checked={cateQuery?.includes(category.slug) || false}
            />
            <label
              htmlFor={category.slug + '-' + mobile ? 'mobile' : 'desktop'}
              className="font-medium text-black dark:text-white hover:cursor-pointer"
            >
              {category.title}
            </label>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="px-6 sm:px-8 md:pr-0 md:sticky top-24">
      <div className="hidden md:block">
        <div className="flex gap-2 items-center border-b border-gray-200 dark:border-[#183b61]">
          <FunnelIcon className="h-5 w-5 text-blue-500" />
          <p className="font-medium text-blue-500">{t('portfolio.filter')}</p>
        </div>
        {Options()}
      </div>
      <div className="md:hidden block relative z-10">
        <button
          className="flex justify-between items-center border-b border-gray-200 dark:border-[#183b61] w-full"
          onClick={() => setOpen(!open)}
        >
          <div className="flex gap-2 items-center">
            <FunnelIcon className="h-5 w-5 text-blue-500" />
            <p className="font-medium text-blue-500">{t('portfolio.filter')}</p>
          </div>
          {open ? (
            <ChevronUpIcon className="h-4 w-4 text-blue-500" />
          ) : (
            <ChevronDownIcon className="h-4 w-4 text-blue-500" />
          )}
        </button>
        {open && (
          <div className="inset-0 fixed bg-transparent z-0" onClick={() => setOpen(!open)}></div>
        )}
        {Options(true)}
      </div>
    </div>
  )
}
