import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === 'sw' ? 'Masharti na Hali' : 'Terms & Conditions',
    description:
      locale === 'sw'
        ? 'Masharti na hali za matumizi ya Beyond Abroad kwa watazamaji wa kimataifa.'
        : 'Terms and conditions for using Beyond Abroad student counseling services.',
  }
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isSw = locale === 'sw'

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="rounded-3xl border border-teal-100 bg-white shadow-sm p-10">
          <h1 className="text-teal-800 text-4xl font-extrabold mb-6">
            {isSw ? 'Masharti na Hali' : 'Terms & Conditions'}
          </h1>
          <p className="text-gray-600 leading-relaxed mb-6">
            {isSw
              ? 'Kwa kutumia Beyond Abroad, unakubali masharti yetu ya huduma na sera ya mawasiliano.'
              : 'By using Beyond Abroad, you agree to our service terms and communication policy.'}
          </p>

          <div className="space-y-5 text-sm text-gray-700 leading-relaxed">
            <div>
              <h2 className="text-teal-700 font-semibold mb-2">1. {isSw ? 'Huduma' : 'Service'}</h2>
              <p>
                {isSw
                  ? 'Beyond Abroad inatoa ushauri wa elimu ya kimataifa kwa wanafunzi. Hatutarajii kutoa matokeo yaliyohakikishwa, lakini tunatoa mwongozo wa kuaminika.'
                  : 'Beyond Abroad provides international education counseling. We do not guarantee outcomes, but we provide trusted guidance.'}
              </p>
            </div>

            <div>
              <h2 className="text-teal-700 font-semibold mb-2">2. {isSw ? 'Mawasiliano' : 'Communication'}</h2>
              <p>
                {isSw
                  ? 'Tunaweza kuwasiliana nawe kupitia barua pepe, simu, au WhatsApp ili kujibu maswali yako na kupanga huduma.'
                  : 'We may contact you by email, phone, or WhatsApp to respond to inquiries and coordinate services.'}
              </p>
            </div>

            <div>
              <h2 className="text-teal-700 font-semibold mb-2">3. {isSw ? 'Sera ya Usajili' : 'Subscription Policy'}</h2>
              <p>
                {isSw
                  ? 'Unapojisajili kwa jarida letu, utapokea masasisho, matangazo ya matukio, na taarifa za ufadhili. Unaweza kujitoa wakati wowote.'
                  : 'When you subscribe to our newsletter, you will receive updates, event announcements, and scholarship information. You may unsubscribe at any time.'}
              </p>
            </div>

            <div>
              <h2 className="text-teal-700 font-semibold mb-2">4. {isSw ? 'Mabadiliko' : 'Changes'}</h2>
              <p>
                {isSw
                  ? 'Beyond Abroad inaweza kufafanua tena masharti haya wakati wowote. Mabadiliko yatawekwa kwenye ukurasa huu.'
                  : 'Beyond Abroad may revise these terms at any time. Changes will be posted on this page.'}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
