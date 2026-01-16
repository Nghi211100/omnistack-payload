import { Media } from '@/payload-types'
import { CSSProperties } from 'react'

type Setting = {
  bgType?: ('image' | 'color' | 'transparent') | null
  bgLightColor?: string | null
  bgDarkColor?: string | null
  bgImage?: (number | null) | Media
  bgRepeat?: boolean | null
  bgSize?: ('contain' | 'cover' | 'custom') | null
  bgSizeCustom?: string | null
  bgPosition?: ('center' | 'right' | 'left' | 'top' | 'bottom')[] | null
  bgAttachment?: ('scroll' | 'fixed') | null
  padding?: string | null
}

export const blockSettingStyle = (settings?: Setting) => {
  let style: CSSProperties = { background: 'transparent' }

  if (!settings) return style

  if (settings.padding) style.padding = `${settings.padding} 0 ${settings.padding}`

  if (settings.bgType === 'transparent') return style

  if (settings.bgType === 'color') {
    style = {
      ...style,
      '--bg-light': settings.bgLightColor,
      '--bg-dark': settings.bgDarkColor,
    } as CSSProperties

    return style
  }

  if (settings.bgImage && typeof settings.bgImage === 'object')
    style.backgroundImage = `url(${settings.bgImage.url})`

  if (settings.bgPosition) style.backgroundPosition = `${settings.bgPosition.join(' ')}`

  if (settings.bgRepeat) style.backgroundRepeat = `${settings.bgRepeat ? 'repeat' : 'no-repeat'}`

  if (settings.bgSize) {
    if (settings.bgSize !== 'custom') {
      style.backgroundSize = `${settings.bgSize}`
    } else {
      style.backgroundSize = `${settings.bgSizeCustom}`
    }
  }

  if (settings.bgAttachment) style.backgroundAttachment = `${settings.bgAttachment}`
  return style
}
