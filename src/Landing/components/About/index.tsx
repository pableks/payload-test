'use client'

import React from 'react'
import { Media } from '@/components/Media'
import { Media as MediaType } from '@/payload-types'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { Check } from 'lucide-react'
import RichText from '@/components/RichText'

type AboutProps = {
  data: {
    heading?: string
    content?: DefaultTypedEditorState
    image?: MediaType | string
    valuesList?: Array<{ label: string }>
  }
}

export const AboutSection: React.FC<AboutProps> = ({ data }) => {
  const { heading, content, image, valuesList } = data || {}

  return (
    <section id="about-section" className="py-16">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {image && (
            <div className="lg:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <Media className="w-full object-cover" resource={image} />
              </div>
            </div>
          )}

          <div className="lg:w-1/2">
            {heading && <h2 className="text-3xl font-bold mb-6">{heading}</h2>}

            {content && (
              <div className="prose prose-lg max-w-none mb-8">
                <RichText data={content} />
              </div>
            )}

            {Array.isArray(valuesList) && valuesList.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {valuesList.map((value, index) => (
                  <div key={index} className="flex items-center">
                    <div className="mr-3 text-blue-500 bg-blue-50 p-1 rounded-full">
                      <Check className="w-5 h-5" />
                    </div>
                    <span>{value.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
