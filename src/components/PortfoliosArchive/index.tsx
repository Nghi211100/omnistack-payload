import { Portfolio as PortfolioType } from '@/payload-types'
import { cn } from '@/utilities/ui'
import Portfolio from './Portfolio'

export type Props = {
  portfolios: PortfolioType[]
}

const PortfolioArchive: React.FC<Props> = (props) => {
  const { portfolios } = props

  return (
    <div className={cn('container')}>
      <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-6 gap-x-6 lg:gap-y-12 lg:gap-x-12 xl:gap-x-12">
        {portfolios?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div className="col-span-4" key={index}>
                <Portfolio portfolio={result} />
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}

export default PortfolioArchive
