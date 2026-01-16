import React from 'react'

import { Code } from './Component.client'
import { CodeBlock as CodeBlockType } from '@/payload-types'
import { blockSettingStyle } from '@/utilities/blockSettingStyle'

export type CodeBlockProps = CodeBlockType & {
  code: string
  language?: string
  blockType: 'code'
}
type Props = CodeBlockProps & {
  className?: string
}

export const CodeBlock: React.FC<Props> = ({ className, code, language, settings }) => {
  return (
    <div className="py-8 block-setting" style={blockSettingStyle(settings)}>
      <div className={[className, 'not-prose'].filter(Boolean).join(' ')}>
        <Code code={code} language={language} />
      </div>
    </div>
  )
}
