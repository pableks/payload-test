'use client'

import React from 'react'
import { Star } from 'lucide-react'

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

  return (
    <section className="py-16 bg-blue-50">
      <div className="container">
        <div className="text-center mb-12">
          {heading && <h2 className="text-3xl font-bold mb-4">{heading}</h2>}
          {subheading && <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subheading}</p>}
        </div>

        {Array.isArray(testimonialItems) && testimonialItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialItems.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{item.quote}"</p>
                <div className="flex items-center">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    {(item.position || item.company) && (
                      <p className="text-sm text-gray-600">
                        {item.position}
                        {item.position && item.company ? ' · ' : ''}
                        {item.company}
                      </p>
                    )}
                    {item.date && (
                      <p className="text-xs text-gray-500 mt-1">Cliente desde {item.date}</p>
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
