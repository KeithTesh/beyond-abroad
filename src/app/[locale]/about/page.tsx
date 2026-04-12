// FILE: src/app/[locale]/about/page.tsx
// ROUTE: /about
// PURPOSE: About page — Caroline bio, certifications, why choose us,
//          partner logos, dual office locations (Nairobi + Kampala)
// STYLING: Tailwind v4 inline classes only

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
    title: locale === 'sw' ? 'Kuhusu Sisi' : 'About Us',
    description: locale === 'sw'
      ? 'Jifunze kuhusu Caroline Kangai na dhamira ya Beyond Abroad.'
      : "Learn about Caroline Kangai and Beyond Abroad's mission to make international education accessible.",
  }
}

const certifications = [
  'British Council Certified Counselor',
  'Multiworld International Partner',
  'ICEF Trained Agent',
  'Member — NAFSA Network',
  'Kenya Education Counselors Association',
  'Uganda Education Network Member',
]

const partners = [
  'Multiworld International', 'British Council',
  'Uniserve Education',       'Sable Education',
  'S3 Education',             'University of Manchester',
]

const whyUs = [
  { icon: '🏆', titleEn: 'Certified Expert',    titleSw: 'Mtaalamu Aliyethibitishwa', descEn: 'British Council certified with 8+ years placing students in top universities worldwide.',                      descSw: 'Mthibitishwa na British Council na miaka 8+ ya matokeo yaliyothibitishwa.' },
  { icon: '🤝', titleEn: 'Personal Approach',   titleSw: 'Njia ya Kibinafsi',          descEn: "We don't do one-size-fits-all. Every student gets a plan tailored to their grades, budget and goals.",       descSw: 'Hatufanyi mpango mmoja kwa wote. Kila mwanafunzi anapata mpango uliotengenezwa kibinafsi.' },
  { icon: '🌍', titleEn: 'East Africa Based',   titleSw: 'Tuko Afrika Mashariki',       descEn: 'We understand the specific challenges East African students face — visa quirks, funding gaps and all.',     descSw: 'Tunaelewa changamoto maalum zinazowakabili wanafunzi wa Afrika Mashariki.' },
  { icon: '📞', titleEn: 'Always Accessible',   titleSw: 'Tunapatikana Daima',          descEn: 'WhatsApp, call or email — we are available when you need us, not just during office hours.',               descSw: 'WhatsApp, simu au barua pepe — tunapatikana unapohitaji, si wakati wa ofisi tu.' },
]

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isSw = locale === 'sw'

  return (
    <>
      <EventBanner locale={locale} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-teal-700 py-12 md:py-16 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-72 h-72 bg-teal-600 rounded-full translate-x-1/3 -translate-y-1/2 opacity-50" />
          <div className="max-w-7xl mx-auto relative">
            <div className="yellow-bar mb-4" />
            <h1 className="text-white text-4xl md:text-5xl font-extrabold mb-4">
              {isSw ? 'Kuhusu Beyond Abroad' : 'About Beyond Abroad'}
            </h1>
            <p className="text-white/75 text-lg max-w-2xl">
              {isSw
                ? 'Tuko katika dhamira ya kufanya elimu ya kimataifa iwe rahisi kwa kila mwanafunzi Afrika Mashariki.'
                : "We're on a mission to make international education accessible to every student in East Africa."}
            </p>
          </div>
        </section>

        {/* Bio */}
        <section className="py-10 md:py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-6 lg:gap-10 items-start">
            <div className="lg:col-span-2">
              <div className="bg-teal-100 rounded-2xl aspect-[3/4] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-3">📸</div>
                  <p className="text-teal-500 text-sm font-medium">Caroline's photo here</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <p className="text-teal-500 text-xs font-bold uppercase tracking-widest mb-2">
                {isSw ? 'Kutana na Caroline' : 'Meet Caroline'}
              </p>
              <h2 className="text-teal-700 text-3xl font-extrabold mb-1">Caroline Kangai</h2>
              <div className="yellow-bar mb-3" />
              <p className="text-teal-500 font-semibold text-base mb-1">
                {isSw ? 'Mwanzilishi na Mshauri Mkuu wa Wanafunzi' : 'Founder & Lead Student Counselor'}
              </p>
              <p className="text-gray-400 text-sm mb-5">
                {isSw ? 'Mthibitishwa na British Council  |  Uzoefu wa Miaka 8+' : 'British Council Certified  |  8+ Years Experience'}
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                {isSw
                  ? 'Caroline amekuwa akiongoza wanafunzi wa Afrika Mashariki kwa zaidi ya miaka 8 kwenda vyuo vikuu nchini Canada, Uingereza, Australia, Ujerumani na zaidi. Amewasilisha wanafunzi zaidi ya 500 kwenye vyuo vikuu vya juu duniani.'
                  : 'Caroline has spent over 8 years guiding East African students to universities in Canada, UK, Australia, Germany and beyond. She has personally placed over 500 students in top universities globally.'}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {isSw
                  ? 'Alianzisha Beyond Abroad baada ya kugundua jinsi mchakato unavyokuwa mgumu na wa kutatanisha — na akaamua kubadilisha hilo kwa wengine.'
                  : "She started Beyond Abroad after experiencing first-hand how difficult and confusing the process was — and decided to change that for others."}
              </p>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-10 md:py-12 px-4 sm:px-6 bg-teal-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-teal-700 text-2xl font-extrabold mb-2">
              {isSw ? 'Vyeti na Utambuzi' : 'Certifications & Recognitions'}
            </h2>
            <div className="yellow-bar mb-6" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {certifications.map((cert) => (
                <div key={cert} className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 border border-teal-100">
                  <div className="w-3 h-3 bg-yellow-300 rounded-sm shrink-0" />
                  <span className="text-teal-700 text-sm font-semibold">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="py-10 md:py-14 px-4 sm:px-6 bg-teal-700">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-yellow-300 text-2xl font-extrabold mb-8 text-center">
              {isSw ? 'Kwa Nini Wanafunzi Wanachagua Beyond Abroad' : 'Why Students Choose Beyond Abroad'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {whyUs.map((w) => (
                <div key={w.titleEn} className="bg-teal-800/50 rounded-2xl p-5">
                  <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-xl mb-3">{w.icon}</div>
                  <h3 className="text-yellow-300 font-bold text-sm mb-2">{isSw ? w.titleSw : w.titleEn}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{isSw ? w.descSw : w.descEn}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-10 md:py-12 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-teal-700 text-2xl font-extrabold mb-2">
              {isSw ? 'Washirika Wetu' : 'Our Partners'}
            </h2>
            <div className="yellow-bar mb-6" />
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {partners.map((p) => (
                <div key={p} className="border border-teal-100 rounded-xl px-5 py-3 flex items-center gap-3 hover:border-teal-300 transition-colors">
                  <div className="w-1 h-8 bg-teal-500 rounded-full shrink-0" />
                  <span className="text-teal-600 font-semibold text-sm">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Offices */}
        <section className="py-10 md:py-12 px-4 sm:px-6 bg-teal-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-teal-700 text-2xl font-extrabold mb-2">
              {isSw ? 'Ofisi Zetu' : 'Our Offices'}
            </h2>
            <div className="yellow-bar mb-6" />
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { city: 'Nairobi, Kenya',  addr: 'Bukoto Kisaasi Road, Above Qualiworth Supermarket\nWestlands, Nairobi Centre', phone: '+254 743456817' },
                { city: 'Kampala, Uganda', addr: 'Ktishna Center, Westlands\nKampala, Uganda',                                  phone: '+256 751173929' },
              ].map((o) => (
                <div key={o.city} className="bg-white rounded-r-2xl p-5 border-l-4 border-yellow-300">
                  <h3 className="text-teal-700 font-bold text-lg mb-2">{o.city}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line mb-2">{o.addr}</p>
                  <p className="text-teal-500 text-sm font-semibold">{o.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-teal-700 py-10 md:py-12 px-4 sm:px-6 border-t-4 border-yellow-300 text-center">
          <h3 className="text-white text-2xl font-extrabold mb-2">
            {isSw ? 'Tayari kuanza safari yako?' : 'Ready to start your journey?'}
          </h3>
          <p className="text-white/70 text-sm mb-6">
            {isSw ? 'Piga simu ya bure leo.' : 'Book a free consultation today.'}
          </p>
          <Link href={localePath('/contact', locale)} className="bg-yellow-300 text-teal-700 font-bold px-8 py-4 rounded-xl hover:bg-yellow-400 active:scale-95 transition-all inline-block">
            {isSw ? 'Wasiliana Nasi' : 'Get In Touch'}
          </Link>
        </section>
      </main>
      <Footer />
      <WhatsAppFloatServer />
    </>
  )
}