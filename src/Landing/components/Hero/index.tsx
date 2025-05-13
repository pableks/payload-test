'use client'

import React, { useState, useEffect, useRef } from 'react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Media as MediaType, Page, Post } from '@/payload-types'
import { DotPattern } from '@/components/magicui/dot-pattern'
import { cn } from '@/utilities/ui'

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
  const heroRef = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: '30%', y: '50%' })
  const [isDesktop, setIsDesktop] = useState(false)

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024) // lg breakpoint
    }

    checkDesktop()
    window.addEventListener('resize', checkDesktop)

    const handleMouseMove = (event: MouseEvent) => {
      if (heroRef.current && isDesktop) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = ((event.clientX - rect.left) / rect.width) * 100
        const y = ((event.clientY - rect.top) / rect.height) * 100
        setMousePosition({ x: `${x}%`, y: `${y}%` })
      } else {
        // Reset to center if not desktop or ref not available
        setMousePosition({ x: '30%', y: '50%' })
      }
    }

    const currentHeroRef = heroRef.current
    if (currentHeroRef) {
      currentHeroRef.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      window.removeEventListener('resize', checkDesktop)
      if (currentHeroRef) {
        currentHeroRef.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [isDesktop]) // Re-run if isDesktop changes to attach/detach listener correctly

  const maskStyle = {
    maskImage: `radial-gradient(800px circle at ${mousePosition.x} ${mousePosition.y}, white, transparent)`,
    WebkitMaskImage: `radial-gradient(800px circle at ${mousePosition.x} ${mousePosition.y}, white, transparent)`,
  }

  const defaultMaskStyle = {
    maskImage: 'radial-gradient(300px circle at center, white, transparent)', // Keep mobile/default as 300px
    WebkitMaskImage: 'radial-gradient(300px circle at center, white, transparent)',
  }

  return (
    <section
      ref={heroRef}
      className="relative bg-gradient-to-b from-[#0A243F] to-[#0A2540] text-white py-32 min-h-[650px] overflow-hidden flex items-center"
    >
      {backgroundImage && (
        <div className="absolute inset-0 z-0 opacity-30">
          <Media fill className="object-cover" resource={backgroundImage} />
        </div>
      )}

      <DotPattern
        className="absolute inset-0 w-full h-full opacity-30"
        style={isDesktop ? maskStyle : defaultMaskStyle}
      />

      <div className="container relative z-10">
        <div className="max-w-xl mb-12">
          {heading && <h1 className="text-4xl md:text-5xl font-bold mb-4">{heading}</h1>}
          {subheading && <p className="text-lg md:text-xl mb-12">{subheading}</p>}

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

        <div className="flex flex-col md:flex-row gap-6 mt-8">
          <button
            onClick={() => scrollToSection('services-section')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg w-full md:w-auto min-w-[200px]"
          >
            Nuestros Servicios
          </button>
          <button
            onClick={() => scrollToSection('contact-section')}
            className="bg-white hover:bg-gray-50 text-blue-700 text-center font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl border-2 border-white transform hover:-translate-y-1 transition-all duration-300 text-lg w-full md:w-auto min-w-[200px]"
          >
            Contáctanos
          </button>
        </div>
      </div>
    </section>
  )
}
