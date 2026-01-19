import { Portfolio as PortfolioType } from '@/payload-types'
import Portfolio from './Portfolio'

export default function Portfolios({ portfolios }: { portfolios?: PortfolioType[] }) {
  return (
    <div className="py-6 md:pt-16 md:pb-8 px-4 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-6 xl:grid-cols-3">
        {portfolios?.map((portfolio) => (
          <div key={portfolio.id} className="group relative">
            <Portfolio portfolio={portfolio} />
          </div>
        ))}
      </div>
    </div>
  )
}
