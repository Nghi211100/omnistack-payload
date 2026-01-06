import { useTheme } from '@/providers/Theme'
import { themeLocalStorageKey } from '@/providers/Theme/ThemeSelector/types'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'

export default function ThemeSwitcher() {
  const { setTheme } = useTheme()
  const [value, setValue] = useState('light')

  const onThemeChange = () => {
    if (value === 'light') {
      setTheme('dark')
      setValue('dark')
    } else {
      setTheme('light')
      setValue('light')
    }
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'light')
  }, [])

  return (
    <button
      className="border border-gray-300 rounded-xl p-2 w-max h-max my-auto text-blue-500 dark:border-[#183b61]"
      onClick={() => onThemeChange()}
    >
      {value === 'light' ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
    </button>
  )
}
