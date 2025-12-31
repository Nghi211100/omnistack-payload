import { MapsBlock as MapsBlockType } from '@/payload-types'
import { cn } from '@/utilities/ui'
import React from 'react'

type Props = MapsBlockType & {
  className?: string
}

const MapsBlock = (props: Props) => {
  return (
    <div className={cn('container mx-auto py-16 px-6', props.className)}>
      <p className="text-4xl font-bold dark:text-white">{props?.title}</p>
      <div
        className={cn(
          'mx-auto w-full h-80 md:h-[700px] p-6 shadow-lg dark:bg-[#005eff]/20 dark:shadow-[inset_0px_-1px_1px_#132f4c] rounded-xl border border-neutral-100',
          { 'pt-0': props.specificAddress },
        )}
        style={{ width: `${props.width}px`, height: `${props.height}px` }}
      >
        <p className="text-center text-sm p-1">{props.specificAddress}</p>
        <iframe
          className="border dark:border-[#1e4976] w-full h-[calc(100%-20px)]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${props?.latitude},${props?.longitude}&z=15&output=embed`}
        ></iframe>
      </div>
    </div>
  )
}

export default MapsBlock
