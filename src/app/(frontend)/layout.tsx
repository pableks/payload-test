import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Montserrat } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { getSEOData } from '@/utilities/getSEOData'

// Initialize Montserrat with the weights you need
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(montserrat.variable)} lang="es" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOData()

  // Default values in case CMS data is not yet available
  if (!seoData || !seoData.siteMeta) {
    return {
      metadataBase: new URL(getServerSideURL()),
      title: {
        template: '%s | SAVA Servicios Financieros',
        default: 'SAVA Servicios Financieros - Soluciones financieras a tu alcance',
      },
      description:
        'Ofrecemos servicios financieros personalizados para impulsar tu crecimiento económico.',
      openGraph: mergeOpenGraph(),
    }
  }

  // Format keywords from array to string array
  const keywords = seoData.siteMeta.keywords?.map((item: { keyword: string }) => item.keyword) || []

  // Get image URL for OpenGraph
  const imageUrl = seoData.siteMeta.defaultImage
    ? `${getServerSideURL()}${seoData.siteMeta.defaultImage.url}`
    : `${getServerSideURL()}/website-template-OG.webp`

  return {
    metadataBase: new URL(getServerSideURL()),
    title: {
      template: `%s | ${seoData.social?.organization?.name || 'SAVA Servicios Financieros'}`,
      default: seoData.siteMeta.title,
    },
    description: seoData.siteMeta.description,
    generator: 'Next.js',
    applicationName: seoData.social?.organization?.name || 'SAVA Servicios Financieros',
    keywords: keywords,
    authors: [{ name: seoData.social?.organization?.name || 'SAVA' }],
    creator: seoData.social?.organization?.name || 'SAVA Servicios Financieros',
    publisher: seoData.social?.organization?.name || 'SAVA',
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    openGraph: mergeOpenGraph({
      title: seoData.siteMeta.title,
      description: seoData.siteMeta.description,
      locale: seoData.siteMeta.locale,
      type: 'website',
      images: [{ url: imageUrl }],
    }),
    twitter: {
      card: seoData.social?.twitter?.cardType || 'summary_large_image',
      creator: seoData.social?.twitter?.handle || '@SAVA',
      site: seoData.social?.twitter?.handle || '@SAVA',
      title: seoData.siteMeta.title,
      description: seoData.siteMeta.description,
    },
    alternates: {
      canonical: '/',
    },
  }
}
