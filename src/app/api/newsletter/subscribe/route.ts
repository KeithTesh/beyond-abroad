// FILE: src/app/api/newsletter/subscribe/route.ts
// ROUTE: POST /api/newsletter/subscribe
// PURPOSE: Adds email to Resend audience + fires welcome email

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getResend, AUDIENCE_ID, FROM_EMAIL } from '@/lib/resend'

const schema = z.object({ email: z.string().email() })

function subscribeErrorResponse(stage: string, err: unknown) {
  const message = err instanceof Error ? err.message : JSON.stringify(err)
  console.error(`[newsletter:subscribe:${stage}]`, err)
  return NextResponse.json({ error: stage, message }, { status: 500 })
}

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

    const { email } = schema.parse(requestBody)
    const resend = getResend()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://beyondabroadco.com'

    await resend.contacts.create({ email, audienceId: AUDIENCE_ID, unsubscribed: false })

    const unsubscribeUrl = `${siteUrl}/en/unsubscribe?email=${encodeURIComponent(email)}`

    await resend.emails.send({
      from: FROM_EMAIL, to: email,
      subject: 'Welcome to the Beyond Abroad community!',
      text: `Welcome to the Beyond Abroad newsletter!\n\nYou will now receive:\n- Latest study abroad intakes (Canada, UK, Australia, Germany and more)\n- Scholarship opportunities for East African students\n- Visa tips and step-by-step application guides\n- Student success stories\n\nYou subscribed at ${siteUrl}.\nTo unsubscribe, visit: ${unsubscribeUrl}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#073D3D;padding:28px;border-radius:8px 8px 0 0;">
            <h1 style="color:#F5C72E;margin:0 0 6px;font-size:24px;">Beyond Abroad</h1>
            <p style="color:rgba(255,255,255,0.7);margin:0;font-size:14px;">You are in the community now!</p>
          </div>
          <div style="background:#fff;padding:28px;border:1px solid #C5E8E0;border-top:none;border-radius:0 0 8px 8px;">
            <p style="color:#073D3D;font-size:15px;">Welcome to the Beyond Abroad newsletter!</p>
            <p style="color:#555;line-height:1.7;">You will now receive:</p>
            <ul style="color:#555;line-height:2;">
              <li>Latest study abroad intakes (Canada, UK, Australia, Germany and more)</li>
              <li>Scholarship opportunities for East African students</li>
              <li>Visa tips and step-by-step application guides</li>
              <li>Student success stories</li>
            </ul>
            <hr style="border:none;border-top:1px solid #C5E8E0;margin:20px 0;">
            <p style="color:#aaa;font-size:12px;">
              You subscribed at ${siteUrl}.
              <a href="${unsubscribeUrl}" style="color:#0E5C5C;">Unsubscribe</a>
            </p>
          </div>
        </div>`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    return subscribeErrorResponse('failed', err)
  }
}