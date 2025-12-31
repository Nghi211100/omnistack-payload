import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { TypedLocale } from 'payload'
import { Link } from '@/i18n/routing'
import RichText from '@/components/RichText'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export async function Footer({ locale }: { locale: TypedLocale }) {
  const footerData: Footer = await getCachedGlobal('footer', 1, locale)()

  return (
    <footer
      className="bg-white dark:bg-[#001e3c] relative bottom-0 border-t border-gray-200 dark:border-[#183b61] "
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 pb-10 pt-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-32">
          <div>
            <Link href={'/'}>
              <Logo />
            </Link>
            <div className="pt-5">
              <RichText
                data={footerData.additionalInformation as DefaultTypedEditorState}
                className="[&_p]:my-0"
              />
            </div>
          </div>
          <div className="mt-12 grid lg:grid-cols-2 grid-cols-2 lg:col-span-1 lg:mt-0 gap-6">
            {footerData.columns?.map((column) => (
              <div key={column.id}>
                <div className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50">
                  {column.label}
                </div>
                <div className="mt-6 space-y-4">
                  {column.navItems?.map((item) => (
                    <div key={item.id}>
                      <CMSLink
                        {...item.link}
                        className="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:text-gray-900"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-20 border-t border-gray-200 dark:border-[#183b61] pt-10 md:flex md:items-center md:justify-between">
          <p className="mt-5 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
            {footerData.copyRight}
          </p>
        </div>
      </div>
    </footer>
  )
}
