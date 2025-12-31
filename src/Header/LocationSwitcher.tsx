'use client'
import { useParams } from 'next/navigation'
import React, { useTransition } from 'react'
import localization from '@/i18n/localization'
import { TypedLocale } from 'payload'
import { usePathname, useRouter } from '@/i18n/routing'
import { cn } from '@/utilities/ui'

export const LocaleSwitcher = () => {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  function onSelectChange(value: TypedLocale) {
    startTransition(() => {
      // @ts-expect-error -- TypeScript will validate that only known `params`
      router.replace({ pathname, params }, { locale: value })
    })
  }

  return (
    <div className="my-auto">
      {localization.locales
        .sort((a, b) => a.code.localeCompare(b.code))
        .map((i) => (
          <button
            type="button"
            className={cn(
              params.locale === i.code && 'pointer-events-none text-blue-500',
              'text-sm hover:scale-105 uppercase px-2',
              'first-of-type:border-blue-500 first-of-type:border-r',
            )}
            onClick={() => onSelectChange(i.code as TypedLocale)}
            key={i.code}
          >
            {i.code}
          </button>
        ))}
    </div>
  )
}
