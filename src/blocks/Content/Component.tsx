import React from 'react'
import { ContentClient } from './Component.client'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  return <ContentClient props={props} />
}
