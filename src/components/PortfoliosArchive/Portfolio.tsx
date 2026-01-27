import { Category, Portfolio as PortfolioType } from '@/payload-types'
import { Media } from '../Media'
import RichText from '../RichText'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export default function Portfolio({ portfolio }: { portfolio?: PortfolioType }) {
  const category = portfolio?.categories as Category

  return (
    <div className="dark:border-[#1e4976] overflow-hidden rounded-xl dark:border shadow-lg dark:shadow-[inset_0px_-1px_1px_#132f4c] h-full">
      <div className="flex-shrink-0">
        <Media imgClassName="h-48 w-full object-cover" resource={portfolio?.image} />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white dark:bg-[#001e3c] p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-blue-500">{category.title}</p>
          <div className="mt-2 block">
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-50">
              {portfolio?.name}
            </p>

            <RichText data={portfolio?.description as DefaultTypedEditorState} />
          </div>
        </div>
      </div>
    </div>
  )
}
