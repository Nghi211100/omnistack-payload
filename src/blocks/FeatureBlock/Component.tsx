import React from 'react'
import FeatureClient from './Component.client'

import { FeatureBlock as FeatureBlockType } from '@/payload-types'

export type FeatureProps = FeatureBlockType & {
    className?: string
}

export const FeatureBlock: React.FC<FeatureProps> = (props) => {
    return <FeatureClient props={props} />
}
