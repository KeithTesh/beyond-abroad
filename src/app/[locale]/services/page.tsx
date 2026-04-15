// FILE: src/app/[locale]/services/page.tsx
// ROUTE: /services
// PURPOSE: Full services page — 6 detailed cards with descriptions,
//          bullet includes, enquiry buttons, CTA band at bottom
// STYLING: Tailwind v4 inline classes only

export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import Link from 'next/link'
import Navbar        from '@/components/layout/Navbar'
import Footer        from '@/components/layout/Footer'
import EventBanner   from '@/components/layout/EventBanner'
import WhatsAppFloatServer from '@/components/ui/WhatsAppFloatServer'
import { localePath } from '@/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title:       locale === 'sw' ? 'Huduma Zetu' : 'Our Services',
    description: locale === 'sw'
      ? 'Msaada kamili wa elimu ya kimataifa — mwongozo wa kozi, maombi ya chuo, visa, ufadhili na zaidi.'
      : 'End-to-end international education support — course guidance, university applications, visa processing, scholarships and more.',
  }
}

const services = [
  {
    icon: '🎓', titleEn: 'Career & Course Guidance', titleSw: 'Mwongozo wa Kazi na Kozi',
    descEn: 'We sit with you, understand your grades, budget and ambitions, then map the right course and country. No guesswork — just a clear personalised roadmap to your future.',
    descSw: 'Tunakaa nawe, kuelewa alama zako, bajeti na matarajio yako, kisha tunachora njia sahihi ya kozi na nchi. Hakuna nadharia — ramani wazi ya kibinafsi ya mustakabali wako.',
    items: ['Course shortlisting based on grades & budget', 'Country comparison & cost analysis', 'University ranking guidance', 'Career path alignment sessions'],
  },
  {
    icon: '🏫', titleEn: 'University Applications', titleSw: 'Maombi ya Chuo Kikuu',
    descEn: 'From choosing universities to submitting your final application — we handle every document, deadline and detail so nothing falls through the cracks.',
    descSw: 'Kutoka kuchagua vyuo vikuu hadi kuwasilisha maombi yako ya mwisho — tunashughulikia kila hati, muda wa mwisho na maelezo.',
    items: ['Personal statement writing support', 'Document checklist & thorough review', 'Application submission tracking', 'Offer letter management & negotiation'],
  },
  {
    icon: '📋', titleEn: 'Visa Processing', titleSw: 'Usindikaji wa Visa',
    descEn: 'Student visas, tourist visas, visit visas — we handle it all. Calorine is British Council certified with a 95% visa success rate across 30+ countries.',
    descSw: 'Visa za wanafunzi, za utalii, za kutembelea — tunashughulikia zote. Calorine ana cheti cha British Council na kiwango cha mafanikio cha visa cha 95% katika nchi 30+.',
    items: ['Full visa document preparation', 'Interview coaching & mock sessions', 'Biometrics appointment guidance', 'Real-time visa status tracking'],
  },
  {
    icon: '🎖️', titleEn: 'Scholarship Finder', titleSw: 'Utafutaji wa Ufadhili',
    descEn: 'Many students qualify for scholarships they never knew existed. We research merit-based, fully funded and partial scholarships globally and guide you through applying.',
    descSw: 'Wanafunzi wengi wanastahili ufadhili ambao hawakujua ulikuwepo. Tunatafuta ufadhili wa kimataifa na kukuongoza katika mchakato wa kuomba.',
    items: ['Fully funded scholarship matching', 'Merit-based & need-based opportunities', 'Scholarship essay review & editing', 'Application deadline management'],
  },
  {
    icon: '✈️', titleEn: 'Pre-Departure Briefing', titleSw: 'Maelezo ya Kabla ya Kuondoka',
    descEn: "Before you fly, we make sure you're 100% ready — what to pack, how banking works abroad, cultural norms, healthcare, and exactly what to do when you land.",
    descSw: 'Kabla ya kuruka, tunakuhakikishia uko tayari 100% — nini cha kufunga, jinsi benki inavyofanya kazi nje ya nchi, desturi za utamaduni, huduma za afya.',
    items: ['Cultural orientation session', 'Budgeting & finances abroad', 'Health insurance guidance', 'Arrival checklist & emergency contacts'],
  },
  {
    icon: '🏠', titleEn: 'Accommodation & Travel', titleSw: 'Makazi na Safari',
    descEn: 'We help you find safe, affordable housing near your university and handle your travel bookings so you arrive stress-free and settled from day one.',
    descSw: 'Tunakusaidia kupata makazi salama na ya bei nafuu karibu na chuo chako na kushughulikia ubukuaji wa safari ili uwasili bila msongo wa mawazo.',
    items: ['On-campus & off-campus housing research', 'Flight booking assistance', 'Airport pickup coordination', 'Move-in support & settling in checklist'],
  },
]

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isSw = locale === 'sw'

  return (
    <>
      <EventBanner locale={locale} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-teal-700 py-12 md:py-16 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-teal-600 rounded-full translate-x-1/2 -translate-y-1/2 opacity-50" />
          <div className="max-w-7xl mx-auto relative">
            <div className="yellow-bar mb-4" />
            <h1 className="text-white text-4xl md:text-5xl font-extrabold mb-4">
              {isSw ? 'Huduma Zetu' : 'Our Services'}
            </h1>
            <p className="text-white/75 text-lg max-w-2xl">
              {isSw ? 'Msaada kamili kwa kila hatua ya safari yako ya elimu ya kimataifa' : 'End-to-end support for every stage of your international education journey'}
            </p>
          </div>
        </section>

        {/* Cards */}
        <section className="py-12 md:py-16 px-4 sm:px-6 bg-teal-50">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-5 md:gap-6">
            {services.map((sv) => (
              <div key={sv.titleEn} className="bg-white rounded-2xl p-5 md:p-6 border border-teal-100 hover:border-teal-300 transition-all" style={{ borderLeft: '4px solid #0E5C5C', borderRadius: '0 16px 16px 0' }}>
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-3xl">{sv.icon}</span>
                  <h2 className="text-teal-700 font-extrabold text-xl">{isSw ? sv.titleSw : sv.titleEn}</h2>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{isSw ? sv.descSw : sv.descEn}</p>
                <ul className="space-y-2 mb-5">
                  {sv.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href={localePath('/contact', locale)} className="inline-block bg-teal-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-teal-700 active:scale-95 transition-all">
                  {isSw ? 'Uliza →' : 'Enquire →'}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* CTA band */}
        <section className="bg-teal-700 py-10 px-4 sm:px-6 border-t-4 border-yellow-300">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-white text-2xl font-extrabold mb-1">
                {isSw ? 'Hujui huduma unayohitaji?' : 'Not sure which service you need?'}
              </h3>
              <p className="text-white/70 text-sm">
                {isSw ? 'Piga simu ya bure — hakuna dhamana inayohitajika.' : 'Book a free consultation — no commitment, just clarity.'}
              </p>
            </div>
            <Link href={localePath('/contact', locale)} className="shrink-0 bg-yellow-300 text-teal-700 font-bold px-8 py-4 rounded-xl hover:bg-yellow-400 active:scale-95 transition-all">
              {isSw ? 'Piga Simu ya Bure' : 'Book Free Consultation'}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloatServer />
    </>
  )
}