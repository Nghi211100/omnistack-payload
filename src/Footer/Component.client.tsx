'use client'

import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Link } from '@/i18n/routing'
import RichText from '@/components/RichText'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { motion } from 'motion/react'

export function FooterClient({ data }: { data: Footer }) {
    return (
        <footer
            className="bg-white dark:bg-[#001e3c] relative bottom-0 border-t border-gray-200 dark:border-[#183b61]"
            aria-labelledby="footer-heading"
        >
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="container pb-10 pt-10 overflow-auto">
                <div className="lg:grid lg:grid-cols-2 lg:gap-32">
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}>
                        <Link href={'/'}>
                            <Logo />
                        </Link>
                        <motion.div className="pt-5"
                            initial={{ x: -100 }}
                            whileInView={{ x: 0 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}>
                            <RichText
                                data={data.additionalInformation as DefaultTypedEditorState}
                                className="[&_p]:my-0"
                            />
                        </motion.div>
                    </motion.div>
                    <motion.div
                    initial={{x:200, opacity: 0}} 
                    whileInView={{x:0, opacity: 1}}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="mt-12 grid lg:grid-cols-2 grid-cols-2 lg:col-span-1 lg:mt-0 gap-6">
                        {data.columns?.map((column) => (
                            <motion.div key={column.id}
                            initial={{y:-100, scale: 0.1}} 
                            whileInView={{y:0, scale: 1}}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            >
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
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
                <div className="mt-20 border-t border-gray-200 dark:border-[#183b61] pt-10 md:flex md:items-center md:justify-between">
                    <p className="mt-5 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
                        {data.copyRight}
                    </p>
                </div>
            </div>
        </footer>
    )
}
