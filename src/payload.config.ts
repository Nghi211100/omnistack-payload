import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { vi } from '@payloadcms/translations/languages/vi'
import { en } from '@payloadcms/translations/languages/en'
import type { Language } from '@payloadcms/translations'
import { Services } from './collections/Services'
import { Reviews } from './collections/Reviews'
import { Portfolios } from './collections/Portfolios'
import { Categories } from './collections/Categories'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  i18n: {
    supportedLanguages: { en, vi } as unknown as Record<string, Language>,
    fallbackLanguage: 'en',
  },
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Tiếng Việt',
        code: 'vi',
      },
    ],
    defaultLocale: 'en',
    filterAvailableLocales: async ({ req, locales }) => {
      return locales
    },
  },
  admin: {
    meta: {
      icons: '/icons/logo_only.webp',
    },
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      // beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      // beforeDashboard: ['@/components/BeforeDashboard'],
      graphics: {
        Logo: '@/components/Admin/AdminLogo',
        Icon: '@/components/Admin/AdminIcon',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  collections: [Pages, Posts, Media, Users, Services, Reviews, Portfolios, Categories],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
  folders: false,
  email: nodemailerAdapter({
    defaultFromAddress: process.env.FROM_ADDRESS || 'support@omnistack.com',
    defaultFromName: process.env.FROM_NAME || 'Omnistack',
    transportOptions: {
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT!) || 587,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    },
  }),
})
