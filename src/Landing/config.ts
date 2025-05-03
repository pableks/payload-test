import type { GlobalConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'
import { revalidateLanding } from './hooks/revalidateLanding'

export const Landing: GlobalConfig = {
  slug: 'landing',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          defaultValue: 'Soluciones financieras a tu alcance',
        },
        {
          name: 'subheading',
          type: 'textarea',
          required: true,
          defaultValue:
            'Nos especializamos en brindar servicios financieros de calidad para impulsar tu crecimiento económico.',
        },
        linkGroup({
          overrides: {
            label: 'Call to Action Buttons',
            maxRows: 2,
            admin: {
              components: {
                RowLabel: '@/Landing/RowLabel',
              },
            },
          },
        }),
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
        },
      ],
    },
    {
      name: 'services',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          defaultValue: 'Nuestros Servicios',
        },
        {
          name: 'subheading',
          type: 'textarea',
          required: true,
          defaultValue:
            'Ofrecemos soluciones financieras adaptadas a tus necesidades para ayudarte a alcanzar tus metas económicas.',
        },
        {
          name: 'serviceItems',
          type: 'array',
          label: 'Services',
          minRows: 1,
          maxRows: 6,
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'icon',
              type: 'select',
              options: [
                { label: 'Asesoría', value: 'advisor' },
                { label: 'Préstamos', value: 'loans' },
                { label: 'Planificación', value: 'planning' },
                { label: 'Empresas', value: 'business' },
                { label: 'Inversiones', value: 'investments' },
                { label: 'Seguros', value: 'insurance' },
              ],
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              label: 'Learn More Link',
            },
          ],
        },
      ],
    },
    {
      name: 'about',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          defaultValue: 'Sobre SAVA',
        },
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'About Image',
        },
        {
          name: 'valuesList',
          type: 'array',
          label: 'Values',
          minRows: 1,
          maxRows: 6,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'testimonials',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          defaultValue: 'Lo que dicen nuestros clientes',
        },
        {
          name: 'subheading',
          type: 'textarea',
          defaultValue:
            'Descubre por qué nuestros clientes confían en SAVA para sus necesidades financieras.',
        },
        {
          name: 'testimonialItems',
          type: 'array',
          label: 'Testimonials',
          minRows: 1,
          maxRows: 10,
          fields: [
            {
              name: 'quote',
              type: 'textarea',
              required: true,
            },
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'position',
              type: 'text',
            },
            {
              name: 'company',
              type: 'text',
            },
            {
              name: 'date',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          defaultValue: 'Contacto',
        },
        {
          name: 'address',
          type: 'textarea',
        },
        {
          name: 'email',
          type: 'text',
        },
        {
          name: 'phoneNumbers',
          type: 'array',
          fields: [
            {
              name: 'number',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'businessHours',
          type: 'textarea',
        },
        {
          name: 'socialLinks',
          type: 'array',
          fields: [
            {
              name: 'platform',
              type: 'select',
              options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'Twitter', value: 'twitter' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'LinkedIn', value: 'linkedin' },
              ],
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'formSettings',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Envíanos un mensaje',
        },
        {
          name: 'successMessage',
          type: 'textarea',
          defaultValue: 'Gracias por contactarnos. Nos pondremos en contacto contigo pronto.',
        },
        {
          name: 'errorMessage',
          type: 'textarea',
          defaultValue: 'Ha ocurrido un error. Por favor intenta nuevamente.',
        },
        {
          name: 'sendButtonLabel',
          type: 'text',
          defaultValue: 'Enviar mensaje',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateLanding],
  },
}
