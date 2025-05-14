import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { getSEOData } from '@/utilities/getSEOData'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Blog</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOData()

  // Use blog-specific settings from SEO global if available
  if (seoData && seoData.blogSettings) {
    return {
      title: seoData.blogSettings.title,
      description: seoData.blogSettings.description,
      openGraph: {
        title: seoData.blogSettings.title,
        description: seoData.blogSettings.description,
        locale: seoData.siteMeta?.locale || 'es_ES',
      },
    }
  }

  // Fallback to default values if CMS data is not available
  return {
    title: `Blog | SAVA Servicios Financieros`,
    description: 'Artículos y noticias sobre finanzas, inversiones y economía personal',
    openGraph: {
      title: 'Blog | SAVA Servicios Financieros',
      description: 'Artículos y noticias sobre finanzas, inversiones y economía personal',
      locale: 'es_ES',
    },
  }
}
