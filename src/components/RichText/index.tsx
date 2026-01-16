import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import { TypographyJSXConverters } from 'payload-lexical-typography/converters'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  FeatureBlock as FeatureBlockProps,
  FormBlock as FormBlockProps,
  MapsBlock as MapsBlockType,
  MediaBlock as MediaBlockProps,
  Page,
  Post,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'
import { FormBlock, FormBlockType } from '@/blocks/Form/Component'
import FeatureBlock from '@/blocks/FeatureBlock/Component'
import MapsBlock from '@/blocks/MapsBlock/Component'
import { CMSLink } from '../Link'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | CTABlockProps
      | MediaBlockProps
      | BannerBlockProps
      | CodeBlockProps
      | FormBlockProps
      | FeatureBlockProps
      | MapsBlockType
    >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  ...TypographyJSXConverters,
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4 !py-0" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3 !py-0"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2 !py-0" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} className="!py-0" />,
    formBlock: ({ node }) => (
      <FormBlock
        {...node.fields}
        className="!p-0"
        form={node.fields.form as FormBlockType['form']}
        introContent={node.fields.introContent as FormBlockType['introContent']}
      />
    ),
    featureBlock: ({ node }) => <FeatureBlock {...node.fields} className="!p-0" />,
    mapsBlock: ({ node }) => <MapsBlock {...node.fields} className="!p-0 [&_p]:my-0" />,
  },
  link: ({ node }) => {
    const { doc, url, newTab } = node.fields

    // Extract text from children
    const textContent =
      node.children[0] && 'text' in node.children[0]
        ? (node.children[0] as { text?: string }).text
        : undefined

    // Handle internal document reference
    if (doc && typeof doc.value === 'object' && doc.value !== null) {
      return (
        <CMSLink
          type="reference"
          reference={{
            relationTo: doc.relationTo as 'pages' | 'posts',
            value: doc.value as unknown as Page | Post,
          }}
          newTab={newTab}
        >
          {textContent}
        </CMSLink>
      )
    }

    // Handle custom URL
    return (
      <CMSLink type="custom" url={url} newTab={newTab}>
        {textContent}
      </CMSLink>
    )
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        'p-0',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
