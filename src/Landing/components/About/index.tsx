'use client'

import React, { useState, useEffect } from 'react'
import { Media } from '@/components/Media'
import { Media as MediaType } from '@/payload-types'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { Check } from 'lucide-react'
import RichText from '@/components/RichText'
import { useTheme } from '@/providers/Theme'
import { cn } from '@/utilities/ui'

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
  const { theme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Use effect to avoid hydration mismatch
  useEffect(() => {
    setIsDarkMode(theme === 'dark')
  }, [theme])

  return (
    <section id="about-section" className={cn('py-16', isDarkMode ? 'bg-gray-900' : '')}>
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {image && (
            <div className="lg:w-1/2">
              <div
                className={cn(
                  'rounded-lg overflow-hidden shadow-lg',
                  isDarkMode ? 'border border-gray-700' : 'border border-gray-200',
                )}
              >
                <Media className="w-full object-cover" resource={image} />
              </div>
            </div>
          )}

          <div className="lg:w-1/2">
            {heading && (
              <h2 className={cn('text-3xl font-bold mb-6', isDarkMode ? 'text-white' : '')}>
                {heading}
              </h2>
            )}

            {content && (
              <div
                className={cn(
                  'prose prose-lg max-w-none mb-8',
                  isDarkMode ? 'dark:prose-invert' : '',
                )}
              >
                <RichText data={content} />
              </div>
            )}

            {Array.isArray(valuesList) && valuesList.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {valuesList.map((value, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className={cn(
                        'mr-3 p-1 rounded-full',
                        isDarkMode ? 'text-blue-400 bg-blue-900/30' : 'text-blue-500 bg-blue-50',
                      )}
                    >
                      <Check className="w-5 h-5" />
                    </div>
                    <span className={isDarkMode ? 'text-gray-200' : ''}>{value.label}</span>
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
