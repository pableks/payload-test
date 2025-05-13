'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

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
        className="text-primary focus:outline-none z-50 relative"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => toggleMenu()} />
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Menú</h2>
            <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.sectionId)}
                className="block w-full text-left px-6 py-4 text-lg font-medium text-gray-800 hover:bg-gray-100 hover:text-blue-600 transition-colors border-b border-gray-100"
              >
                {item.label}
              </button>
            ))}
            <Link
              href="/search"
              className="block px-6 py-4 text-lg font-medium text-gray-800 hover:bg-gray-100 hover:text-blue-600 transition-colors border-b border-gray-100"
              onClick={() => {
                setIsOpen(false)
                document.body.style.overflow = ''
              }}
            >
              Search
            </Link>
          </nav>

          <div className="p-6 border-t">
            <p className="text-sm text-gray-500">© 2025 Tu Empresa</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HamburgerMenu
