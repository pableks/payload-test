'use client'

import React, { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import { useTheme } from '@/providers/Theme'
import { cn } from '@/utilities/ui'

type TestimonialItem = {
  quote: string
  name: string
  position?: string
  company?: string
  date?: string
}

type TestimonialsProps = {
  data: {
    heading?: string
    subheading?: string
    testimonialItems?: TestimonialItem[]
  }
}

export const TestimonialsSection: React.FC<TestimonialsProps> = ({ data }) => {
  const { heading, subheading, testimonialItems } = data || {}
  const { theme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Use effect to avoid hydration mismatch
  useEffect(() => {
    setIsDarkMode(theme === 'dark')
  }, [theme])

  return (
    <section className={cn('py-16', isDarkMode ? 'bg-gray-800' : 'bg-blue-50')}>
      <div className="container">
        <div className="text-center mb-12">
          {heading && (
            <h2 className={cn('text-3xl font-bold mb-4', isDarkMode ? 'text-white' : '')}>
              {heading}
            </h2>
          )}
          {subheading && (
            <p
              className={cn(
                'text-lg max-w-3xl mx-auto',
                isDarkMode ? 'text-gray-300' : 'text-gray-600',
              )}
            >
              {subheading}
            </p>
          )}
        </div>

        {Array.isArray(testimonialItems) && testimonialItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialItems.map((item, index) => (
              <div
                key={index}
                className={cn(
                  'p-6 rounded-lg shadow-md border',
                  isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100',
                )}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className={cn('mb-6 italic', isDarkMode ? 'text-gray-200' : 'text-gray-700')}>
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="flex items-center">
                  <div>
                    <p className={cn('font-semibold', isDarkMode ? 'text-white' : '')}>
                      {item.name}
                    </p>
                    {(item.position || item.company) && (
                      <p className={cn('text-sm', isDarkMode ? 'text-gray-400' : 'text-gray-600')}>
                        {item.position}
                        {item.position && item.company ? ' · ' : ''}
                        {item.company}
                      </p>
                    )}
                    {item.date && (
                      <p
                        className={cn(
                          'text-xs mt-1',
                          isDarkMode ? 'text-gray-500' : 'text-gray-500',
                        )}
                      >
                        Cliente desde {item.date}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
