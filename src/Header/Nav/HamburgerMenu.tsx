'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/providers/Theme'
import { cn } from '@/utilities/ui'

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Move theme detection to useEffect to avoid hydration mismatch
  useEffect(() => {
    setIsDarkMode(theme === 'dark')
  }, [theme])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    // Prevent body scroll when menu is open
    if (!isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false)
    document.body.style.overflow = ''
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        document.body.style.overflow = ''
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
    document.body.style.overflow = ''
  }, [pathname])

  const menuItems = [
    { label: 'Nuestra historia', sectionId: 'about-section' },
    { label: 'Nuestros servicios', sectionId: 'services-section' },
    { label: 'Contáctanos', sectionId: 'contact-section' },
  ]

  return (
    <div className="md:hidden" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className={cn(
          'focus:outline-none z-50 relative transition-colors',
          isDarkMode ? 'text-white hover:text-blue-400' : 'text-primary hover:text-blue-600',
        )}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className={cn(
            'fixed inset-0 z-40',
            isDarkMode ? 'bg-black bg-opacity-70' : 'bg-black bg-opacity-50',
          )}
          onClick={() => toggleMenu()}
        />
      )}

      {/* Side Menu */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-4/5 max-w-xs shadow-xl z-50 transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
          isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800',
        )}
      >
        <div className="flex flex-col h-full">
          <div
            className={cn(
              'flex justify-between items-center p-4 border-b',
              isDarkMode ? 'border-gray-700' : 'border-gray-200',
            )}
          >
            <h2 className="text-xl font-semibold">Menú</h2>
            <button
              onClick={toggleMenu}
              className={cn(
                'hover:text-blue-500 transition-colors',
                isDarkMode ? 'text-gray-400' : 'text-gray-500',
              )}
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.sectionId)}
                className={cn(
                  'block w-full text-left px-6 py-4 text-lg font-medium transition-colors border-b',
                  isDarkMode
                    ? 'border-gray-700 hover:bg-gray-800 hover:text-blue-400'
                    : 'border-gray-100 hover:bg-gray-100 hover:text-blue-600',
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className={cn('p-6 border-t', isDarkMode ? 'border-gray-700' : 'border-gray-200')}>
            <p className={cn('text-sm', isDarkMode ? 'text-gray-400' : 'text-gray-500')}>
              © 2025 Tu Empresa
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HamburgerMenu
