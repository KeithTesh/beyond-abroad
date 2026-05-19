// FILE: src/app/api/email/send/route.ts
// ROUTE: POST /api/email/send
// PURPOSE: Sends a themed test email using Resend. Accepts { email }

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getResend, FROM_EMAIL } from '@/lib/resend'

const schema = z.object({ email: z.string().email() })

export async function POST(req: NextRequest) {
  try {
    const { email } = schema.parse(await req.json())
    const resend = getResend()

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://beyondabroadco.com'

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'A quick hello from Beyond Abroad',
      html: `
        <div style="font-family:Inter, Arial, sans-serif;max-width:680px;margin:0 auto;color:#333;background:#f7faf9;">
          <div style="background:#073D3D;padding:28px;border-radius:8px 8px 0 0;text-align:center;">
            <a href="${siteUrl}" style="text-decoration:none;color:inherit;">
              <h1 style="color:#F5C72E;margin:0;font-size:26px;">Beyond Abroad</h1>
            </a>
            <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:13px;">Study abroad guidance for East African students</p>
          </div>

          <div style="background:#ffffff;padding:28px;border:1px solid #E6F3F0;border-top:none;border-radius:0 0 8px 8px;">
            <p style="color:#073D3D;font-size:16px;margin:0 0 12px;">Hi,</p>
            <p style="color:#555;line-height:1.7;margin:0 0 12px;">This is a test message from Beyond Abroad, sent using Resend for delivery. The email uses the site's brand colors and simple responsive layout so it feels integrated with the website.</p>

            <div style="margin:18px 0;text-align:center;">
              <a href="${siteUrl}" style="display:inline-block;background:#073D3D;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;">Visit Beyond Abroad</a>
            </div>

            <hr style="border:none;border-top:1px solid #EEF6F4;margin:20px 0;">

            <p style="color:#777;font-size:13px;margin:0;">If you didn't expect this email, you can safely ignore it. Reach us at <a href="mailto:hello@beyondabroadco.com" style="color:#073D3D;">hello@beyondabroadco.com</a>.</p>
          </div>

          <div style="max-width:680px;margin:14px auto 0;text-align:center;font-size:12px;color:#9aa7a5;">
            <p style="margin:0;">&copy; ${new Date().getFullYear()} Beyond Abroad — <a href="${siteUrl}" style="color:#9aa7a5;text-decoration:none;">${siteUrl.replace(/^https?:\/\//, '')}</a></p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    console.error('Email send error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
