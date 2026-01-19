import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import React from 'react'

import type { Page, Post } from '@/payload-types'
import { Link } from '@/i18n/routing'
import { Position } from '@/fields/link'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  position?: Position | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    position,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug
      }`
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <div
      className={cn(
        'w-full text-left',
        { 'text-center': position === 'center' },
        { 'text-right': position === 'right' },
      )}
    >
      <Button asChild className={cn(className, 'hover:scale-105 transition duration-300 ease-in-out')} size={size} variant={appearance}>
        <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
          {label && label}
          {children && children}
        </Link>
      </Button>
    </div>
  )
}
