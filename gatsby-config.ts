import type { GatsbyConfig } from 'gatsby'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { fileURLToPath } from 'url'

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config: GatsbyConfig = {
    siteMetadata: {
        title: 'Unified Dapp',
        siteUrl: 'https://www.example.com',
    },
    plugins: [
        'gatsby-plugin-postcss',
        {
            resolve: '@sentry/gatsby',
            options: {
                dsn: process.env.REACT_APP_SENTRY_DSN ?? '',
                environment: process.env.NODE_ENV ?? 'development',
            }
        },
        {
            resolve: 'gatsby-plugin-google-analytics',
            options: {
                trackingId: process.env.REACT_APP_GA_ID ?? '',
            }
        },
        {
            resolve: 'gatsby-plugin-root-import',
            options: {
                '@': path.join(__dirname, 'src'),
                '@/src': path.join(__dirname, 'src'),
                'components': path.join(__dirname, 'src/components'),
                'hooks': path.join(__dirname, 'src/hooks'),
                'utils': path.join(__dirname, 'src/utils'),
                'helpers': path.join(__dirname, 'src/helpers')
            }
        },
        'gatsby-plugin-typescript',
        'gatsby-plugin-emotion',
        'gatsby-plugin-react-helmet'
    ],
} as const

export default config 