'use client'

import React from 'react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Media as MediaType, Page, Post } from '@/payload-types'

type HeroProps = {
  data: {
    heading?: string
    subheading?: string
    links?: Array<{
      link: {
        type?: 'reference' | 'custom' | null
        newTab?: boolean | null
        reference?: {
          relationTo: 'pages' | 'posts'
          value: string | number | Page | Post
        } | null
        url?: string | null
        label: string
        appearance?: 'default' | 'outline' | null
      }
    }>
    backgroundImage?: MediaType | string
  }
}

export const LandingHero: React.FC<HeroProps> = ({ data }) => {
  const { heading, subheading, links, backgroundImage } = data || {}

  return (
    <section className="relative bg-blue-900 text-white py-16">
      {backgroundImage && (
        <div className="absolute inset-0 z-0 opacity-30">
          <Media fill className="object-cover" resource={backgroundImage} />
        </div>
      )}

      <div className="container relative z-10">
        <div className="max-w-xl">
          {heading && <h1 className="text-4xl md:text-5xl font-bold mb-4">{heading}</h1>}
          {subheading && <p className="text-lg md:text-xl mb-8">{subheading}</p>}

          {Array.isArray(links) && links.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {links.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  className={
                    link.appearance === 'outline'
                      ? 'bg-transparent hover:bg-blue-700 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded'
                      : 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
