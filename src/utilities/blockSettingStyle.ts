import { Media } from '@/payload-types'
import { CSSProperties } from 'react'

type Setting = {
  bgType?: ('image' | 'color' | 'transparent') | null
  bgColor?: string | null
  bgImage?: (number | null) | Media
  bgRepeat?: boolean | null
  bgSize?: ('contain' | 'cover' | 'custom') | null
  bgSizeCustom?: string | null
  bgPosition?: ('center' | 'right' | 'left' | 'top' | 'bottom')[] | null
  bgAttachment?: ('scroll' | 'fixed') | null
  padding?: string | null
}

export const blockSettingStyle = (setting?: Setting) => {
  let style: CSSProperties = { background: 'transparent' }

  if (!setting) return style

  if (setting.padding) style.padding = `${setting.padding} 0 ${setting.padding}`

  if (setting.bgType === 'transparent') return style

  if (setting.bgType === 'color' && setting.bgColor) {
    style = { backgroundColor: `${setting.bgColor}` }
    return style
  }

  if (setting.bgImage && typeof setting.bgImage === 'object')
    style.backgroundImage = `url(${setting.bgImage.url})`

  if (setting.bgPosition) style.backgroundPosition = `${setting.bgPosition.join(' ')}`

  if (setting.bgRepeat) style.backgroundRepeat = `${setting.bgRepeat ? 'repeat' : 'no-repeat'}`

  if (setting.bgSize) {
    if (setting.bgSize !== 'custom') {
      style.backgroundSize = `${setting.bgSize}`
    } else {
      style.backgroundSize = `${setting.bgSizeCustom}`
    }
  }

  if (setting.bgAttachment) style.backgroundAttachment = `${setting.bgAttachment}`
  return style
}
