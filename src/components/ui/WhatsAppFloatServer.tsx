// FILE: src/components/ui/WhatsAppFloatServer.tsx
// PURPOSE: Server wrapper that pulls whatsappNumber from Sanity siteSettings
//          and passes it to the client WhatsAppFloat component

import { client, SITE_SETTINGS_QUERY } from '@/sanity/client'
import type { SiteSettings } from '@/types'
import WhatsAppFloat from './WhatsAppFloat'

export default async function WhatsAppFloatServer() {
  const settings = client
    ? (await client.fetch(SITE_SETTINGS_QUERY)) as SiteSettings | null
    : null

  return <WhatsAppFloat phoneNumber={settings?.whatsappNumber || '254743456817'} />
}
