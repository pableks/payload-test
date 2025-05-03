import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

// Define union type for valid service values
type ServiceType =
  | 'advisor'
  | 'loans'
  | 'planning'
  | 'business'
  | 'investments'
  | 'insurance'
  | 'other'
  | null
  | undefined

// Define union type for valid status values
type StatusType = 'new' | 'in-progress' | 'completed' | null | undefined

interface ContactFormData {
  name: string
  email: string
  phone?: string
  service?: ServiceType
  message: string
  status: StatusType
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate service field if provided
    let validatedService: ServiceType = service
    if (
      service &&
      !['advisor', 'loans', 'planning', 'business', 'investments', 'insurance', 'other'].includes(
        service,
      )
    ) {
      validatedService = 'other' // Default to 'other' if an invalid service is provided
    }

    const payload = await getPayload({ config: configPromise })

    // Create a new form submission in Payload CMS
    const submission = await payload.create({
      collection: 'contact-form-submissions',
      data: {
        name,
        email,
        phone,
        service: validatedService,
        message,
        status: 'new' as StatusType,
      } as ContactFormData,
    })

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully', id: submission.id },
      { status: 201 },
    )
  } catch (error) {
    console.error('Error submitting form:', error)
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 })
  }
}
