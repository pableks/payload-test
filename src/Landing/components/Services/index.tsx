'use client'

import React, { useState, useEffect } from 'react'
import { CircleDollarSign, Users, LineChart, Building2, PiggyBank, Shield, X } from 'lucide-react'
import { useTheme } from '@/providers/Theme'
import { cn } from '@/utilities/ui'

type Benefit = {
  benefit: string
  id?: string | null
}

type ServiceItem = {
  title: string
  description: string
  icon: 'advisor' | 'loans' | 'planning' | 'business' | 'investments' | 'insurance'
  link?: string
  benefits?: Benefit[] | null // Update to match payload-types.ts
}

type ServicesProps = {
  data: {
    heading?: string
    subheading?: string
    serviceItems?: ServiceItem[]
  }
}

// Dialog component for service details
interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  icon: string
  benefits?: Benefit[] | null // Add benefits prop to DialogProps
  isDarkMode: boolean
}

const ServiceDialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  icon,
  benefits,
  isDarkMode,
}) => {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
        <div
          className={cn(
            'relative w-full max-w-lg max-h-[90vh] overflow-auto rounded-lg p-6',
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800',
          )}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className={cn(
              'absolute top-4 right-4 p-1 rounded-full hover:bg-opacity-20 transition-colors',
              isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200',
            )}
          >
            <X size={20} />
          </button>

          {/* Content */}
          <div className="flex flex-col items-center mb-4">
            <div
              className={cn('mb-4 p-4 rounded-full', isDarkMode ? 'bg-blue-900' : 'bg-blue-100')}
            >
              {icon === 'advisor' && (
                <CircleDollarSign
                  className={cn('w-12 h-12', isDarkMode ? 'text-blue-400' : 'text-blue-500')}
                />
              )}
              {icon === 'loans' && (
                <Users
                  className={cn('w-12 h-12', isDarkMode ? 'text-blue-400' : 'text-blue-500')}
                />
              )}
              {icon === 'planning' && (
                <LineChart
                  className={cn('w-12 h-12', isDarkMode ? 'text-blue-400' : 'text-blue-500')}
                />
              )}
              {icon === 'business' && (
                <Building2
                  className={cn('w-12 h-12', isDarkMode ? 'text-blue-400' : 'text-blue-500')}
                />
              )}
              {icon === 'investments' && (
                <PiggyBank
                  className={cn('w-12 h-12', isDarkMode ? 'text-blue-400' : 'text-blue-500')}
                />
              )}
              {icon === 'insurance' && (
                <Shield
                  className={cn('w-12 h-12', isDarkMode ? 'text-blue-400' : 'text-blue-500')}
                />
              )}
            </div>
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
          </div>

          <div className={cn('text-base mb-6', isDarkMode ? 'text-gray-300' : 'text-gray-600')}>
            <p className="whitespace-pre-line">{description}</p>

            {/* Benefits section - use data from CMS if available */}
            {benefits && benefits.length > 0 ? (
              <div className="mt-6">
                <p className="font-bold mb-2">Beneficios:</p>
                <ul className="list-disc pl-6 space-y-1">
                  {benefits.map((benefit, index) => (
                    <li key={index}>{typeof benefit === 'string' ? benefit : benefit.benefit}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="mt-6">
                <p className="font-bold mb-2">Beneficios:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Asesoramiento personalizado según tus necesidades</li>
                  <li>Atención profesional y dedicada</li>
                  <li>Soluciones adaptadas a tu perfil financiero</li>
                  <li>Seguimiento continuo de tu caso</li>
                </ul>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className={cn(
                'py-2 px-6 rounded-lg font-medium transition-colors',
                isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white',
              )}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export const ServicesSection: React.FC<ServicesProps> = ({ data }) => {
  const { heading, subheading, serviceItems } = data || {}
  const { theme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)

  // Use effect to avoid hydration mismatch
  useEffect(() => {
    setIsDarkMode(theme === 'dark')
  }, [theme])

  // Icon mapping
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'advisor':
        return <CircleDollarSign className="w-10 h-10 text-white" />
      case 'loans':
        return <Users className="w-10 h-10 text-white" />
      case 'planning':
        return <LineChart className="w-10 h-10 text-white" />
      case 'business':
        return <Building2 className="w-10 h-10 text-white" />
      case 'investments':
        return <PiggyBank className="w-10 h-10 text-white" />
      case 'insurance':
        return <Shield className="w-10 h-10 text-white" />
      default:
        return <CircleDollarSign className="w-10 h-10 text-white" />
    }
  }

  return (
    <section
      id="services-section"
      className={cn('py-16', isDarkMode ? 'bg-gray-900' : 'bg-gray-50')}
    >
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

        {Array.isArray(serviceItems) && serviceItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceItems.map((item, index) => (
              <div
                key={index}
                className={cn(
                  'rounded-xl shadow-md flex flex-col items-center text-left overflow-hidden',
                  isDarkMode
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-white border border-gray-100',
                )}
              >
                <div className="w-full flex flex-col items-center p-6">
                  <div className="bg-blue-600 rounded-full p-4 mb-5">{getIcon(item.icon)}</div>
                  <h3
                    className={cn(
                      'text-2xl font-bold mb-3',
                      isDarkMode ? 'text-white' : 'text-blue-800',
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      'mb-6 text-center',
                      isDarkMode ? 'text-gray-300' : 'text-gray-600',
                    )}
                  >
                    {item.description}
                  </p>
                  <button
                    onClick={() => setSelectedService(item)}
                    className={cn(
                      'font-medium flex items-center text-lg transition-colors',
                      isDarkMode
                        ? 'text-blue-400 hover:text-blue-300'
                        : 'text-blue-600 hover:text-blue-800',
                    )}
                  >
                    Más información →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedService && (
        <ServiceDialog
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedService.title}
          description={selectedService.description}
          icon={selectedService.icon}
          benefits={selectedService.benefits}
          isDarkMode={isDarkMode}
        />
      )}
    </section>
  )
}
