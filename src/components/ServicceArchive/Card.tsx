import { Media as MediaType } from '@/payload-types'
import { Media } from '../Media'
import RichText from '../RichText'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

const Card = ({
  title,
  image,
  description,
}: {
  title: string
  image: number | MediaType
  description: DefaultTypedEditorState
}) => {
  return (
    <div className="w-full h-full shadow-lg dark:shadow-[inset_0px_-1px_1px_#132f4c] dark:border-[#1e4976] dark:border rounded-xl overflow-hidden">
      <Media resource={image} imgClassName="object-cover h-[150px]" />
      <div className="bg-gray-100 dark:bg-[#132f4c] p-4 h-[55%]">
        <h3 className="text-xl font-medium mb-4 dark:text-white text-center">{title}</h3>
        <RichText data={description} />
      </div>
    </div>
  )
}

export default Card
