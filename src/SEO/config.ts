import type { GlobalConfig } from 'payload'

import { revalidateSEO } from './hooks/revalidateSEO'

export const SEO: GlobalConfig = {
  slug: 'seo',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
  },
  fields: [
    {
      name: 'siteMeta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'SAVA Servicios Financieros - Soluciones financieras a tu alcance',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue:
            'Ofrecemos servicios financieros personalizados para impulsar tu crecimiento económico. Asesoría financiera, préstamos personales, inversiones y más.',
        },
        {
          name: 'keywords',
          type: 'array',
          label: 'Keywords',
          minRows: 1,
          fields: [
            {
              name: 'keyword',
              type: 'text',
              required: true,
            },
          ],
          defaultValue: [
            { keyword: 'finanzas personales' },
            { keyword: 'servicios financieros' },
            { keyword: 'asesoría financiera' },
            { keyword: 'inversiones' },
            { keyword: 'préstamos' },
          ],
        },
        {
          name: 'defaultImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Default OG Image',
          required: true,
        },
        {
          name: 'locale',
          type: 'select',
          options: [
            { label: 'Español (España)', value: 'es_ES' },
            { label: 'Español (Latinoamérica)', value: 'es_LA' },
            { label: 'Inglés', value: 'en_US' },
          ],
          defaultValue: 'es_ES',
          required: true,
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        {
          name: 'twitter',
          type: 'group',
          fields: [
            {
              name: 'handle',
              label: 'Usuario de Twitter/X',
              type: 'text',
              defaultValue: '@SAVA',
            },
            {
              name: 'cardType',
              label: 'Tipo de tarjeta',
              type: 'select',
              options: [
                { label: 'Summary', value: 'summary' },
                { label: 'Summary Large Image', value: 'summary_large_image' },
                { label: 'App', value: 'app' },
                { label: 'Player', value: 'player' },
              ],
              defaultValue: 'summary_large_image',
            },
          ],
        },
        {
          name: 'organization',
          type: 'group',
          fields: [
            {
              name: 'name',
              type: 'text',
              defaultValue: 'SAVA Servicios Financieros',
            },
            {
              name: 'url',
              type: 'text',
              defaultValue: 'https://sava.com',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
    {
      name: 'searchSettings',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Búsqueda | SAVA Servicios Financieros',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            'Busca información sobre servicios financieros, inversiones, préstamos y más',
        },
      ],
    },
    {
      name: 'blogSettings',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Blog | SAVA Servicios Financieros',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Artículos y noticias sobre finanzas, inversiones y economía personal',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSEO],
  },
}
