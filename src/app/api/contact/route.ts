// FILE: src/app/api/contact/route.ts
// ROUTE: POST /api/contact
// PURPOSE: Validates form data, sends notification email to Calorine
//          and auto-reply confirmation to the visitor via Resend

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getResend, FROM_EMAIL, CONTACT_TO } from '@/lib/resend'

const schema = z.object({
  name:        z.string().min(2),
  phone:       z.string().min(7),
  email:       z.string().email(),
  service:     z.string().optional(),
  destination: z.string().optional(),
  message:     z.string().min(10),
})

export async function POST(req: NextRequest) {
  try {
    const data = schema.parse(await req.json())
    const resend = getResend()

    // 1. Notify Calorine
    await resend.emails.send({
      from: FROM_EMAIL, to: CONTACT_TO,
      subject: `New enquiry from ${data.name} — ${data.service || 'General'}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#073D3D;padding:24px;border-radius:8px 8px 0 0;">
            <h1 style="color:#F5C72E;margin:0;font-size:22px;">New Enquiry — Beyond Abroad</h1>
          </div>
          <div style="background:#fff;padding:24px;border:1px solid #C5E8E0;border-top:none;border-radius:0 0 8px 8px;font-size:14px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#555;width:140px;">Name</td>        <td style="padding:8px 0;font-weight:bold;color:#073D3D;">${data.name}</td></tr>
              <tr><td style="padding:8px 0;color:#555;">Phone/WhatsApp</td>           <td style="padding:8px 0;font-weight:bold;color:#073D3D;">${data.phone}</td></tr>
              <tr><td style="padding:8px 0;color:#555;">Email</td>                   <td style="padding:8px 0;font-weight:bold;color:#073D3D;">${data.email}</td></tr>
              <tr><td style="padding:8px 0;color:#555;">Service</td>                 <td style="padding:8px 0;color:#073D3D;">${data.service || '—'}</td></tr>
              <tr><td style="padding:8px 0;color:#555;">Destination</td>             <td style="padding:8px 0;color:#073D3D;">${data.destination || '—'}</td></tr>
              <tr><td style="padding:8px 0;color:#555;vertical-align:top;">Message</td><td style="padding:8px 0;color:#073D3D;">${data.message}</td></tr>
            </table>
            <div style="margin-top:20px;">
              <a href="https://wa.me/${data.phone.replace(/\D/g,'')}?text=Hi ${encodeURIComponent(data.name)}, thanks for reaching out to Beyond Abroad!"
                 style="background:#25D366;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">
                Reply on WhatsApp
              </a>
            </div>
          </div>
        </div>`,
    })

    // 2. Auto-reply to visitor
    await resend.emails.send({
      from: FROM_EMAIL, to: data.email,
      subject: 'We received your message — Beyond Abroad',
      html: `
        <div style="font-family:Inter, Arial, sans-serif;max-width:680px;margin:0 auto;color:#333;background:#f7faf9;">
          <div style="background:#073D3D;padding:28px;border-radius:8px 8px 0 0;text-align:center;">
            <h1 style="color:#F5C72E;margin:0;font-size:26px;">Beyond Abroad</h1>
            <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:13px;">Study abroad guidance for East African students</p>
          </div>

          <div style="background:#ffffff;padding:28px;border:1px solid #E6F3F0;border-top:none;border-radius:0 0 8px 8px;">
            <p style="color:#073D3D;font-size:16px;margin:0 0 12px;">Hi <strong>${data.name}</strong>,</p>
            <p style="color:#555;line-height:1.7;margin:0 0 12px;">Thanks for reaching out. We received your message and a member of the Beyond Abroad team will respond within <strong>24 hours</strong>.</p>

            <div style="background:#f3f9f8;border:1px solid #E6F3F0;padding:12px;border-radius:8px;margin:12px 0;">
              <p style="margin:0;color:#073D3D;font-weight:600;">Summary of your message:</p>
              <p style="margin:8px 0 0;color:#555;white-space:pre-wrap;">Service: ${data.service || '—'}\nDestination: ${data.destination || '—'}\nMessage: ${data.message}</p>
            </div>

            <div style="margin:18px 0;text-align:center;">
              <a href="https://wa.me/${data.phone.replace(/\D/g,'')}?text=Hi%20${encodeURIComponent(data.name)}%2C%20thanks%20for%20reaching%20out%20to%20Beyond%20Abroad" style="display:inline-block;background:#073D3D;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;">Reply on WhatsApp</a>
            </div>

            <hr style="border:none;border-top:1px solid #EEF6F4;margin:20px 0;">

            <p style="color:#777;font-size:13px;margin:0;">If you didn't expect this email, you can safely ignore it. Contact us at <a href="mailto:hello@beyondabroad.com" style="color:#073D3D;">hello@beyondabroad.com</a>.</p>
          </div>

          <div style="max-width:680px;margin:14px auto 0;text-align:center;font-size:12px;color:#9aa7a5;">
            <p style="margin:0;">&copy; ${new Date().getFullYear()} Beyond Abroad — beyondabroadco.com</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Invalid data', issues: err.issues }, { status: 400 })
    console.error('Contact error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}