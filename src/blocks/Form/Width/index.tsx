import { cn } from '@/utilities/ui'
import * as React from 'react'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  return (
    <div
      className={cn(
        className,
        '[&_input]:rounded-xl [&_input]:bg-gray-400/10 [&_input]:border-gray-300 [&_input]:dark:border-[#1e4976] [&_input]:py-3 [&_input]:px-4 [&_input]:placeholder-gray-500 [&_input]:shadow-sm [&_input]:focus:ring-0 [&_input]:outline-none [&_input]:dark:bg-[#005eff]/20 [&_input]:text-gray-500 [&_input]:dark:text-white]',
      )}
      style={{ maxWidth: width ? `${width}%` : undefined }}
    >
      {children}
    </div>
  )
}
