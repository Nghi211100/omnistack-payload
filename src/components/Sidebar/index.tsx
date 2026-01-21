'use client'

import { Link, usePathname } from '@/i18n/routing'
import { Category } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { useTranslations } from 'next-intl'
import React from 'react'

const Sidebar = ({ categories }: { categories?: Category[] }) => {
    const t = useTranslations();
    const pathName = usePathname();
    const categoryPathName = pathName.replace('/blog', '')

    return (
        <div className='border-[#00000014] pr-10 h-full md:border-r pb-6'>
            <div className='md:sticky top-[5rem]'>
                <div className='pb-6 border-b border-[#00000014]'>
                    <p className='text-4xl font-semibold'>Blog <span className='font-normal'>& Articles</span></p>
                    <p className='text-sm text-[#4b5563] pt-2'>{t('posts.slogan')}</p>
                </div>
                <div className='pt-4 gap-2 flex flex-row md:flex-col'>
                    <Link href={'/blog'} className={cn({ 'font-bold': !categoryPathName }, 'hover:font-bold')}>{t('posts.latest')}</Link>
                    {categories?.map((category) => (
                        <div key={category.id}>
                            <Link href={`/blog/${category.slug}`} className={cn({ 'font-bold': category.slug === categoryPathName }, 'hover:font-bold')}>{category.title}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar