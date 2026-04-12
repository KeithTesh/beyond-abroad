// FILE: src/app/api/contact/route.ts
// ROUTE: POST /api/contact
// PURPOSE: Validates form data, sends notification email to Caroline
//          and auto-reply confirmation to the visitor via Resend

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { resend, FROM_EMAIL, CONTACT_TO } from '@/lib/resend'

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

    // 1. Notify Caroline
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
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#073D3D;padding:24px;border-radius:8px 8px 0 0;">
            <h1 style="color:#F5C72E;margin:0;font-size:22px;">Beyond Abroad</h1>
          </div>
          <div style="background:#fff;padding:24px;border:1px solid #C5E8E0;border-top:none;border-radius:0 0 8px 8px;">
            <p style="color:#073D3D;font-size:16px;">Hi <strong>${data.name}</strong>,</p>
            <p style="color:#555;line-height:1.7;">We received your message! Caroline will get back to you within <strong>24 hours</strong>.</p>
            <p style="color:#555;line-height:1.7;">You can also reach us directly:</p>
            <ul style="color:#555;line-height:2;"><li>WhatsApp: <strong>+254 743456817</strong></li><li>Email: <strong>carolmwenda09@gmail.com</strong></li></ul>
            <p style="color:#073D3D;font-weight:bold;">The Beyond Abroad Team</p>
          </div>
        </div>`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Invalid data', issues: err.issues }, { status: 400 })
    console.error('Contact error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}