// FILE: src/components/ui/WhatsAppFloat.tsx
// PURPOSE: Fixed green WhatsApp button bottom-right — appears after 2s on every page,
//          tooltip on hover, opens WhatsApp chat with pre-filled message
// STYLING: Tailwind v4 inline classes only

'use client'

import { useState, useEffect } from 'react'

const WhatsAppIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.535 5.857L.057 23.428a.5.5 0 00.609.61l5.718-1.484A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.523-5.184-1.433l-.372-.22-3.853 1.001 1.022-3.74-.242-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
)

export default function WhatsAppFloat({ phoneNumber = '254743456817' }: { phoneNumber?: string }) {
  const [visible,     setVisible]     = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {showTooltip && (
        <div className="bg-teal-700 text-white text-sm font-medium px-4 py-2 rounded-xl whitespace-nowrap animate-[fadeIn_0.3s_ease-in-out]">
          Chat with us on WhatsApp
        </div>
      )}
      <a
        href={`https://wa.me/${phoneNumber}?text=Hi, I found Beyond Abroad and I'm interested in studying abroad. Can you help me?`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200"
        style={{ backgroundColor: '#25D366', boxShadow: '0 4px 20px rgba(37,211,102,0.4)' }}
      >
        <WhatsAppIcon />
      </a>
    </div>
  )
}