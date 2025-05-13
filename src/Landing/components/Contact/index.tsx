'use client'

import React, { useState } from 'react'
import { MapPin, Mail, Phone, Clock, Facebook, Twitter, Youtube, Linkedin } from 'lucide-react'

type ContactProps = {
  data: {
    heading?: string
    address?: string
    email?: string
    phoneNumbers?: Array<{ number: string }>
    businessHours?: string
    socialLinks?: Array<{
      platform: 'facebook' | 'twitter' | 'youtube' | 'linkedin'
      url: string
    }>
  }
  formSettings: {
    heading?: string
    successMessage?: string
    errorMessage?: string
    sendButtonLabel?: string
  }
}

export const ContactSection: React.FC<ContactProps> = ({ data, formSettings }) => {
  const { heading, address, email, phoneNumbers, businessHours, socialLinks } = data || {}
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        })
      } else {
        setFormStatus('error')
      }
    } catch (error) {
      setFormStatus('error')
      console.error('Error submitting form:', error)
    }
  }

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="w-5 h-5" />
      case 'twitter':
        return <Twitter className="w-5 h-5" />
      case 'youtube':
        return <Youtube className="w-5 h-5" />
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
    <section id="contact-section" className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            {heading && <h2 className="text-3xl font-bold mb-6">{heading}</h2>}

            <div className="space-y-6">
              {address && (
                <div className="flex items-start">
                  <div className="mr-3 text-blue-500 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Dirección</h3>
                    <p className="text-gray-600 whitespace-pre-line">{address}</p>
                  </div>
                </div>
              )}

              {email && (
                <div className="flex items-start">
                  <div className="mr-3 text-blue-500 mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Correo electrónico</h3>
                    <p className="text-gray-600">{email}</p>
                  </div>
                </div>
              )}

              {Array.isArray(phoneNumbers) && phoneNumbers.length > 0 && (
                <div className="flex items-start">
                  <div className="mr-3 text-blue-500 mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Teléfono</h3>
                    <div className="space-y-1">
                      {phoneNumbers.map((item, index) => (
                        <p key={index} className="text-gray-600">
                          {item.number}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {businessHours && (
                <div className="flex items-start">
                  <div className="mr-3 text-blue-500 mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Horario de atención</h3>
                    <p className="text-gray-600 whitespace-pre-line">{businessHours}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Social Links */}
            {Array.isArray(socialLinks) && socialLinks.length > 0 && (
              <div className="mt-8">
                <h3 className="font-semibold mb-3">Síguenos en redes sociales</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 transition-colors"
                    >
                      {getSocialIcon(link.platform)}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div>
            {formSettings?.heading && (
              <h2 className="text-3xl font-bold mb-6">{formSettings.heading}</h2>
            )}

            {formStatus === 'success' ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
                {formSettings?.successMessage ||
                  'Gracias por contactarnos. Nos pondremos en contacto contigo pronto.'}
              </div>
            ) : formStatus === 'error' ? (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                {formSettings?.errorMessage ||
                  'Ha ocurrido un error. Por favor intenta nuevamente.'}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-1 font-medium">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block mb-1 font-medium">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tu número de teléfono"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block mb-1 font-medium">
                    Servicio de interés
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona un servicio</option>
                    <option value="advisor">Asesoría Financiera</option>
                    <option value="loans">Préstamos Personales</option>
                    <option value="planning">Planificación Patrimonial</option>
                    <option value="business">Servicios para Empresas</option>
                    <option value="investments">Inversiones</option>
                    <option value="insurance">Seguros Financieros</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block mb-1 font-medium">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="¿Cómo podemos ayudarte?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full disabled:opacity-70"
                >
                  {formStatus === 'submitting'
                    ? 'Enviando...'
                    : formSettings?.sendButtonLabel || 'Enviar mensaje'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
