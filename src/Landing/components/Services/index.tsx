'use client'

import React from 'react'
import { CircleDollarSign, Users, LineChart, Building2, PiggyBank, Shield } from 'lucide-react'

type ServiceItem = {
  title: string
  description: string
  icon: 'advisor' | 'loans' | 'planning' | 'business' | 'investments' | 'insurance'
  link?: string
}

type ServicesProps = {
  data: {
    heading?: string
    subheading?: string
    serviceItems?: ServiceItem[]
  }
}

export const ServicesSection: React.FC<ServicesProps> = ({ data }) => {
  const { heading, subheading, serviceItems } = data || {}

  // Icon mapping
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'advisor':
        return <CircleDollarSign className="w-12 h-12 text-blue-500" />
      case 'loans':
        return <Users className="w-12 h-12 text-blue-500" />
      case 'planning':
        return <LineChart className="w-12 h-12 text-blue-500" />
      case 'business':
        return <Building2 className="w-12 h-12 text-blue-500" />
      case 'investments':
        return <PiggyBank className="w-12 h-12 text-blue-500" />
      case 'insurance':
        return <Shield className="w-12 h-12 text-blue-500" />
      default:
        return <CircleDollarSign className="w-12 h-12 text-blue-500" />
    }
  }

  return (
    <section id="services-section" className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          {heading && <h2 className="text-3xl font-bold mb-4">{heading}</h2>}
          {subheading && <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subheading}</p>}
        </div>

        {Array.isArray(serviceItems) && serviceItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceItems.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center"
              >
                <div className="mb-4 bg-blue-50 p-4 rounded-full">{getIcon(item.icon)}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                {item.link && (
                  <a
                    href={item.link}
                    className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                  >
                    Más información →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
