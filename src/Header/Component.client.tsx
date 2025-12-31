'use client'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useState } from 'react'
import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import ThemeSwitcher from './ThemeSwitcher'
import Image from 'next/image'
import { LocaleSwitcher } from './LocationSwitcher'
import { cn } from '@/utilities/ui'
import { Link, usePathname, useRouter } from '@/i18n/routing'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header>
      <Disclosure
        as="nav"
        className="bg-background/80 backdrop-blur shadow-lg dark:shadow-[inset_0px_-1px_1px_#132f4c] fixed w-full z-[9999]"
      >
        {({ open }) => (
          <>
            <div className="container px-5 sm:px-8 relative">
              <div className="relative flex h-16 justify-between">
                <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-xl p-2 text-blue-500 focus:outline-none focus:ring-0 border border-gray-300 dark:border-[#183b61]">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-4 w-4" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center md:items-stretch justify-start gap-5">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/">
                      <Logo loading="eager" priority="high" />
                    </Link>
                  </div>
                  <div className="hidden w-full md:flex justify-between">
                    <div className="flex">
                      <HeaderNav data={data} currentPath={pathname} />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-11 sm:right-0 flex gap-2 md:gap-8">
                  <div className="md:flex hidden gap-2">
                    {data.phone && (
                      <div className="my-auto gap-1 flex text-sm md:test-base items-center">
                        <Image alt="phone-icon" width={24} height={24} src={'/icons/phone.svg'} />{' '}
                        <Link href={`tel:${data.phone}`}>{data.phone}</Link>
                      </div>
                    )}
                    <ThemeSwitcher />
                  </div>

                  <LocaleSwitcher />
                </div>
              </div>
            </div>
            <div
              className={cn(
                'transition duration-500 ease-in-out overflow-hidden shadow-lg dark:shadow-[inset_0px_-1px_1px_#132f4c] absolute top-[100%] inset-x-0',
                { 'opacity-100 translate-y-0': open },
                { '-translate-y-0 opacity-0': !open },
              )}
            >
              <Disclosure.Panel>
                <div className="pt-2 pb-4 bg-white dark:bg-[#0a1929b3]">
                  {data.navItems?.map((item, index) => (
                    <Disclosure.Button
                      key={index}
                      className={`${
                        item.link.url === pathname && 'border-blue-500 border-l-2 text-blue-500'
                      } w-full block py-2 pl-3 pr-4 text-base font-medium text-gray-500 dark:text-gray-400`}
                      onClick={() => router.push(item.link.url || '')}
                    >
                      {item.link.label}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </div>
          </>
        )}
      </Disclosure>
    </header>
  )
}
