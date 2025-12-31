import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  src?: string
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, src } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Omnistack Logo"
      width={171}
      height={44}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[171px] w-full h-8 md:h-11', className)}
      src={src ?? '/logo-web.png'}
    />
  )
}
