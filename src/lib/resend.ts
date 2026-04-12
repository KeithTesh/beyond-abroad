// FILE: src/lib/resend.ts
// PURPOSE: Resend client instance + shared email constants
// USED BY: src/app/api/contact/route.ts
//          src/app/api/newsletter/subscribe/route.ts
//          src/app/api/newsletter/unsubscribe/route.ts

import { Resend } from 'resend'

export function getResend() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY')
  }
  return new Resend(apiKey)
}

export const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || ''
export const FROM_EMAIL  = process.env.RESEND_FROM_EMAIL  || 'hello@beyondabroad.com'
export const CONTACT_TO  = process.env.CONTACT_TO_EMAIL   || 'carolmwenda09@gmail.com'