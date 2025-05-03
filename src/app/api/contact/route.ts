import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    // Create a new form submission in Payload CMS - using the updated collection name
    const submission = await payload.create({
      collection: 'contact-form-submissions',
      data: {
        // Using the field names exactly as defined in the collection
        name,
        email,
        phone,
        service,
        message,
        status: 'new',
      } as any, // Using type assertion to bypass type checking temporarily
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
