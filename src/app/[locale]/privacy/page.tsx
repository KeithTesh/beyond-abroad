import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === 'sw' ? 'Sera ya Faragha' : 'Privacy Policy',
    description:
      locale === 'sw'
        ? 'Sera ya faragha ya Beyond Abroad kwa wanafunzi wanaopanga kusoma kimataifa.'
        : 'Beyond Abroad privacy policy for international student counseling.',
  }
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isSw = locale === 'sw'

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="rounded-3xl border border-teal-100 bg-white shadow-sm p-10">
          <h1 className="text-teal-800 text-4xl font-extrabold mb-6">
            {isSw ? 'Sera ya Faragha' : 'Privacy Policy'}
          </h1>
          <p className="text-gray-600 leading-relaxed mb-6">
            {isSw
              ? 'Beyond Abroad inaheshimu faragha yako. Tunakusanya taarifa kwa madhumuni ya kujibu maswali yako na kuboresha huduma zetu za ushauri wa kusoma nje ya nchi.'
              : 'Beyond Abroad respects your privacy. We collect contact details only to respond to your inquiries and improve our international student counseling services.'}
          </p>

          <div className="space-y-5 text-sm text-gray-700 leading-relaxed">
            <div>
              <h2 className="text-teal-700 font-semibold mb-2">1. {isSw ? 'Taarifa Tunazokusanya' : 'Information We Collect'}</h2>
              <p>
                {isSw
                  ? 'Tunakusanya jina, simu, barua pepe, na maelezo ya ombi lako unapowasiliana nasi kupitia fomu au barua pepe.'
                  : 'We collect your name, phone, email, and inquiry details when you contact us via form or email.'}
              </p>
            </div>

            <div>
              <h2 className="text-teal-700 font-semibold mb-2">2. {isSw ? 'Jinsi Tunavyotumia Taarifa' : 'How We Use Your Information'}</h2>
              <p>
                {isSw
                  ? 'Taarifa zako zinatumika kujibu maswali yako, kupanga ushauri, na kutuma masasisho ya huduma zetu. Hatuzishiriki na wadau wa tatu kwa faida ya kibiashara bila ruhusa yako.'
                  : 'Your information is used to reply to your inquiries, schedule counseling, and send service updates. We do not share it with third parties for commercial purposes without your consent.'}
              </p>
            </div>

            <div>
              <h2 className="text-teal-700 font-semibold mb-2">3. {isSw ? 'Usalama' : 'Security'}</h2>
              <p>
                {isSw
                  ? 'Tunachukua hatua zinazofaa kulinda data yako dhidi ya ufikiaji usioidhinishwa, hasara, au uharibifu.'
                  : 'We take reasonable steps to protect your data from unauthorized access, loss, or misuse.'}
              </p>
            </div>

            <div>
              <h2 className="text-teal-700 font-semibold mb-2">4. {isSw ? 'Wasiliana Nasi' : 'Contact Us'}</h2>
              <p>
                {isSw
                  ? 'Ikiwa una maswali kuhusu sera hii ya faragha, tafadhali wasiliana nasi kupitia fomu ya mawasiliano au barua pepe.'
                  : 'If you have questions about this privacy policy, please contact us via the contact form or email.'}
              </p>
            </div>
          </div>

          <div className="mt-10 text-sm text-gray-500">
            {isSw
              ? 'Taarifa hii inaweza kuboreshwa mara kwa mara ili kujumuisha mabadiliko ya huduma yetu. Tazama tena mara kwa mara kwa sasisho.'
              : 'This policy may be updated from time to time to reflect changes in our services. Please check back periodically for updates.'}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
