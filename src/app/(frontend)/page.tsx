import { LandingPage } from '@/Landing/Component'
import { Metadata } from 'next'
import { getSEOData } from '@/utilities/getSEOData'
import { getServerSideURL } from '@/utilities/getURL'

export default function Home() {
  return (
    <main className="flex-1">
      <LandingPage />
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOData()

  // Default values in case CMS data is not yet available
  if (!seoData || !seoData.siteMeta) {
    return {
      title: 'SAVA Servicios Financieros - Soluciones financieras a tu alcance',
      description:
        'Ofrecemos servicios financieros personalizados para impulsar tu crecimiento económico. Asesoría financiera, préstamos personales, inversiones y más.',
      openGraph: {
        title: 'SAVA Servicios Financieros - Soluciones financieras a tu alcance',
        description:
          'Ofrecemos servicios financieros personalizados para impulsar tu crecimiento económico.',
        images: [
          {
            url: '/website-template-OG.webp',
            width: 1200,
            height: 630,
            alt: 'SAVA Servicios Financieros',
          },
        ],
        locale: 'es_ES',
        type: 'website',
      },
    }
  }

  // Get image URL for OpenGraph
  const imageUrl = seoData.siteMeta.defaultImage
    ? typeof seoData.siteMeta.defaultImage === 'object' && 'url' in seoData.siteMeta.defaultImage
      ? `${getServerSideURL()}${seoData.siteMeta.defaultImage.url}`
      : '/website-template-OG.webp'
    : '/website-template-OG.webp'

  return {
    title: seoData.siteMeta.title,
    description: seoData.siteMeta.description,
    openGraph: {
      title: seoData.siteMeta.title,
      description: seoData.siteMeta.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: seoData.social?.organization?.name || 'SAVA Servicios Financieros',
        },
      ],
      locale: seoData.siteMeta.locale,
      type: 'website',
    },
  }
}
