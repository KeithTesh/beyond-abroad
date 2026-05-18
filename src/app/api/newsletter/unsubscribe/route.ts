// FILE: src/app/api/newsletter/unsubscribe/route.ts
// ROUTE: POST /api/newsletter/unsubscribe
// PURPOSE: Marks contact as unsubscribed in Resend audience
// USED BY: src/app/[locale]/unsubscribe/page.tsx

import { NextRequest, NextResponse } from 'next/server'
import { getResend, AUDIENCE_ID } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    let requestBody: unknown
    try {
      requestBody = await req.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON', message: 'Request body must be valid JSON.' },
        { status: 400 },
      )
    }

    const { email } = requestBody as { email?: string }
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    const resend = getResend()
    const contacts = await resend.contacts.list({ audienceId: AUDIENCE_ID })
    const contact  = contacts.data?.data?.find((c: { email: string }) => c.email === email)

    if (contact) {
      await resend.contacts.update({ id: contact.id, audienceId: AUDIENCE_ID, unsubscribed: true })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Unsubscribe error:', err)
    return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 })
  }
}