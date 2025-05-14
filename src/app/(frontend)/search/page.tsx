import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { CardPostData } from '@/components/Card'
import { getSEOData } from '@/utilities/getSEOData'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">Búsqueda</h1>

          <div className="max-w-[50rem] mx-auto">
            <Search />
          </div>
        </div>
      </div>

      {posts.totalDocs > 0 ? (
        <CollectionArchive posts={posts.docs as CardPostData[]} />
      ) : (
        <div className="container">No se encontraron resultados.</div>
      )}
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOData()

  // Use search-specific settings from SEO global if available
  if (seoData && seoData.searchSettings) {
    const title = seoData.searchSettings.title || 'Búsqueda | SAVA Servicios Financieros'
    const description = seoData.searchSettings.description || 'Busca información sobre servicios financieros, inversiones, préstamos y más'
    
    return {
      title: title,
      description: description,
      openGraph: {
        title: title,
        description: description,
        locale: seoData.siteMeta?.locale || 'es_ES',
      },
    }
  }

  // Fallback to default values if CMS data is not available
  return {
    title: `Búsqueda | SAVA Servicios Financieros`,
    description: 'Busca información sobre servicios financieros, inversiones, préstamos y más',
    openGraph: {
      title: 'Búsqueda | SAVA Servicios Financieros',
      description: 'Busca información sobre servicios financieros, inversiones, préstamos y más',
      locale: 'es_ES',
    },
  }
}
