import { CollectionConfig } from 'payload'

export const ContactFormSubmissions: CollectionConfig = {
  slug: 'contact-form-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'service', 'createdAt'],
    group: 'Forms',
  },
  access: {
    create: () => true, // Anyone can submit a form
    read: ({ req: { user } }) => Boolean(user), // Only authenticated users can read
    update: ({ req: { user } }) => Boolean(user), // Only authenticated users can update
    delete: ({ req: { user } }) => Boolean(user), // Only authenticated users can delete
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'service',
      type: 'select',
      options: [
        { label: 'Asesoría Financiera', value: 'advisor' },
        { label: 'Préstamos Personales', value: 'loans' },
        { label: 'Planificación Patrimonial', value: 'planning' },
        { label: 'Servicios para Empresas', value: 'business' },
        { label: 'Inversiones', value: 'investments' },
        { label: 'Seguros Financieros', value: 'insurance' },
        { label: 'Otro', value: 'other' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Nuevo', value: 'new' },
        { label: 'En proceso', value: 'in-progress' },
        { label: 'Completado', value: 'completed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
